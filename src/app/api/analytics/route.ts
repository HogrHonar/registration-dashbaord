// app/api/analytics/route.ts
import { getSpreadsheet } from "@/lib/google-sheets";
import { NextResponse } from "next/server";

const DEPARTMENTS = [
  { name: "پەرستاری", minMark: 53.5 },
  { name: "دەرمانسازی", minMark: 56.5 },
  { name: "کارگێڕی کار", minMark: 50 },
  { name: "مەوشن گرافیکس", minMark: 50 },
  { name: "بەڵگەی تاوان", minMark: 50 },
  { name: "تەکنەلۆجیای تاقیگەی پزیشکی", minMark: 50 },
  { name: "دیکۆری ناوخۆیی", minMark: 50 },
  { name: "کارگێڕی یاسا", minMark: 50 },
  { name: "میکانیکی ئۆتۆمۆبێل", minMark: 50 },
  { name: "خزمەتگوزاری و تەکنەلۆجیای چاو", minMark: 50 },
  { name: "وزە نوێبووەکان", minMark: 50 },
  { name: "وایەرسازی ئۆتۆمۆبێل", minMark: 50 },
  { name: "تەکنەلۆجیای زانیاری (پاڵپشی و چاککردنەوە)", minMark: 50 },
  { name: "ئینگلیزی (بۆ پەرەپێدانی پیشەیی)", minMark: 50 },
];

const BRANCHES = [
  "زانستی",
  "وێژەیی",
  "پیشەیی",
  "ئامادەیی ئیسلامی",
  "پەیمانگە پێنج ساڵییەکان",
];

