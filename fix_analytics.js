const fs = require('fs');
const path = 'src/app/api/analytics/route.ts';
let code = fs.readFileSync(path, 'utf8');

const search = `    if (preRegSheet) {
      const preRegRows = await preRegSheet.getRows();
      preRegTotal = preRegRows.length;
      
      const departmentKeywords: Record<string, string[]> = {`;
const replace = `    const departmentKeywords: Record<string, string[]> = {
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

    if (preRegSheet) {
      const preRegRows = await preRegSheet.getRows();
      preRegTotal = preRegRows.length;
      
      const departmentKeywordsToRemove: Record<string, string[]> = {`;
code = code.replace(search, replace);

code = code.replace(/const departmentKeywordsToRemove: Record<string, string\[\]> = \{[\s\S]*?      \};\n/m, '');

fs.writeFileSync(path, code);
