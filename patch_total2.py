import re

with open("src/app/api/analytics/route.ts", "r") as f:
    code = f.read()

# Fix preRegTotal
prereg_pattern = re.compile(r'preRegRows\.forEach\(\(row\) => \{\s*const hasData = Object\.values\(row\.toObject\(\)\)\.some\(v => v && v\.toString\(\)\.trim\(\) !== ""\);\s*if \(hasData\) preRegTotal\+\+;\s*const selectedDept = \(row\.get\("بەشەکانی پەیمانگەی بڕایت"\) \|\| ""\)\.toLowerCase\(\);', re.DOTALL)
prereg_replacement = r'''preRegRows.forEach((row) => {
        const selectedDept = (row.get("بەشەکانی پەیمانگەی بڕایت") || "").toLowerCase();
        const mark = (row.get("کۆنمرە") || "").toString().trim();
        const name1 = (row.get("ناوی چواری فیرخواز") || "").toString().trim();
        const name2 = (row.get("ناو") || "").toString().trim();
        
        if (selectedDept !== "" || mark !== "" || name1 !== "" || name2 !== "") {
            preRegTotal++;
        }
'''
code = prereg_pattern.sub(prereg_replacement, code)

# Fix nextStepTotal
nextstep_pattern = re.compile(r'nextStepRows\.forEach\(\(row\) => \{\s*const hasData = Object\.values\(row\.toObject\(\)\)\.some\(v => v && v\.toString\(\)\.trim\(\) !== ""\);\s*if \(hasData\) nextStepTotal\+\+;\s*const selectedDept = \(row\.get\("بەشی دڵخواز"\) \|\| ""\)\.toLowerCase\(\);', re.DOTALL)
nextstep_replacement = r'''nextStepRows.forEach((row) => {
        const selectedDept = (row.get("بەشی دڵخواز") || "").toLowerCase();
        const mark = (row.get("کۆنمرە") || "").toString().trim();
        const name1 = (row.get("ناوی چواری فیرخواز") || "").toString().trim();
        const name2 = (row.get("ناو") || "").toString().trim();
        
        if (selectedDept !== "" || mark !== "" || name1 !== "" || name2 !== "") {
            nextStepTotal++;
        }
'''
code = nextstep_pattern.sub(nextstep_replacement, code)

with open("src/app/api/analytics/route.ts", "w") as f:
    f.write(code)