export async function GET() {
  try {
    const doc = await getSpreadsheet();
    const sheet = doc.sheetsByTitle[process.env.REGISTRATION_SHEET_NAME!];
    const preRegSheet = doc.sheetsByTitle[process.env.PRE_REGISTRATION_SHEET_NAME!];

    if (!sheet) {
      return NextResponse.json(
        { error: "Registration sheet not found" },
        { status: 404 }
      );
    }

    const rows = await sheet.getRows();
    let preRegTotal = 0;
    const preRegDeptRequests: Record<string, number> = {};
    const preRegDeptStats: Record<string, { total: number; qualified: number }> = {};
    DEPARTMENTS.forEach((d) => {
      preRegDeptRequests[d.name] = 0;
      preRegDeptStats[d.name] = { total: 0, qualified: 0 };
    });

    const nextStepSheet = doc.sheetsByTitle["Next Step"];
    let nextStepTotal = 0;
    const nextStepDeptRequests: Record<string, number> = {};
    const nextStepDeptStats: Record<string, { total: number; qualified: number }> = {};
    DEPARTMENTS.forEach((d) => {
      nextStepDeptRequests[d.name] = 0;
      nextStepDeptStats[d.name] = { total: 0, qualified: 0 };
    });

    const departmentKeywords: Record<string, string[]> = {
        "پەرستاری": ["پەرستاری"],
        "دەرمانسازی": ["دەرمانسازی"],
        "کارگێڕی کار": ["کارگێڕی کار", "کارگێری کار"],
        "مەوشن گرافیکس": ["مەوشن گرافیکس"],
        "بەڵگەی تاوان": ["بەڵگەی تاوان"],
        "تەکنەلۆجیای تاقیگەی پزیشکی": ["تەکنەلۆجیای تاقیگەی پزیشکی", "شیکاری نەخۆشییەکان"],
        "دیکۆری ناوخۆیی": ["دیکۆری ناوخۆیی"],
        "کارگێڕی یاسا": ["کارگێڕی یاسا", "کارگێری یاسا"],
        "میکانیکی ئۆتۆمۆبێل": ["میکانیکی ئۆتۆمۆبێل", "میکانیکی ئۆتۆمبێل"],
        "خزمەتگوزاری و تەکنەلۆجیای چاو": ["تەکنەلۆجیای چاو"],
        "وزە نوێبووەکان": ["وزە نوێبووەکان", "وزە نوێبەوەکان"],
        "وایەرسازی ئۆتۆمۆبێل": ["وایەرسازی ئۆتۆمۆبێل", "وایەرسازی ئۆتۆمبێل"],
        "تەکنەلۆجیای زانیاری (پاڵپشی و چاککردنەوە)": ["ئایتی", "تەکنەلۆجیای زانیاری"],
        "ئینگلیزی (بۆ پەرەپێدانی پیشەیی)": ["ئینگلیزی"],
      };

    let todayPreReg = 0;
    let todayNextStep = 0;

    if (preRegSheet) {
      const preRegRows = await preRegSheet.getRows();
      preRegTotal = 0;
      
      
      preRegRows.forEach((row) => {
        const selectedDept = (row.get("بەشەکانی پەیمانگەی بڕایت") || "").toLowerCase();
        const mark = (row.get("کۆنمرە") || "").toString().trim();
        const name1 = (row.get("ناوی چواری فیرخواز") || "").toString().trim();
        const name2 = (row.get("ناو") || "").toString().trim();
        
        if (selectedDept !== "" || mark !== "" || name1 !== "" || name2 !== "") {
            preRegTotal++;
            const tsKey = preRegSheet.headerValues[0];
            const ts = (row.get(tsKey) || "").toString();
            if (ts) {
                const parts = ts.split(" ")[0].split(/[-/]/);
                if (parts.length === 3) {
                    const p1 = parts[0].padStart(2, '0');
                    const p2 = parts[1].padStart(2, '0');
                    const p3 = parts[2].length === 2 ? '20'+parts[2] : parts[2];
                    const d1 = `${p1}/${p2}/${p3}`;
                    const d2 = `${p2}/${p1}/${p3}`;
                    if (d1 === today || d2 === today) {
                        todayPreReg++;
                    }
                }
            }
        }

        let totalMarkStr = row.get("کۆنمرە");
        if (typeof totalMarkStr === 'string') {
            // handle cases where people put "%" or letters
            totalMarkStr = totalMarkStr.replace(/[^0-9.]/g, '');
        }
        const totalMark = parseFloat(totalMarkStr || "0");
        
        if (selectedDept) {
           Object.entries(departmentKeywords).forEach(([canonicalName, keywords]) => {
              for (const keyword of keywords) {
                 if (selectedDept.includes(keyword.toLowerCase())) {
                    preRegDeptRequests[canonicalName]++;
                    
                    const deptInfo = DEPARTMENTS.find(d => d.name === canonicalName);
                    if (deptInfo) {
                       preRegDeptStats[canonicalName].total++;
                       if (totalMark >= deptInfo.minMark) {
                          preRegDeptStats[canonicalName].qualified++;
                       }
                    }
                    break; // Count once per canonical department for this row
                 }
              }
           });
        }
      });
    }

    if (nextStepSheet) {
      const nextStepRows = await nextStepSheet.getRows();
      nextStepTotal = 0;

      nextStepRows.forEach((row) => {
        const selectedDept = (row.get("بەشی دڵخواز") || "").toLowerCase();
        const mark = (row.get("کۆنمرە") || "").toString().trim();
        const name1 = (row.get("ناوی چواری فیرخواز") || "").toString().trim();
        const name2 = (row.get("ناو") || "").toString().trim();
        
        if (selectedDept !== "" || mark !== "" || name1 !== "" || name2 !== "") {
            nextStepTotal++;
            const tsKey = nextStepSheet.headerValues[0];
            const ts = (row.get(tsKey) || "").toString();
            if (ts) {
                const parts = ts.split(" ")[0].split(/[-/]/);
                if (parts.length === 3) {
                    const p1 = parts[0].padStart(2, '0');
                    const p2 = parts[1].padStart(2, '0');
                    const p3 = parts[2].length === 2 ? '20'+parts[2] : parts[2];
                    const d1 = `${p1}/${p2}/${p3}`;
                    const d2 = `${p2}/${p1}/${p3}`;
                    if (d1 === today || d2 === today) {
                        todayNextStep++;
                    }
                }
            }
        }

        let totalMarkStr = row.get("کۆنمرە");
        if (typeof totalMarkStr === 'string') {
            totalMarkStr = totalMarkStr.replace(/[^0-9.]/g, '');
        }
        const totalMark = parseFloat(totalMarkStr || "0");
        
        if (selectedDept) {
           Object.entries(departmentKeywords).forEach(([canonicalName, keywords]) => {
              for (const keyword of keywords) {
                 if (selectedDept.includes(keyword.toLowerCase())) {
                    nextStepDeptRequests[canonicalName]++;
                    
                    const deptInfo = DEPARTMENTS.find(d => d.name === canonicalName);
                    if (deptInfo) {
                       nextStepDeptStats[canonicalName].total++;
                       if (totalMark >= deptInfo.minMark) {
                          nextStepDeptStats[canonicalName].qualified++;
                       }
                    }
                    break;
                 }
              }
           });
        }
      });
    }

    const preRegDepartmentRequests = DEPARTMENTS.map((d) => ({
      name: d.name,
      requests: preRegDeptRequests[d.name] || 0,
    })).sort((a, b) => b.requests - a.requests);

    const preRegDepartmentStats = DEPARTMENTS.map((d) => ({
      name: d.name,
      minMark: d.minMark,
      totalRequests: preRegDeptStats[d.name].total,
      qualified: preRegDeptStats[d.name].qualified,
    }));

    const nextStepDepartmentRequests = DEPARTMENTS.map((d) => ({
      name: d.name,
      requests: nextStepDeptRequests[d.name] || 0,
    })).sort((a, b) => b.requests - a.requests);

    const nextStepDepartmentStats = DEPARTMENTS.map((d) => ({
      name: d.name,
      minMark: d.minMark,
      totalRequests: nextStepDeptStats[d.name].total,
      qualified: nextStepDeptStats[d.name].qualified,
    }));

    const totalForms = 1500;

    // Initialize counters
    const branchCounts: Record<string, number> = {};
    const deptRequests: Record<string, number> = {};
    const deptStats: Record<string, { total: number; qualified: number }> = {};
    const locationCounts: Record<string, number> = {};

    BRANCHES.forEach((b) => (branchCounts[b] = 0));
    DEPARTMENTS.forEach((d) => {
      deptRequests[d.name] = 0;
      deptStats[d.name] = { total: 0, qualified: 0 };
    });

    let filledForms = 0;
    let returnedForms = 0;
    let returnedToday = 0;
    let todayfilled = 0;
    let documentedForms = 0;
    let todayDocumented = 0;

    //count returned forms by checking today's date pattern like DD/MM/YYYY
    const today = new Date().toLocaleDateString("en-GB");
    console.log(today);

    // Process each row
    rows.forEach((row) => {
      const name = row.get("ناوی چواری فیرخواز") || "";
      const branch = row.get("لق") || "";
      const location = row.get("ناونیشان") || "";
      const selectedDept = row.get("بەشی دڵخواز") || "";
      const totalMark = parseFloat(row.get("کۆنمرە %") || "0");
      const dateReturned = row.get("ڕێکەوتی گەڕاندنەوە") || "";
      const datefilled = row.get("ڕێکەوتی وەرگرتن") || "";
      const document = row.get("پشتگیری بڕوانامەی بردووە؟") || "";

      // filtering by today
      if (name && datefilled === today) {
        todayfilled++;
      }

      if (dateReturned === today) {
        returnedToday++;
      }

      if (document.toLowerCase() === "بەڵێ" && datefilled === today || dateReturned === today) {
        todayDocumented++;
      }

      // Count filled forms
      if (name) {
        filledForms++;
      }

      // Count returned forms
      if (dateReturned) {
        returnedForms++;
      }

      // Count branches
      if (branch && BRANCHES.includes(branch)) {
        branchCounts[branch]++;
      }

      // Count locations
      if (location) {
        locationCounts[location] = (locationCounts[location] || 0) + 1;
      }

      // Count documented forms
      if (document.toLowerCase() === "بەڵێ") {
        documentedForms++;
      }

      // Process department requests
      if (selectedDept) {
        if (deptRequests[selectedDept] !== undefined) {
          deptRequests[selectedDept]++;
        }
      }

      // Process department eligibility by marks
      if (selectedDept && totalMark) {
        const deptInfo = DEPARTMENTS.find((d) => d.name === selectedDept);
        if (deptInfo) {
          deptStats[selectedDept].total++;
          if (totalMark >= deptInfo.minMark) {
            deptStats[selectedDept].qualified++;
          }
        }
      }
    });

    // Format branch data
    const branchData = BRANCHES.map((b) => ({
      name: b,
      value: branchCounts[b],
    }));

    // Format department requests (sorted highest to lowest)
    const departmentRequests = DEPARTMENTS.map((d) => ({
      name: d.name,
      requests: deptRequests[d.name] || 0,
    })).sort((a, b) => b.requests - a.requests);

    // Format department stats
    const departmentStats = DEPARTMENTS.map((d) => ({
      name: d.name,
      minMark: d.minMark,
      totalRequests: deptStats[d.name].total,
      qualified: deptStats[d.name].qualified,
    }));

    // Format location data (top 10)
    const locationData = Object.entries(locationCounts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 10);

    const fillPercentage = Math.round((filledForms / totalForms) * 100);
    const pendingForms = filledForms - returnedForms;

    return NextResponse.json({
      filledForms,
      returnedToday,
      todayfilled,
      todayDocumented,
      documentedForms,
      totalForms,
      fillPercentage,
      returnedForms,
      pendingForms,
      branchData,
      departmentRequests,
      departmentStats,
      locationData,
      preRegTotal,
      preRegDepartmentRequests,
      preRegDepartmentStats,
      nextStepTotal,
      nextStepDepartmentRequests,
      nextStepDepartmentStats,
      todayPreReg,
      todayNextStep,
    });
  } catch (error) {
    console.error("Error fetching analytics data:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics data" },
      { status: 500 }
    );
  }
}
