import re

with open("src/app/api/analytics/route.ts", "r") as f:
    code = f.read()

# 1. Add let todayPreReg = 0; let todayNextStep = 0; before preReg loop
code = code.replace("    if (preRegSheet) {", "    let todayPreReg = 0;\n    let todayNextStep = 0;\n\n    if (preRegSheet) {")

# 2. Add timestamp check logic for preReg
prereg_pattern = re.compile(r'preRegTotal\+\+;\s*\}', re.DOTALL)
prereg_replacement = r'''preRegTotal++;
            const tsKey = preRegSheet.headerValues[0];
            const ts = (row.get(tsKey) || "").toString();
            if (ts) {
                const parts = ts.split(" ")[0].split(/[-/]/);
                if (parts.length === 3) {
                    const p1 = parts[0].zfill(2);
                    const p2 = parts[1].zfill(2);
                    const p3 = parts[2].length == 2 ? '20'+parts[2] : parts[2];
                    const d1 = f"{p1}/{p2}/{p3}";
                    const d2 = f"{p2}/{p1}/{p3}";
                    if (d1 == today || d2 == today) {
                        todayPreReg++;
                    }
                }
            }
        }'''
# Wait, python f-strings inside javascript code replacement? No, I must use JS syntax.

prereg_replacement_js = r'''preRegTotal++;
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
        }'''
code = prereg_pattern.sub(prereg_replacement_js, code)


# 3. Add timestamp check logic for nextStep
nextstep_pattern = re.compile(r'nextStepTotal\+\+;\s*\}', re.DOTALL)
nextstep_replacement_js = r'''nextStepTotal++;
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
        }'''
code = nextstep_pattern.sub(nextstep_replacement_js, code)


# 4. Return todayPreReg and todayNextStep in the JSON response
json_pattern = re.compile(r'nextStepDepartmentStats,\s*\}\);', re.DOTALL)
code = json_pattern.sub(r'nextStepDepartmentStats,\n      todayPreReg,\n      todayNextStep,\n    });', code)

with open("src/app/api/analytics/route.ts", "w") as f:
    f.write(code)
