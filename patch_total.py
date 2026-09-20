import re

with open("src/app/api/analytics/route.ts", "r") as f:
    code = f.read()

# Fix preRegTotal
# Original: preRegTotal = preRegRows.length;
code = code.replace('preRegTotal = preRegRows.length;', 'preRegTotal = 0;')

# Find where it iterates over preRegRows
prereg_loop_pattern = re.compile(r'preRegRows\.forEach\(\(row\) => \{\s*const selectedDept', re.DOTALL)
prereg_replacement = r'''preRegRows.forEach((row) => {
        const hasData = Object.values(row.toObject()).some(v => v && v.toString().trim() !== "");
        if (hasData) preRegTotal++;
        const selectedDept'''
code = prereg_loop_pattern.sub(prereg_replacement, code)


# Fix nextStepTotal
# Original: nextStepTotal = nextStepRows.length;
code = code.replace('nextStepTotal = nextStepRows.length;', 'nextStepTotal = 0;')

# Find where it iterates over nextStepRows
nextstep_loop_pattern = re.compile(r'nextStepRows\.forEach\(\(row\) => \{\s*const selectedDept', re.DOTALL)
nextstep_replacement = r'''nextStepRows.forEach((row) => {
        const hasData = Object.values(row.toObject()).some(v => v && v.toString().trim() !== "");
        if (hasData) nextStepTotal++;
        const selectedDept'''
code = nextstep_loop_pattern.sub(nextstep_replacement, code)

with open("src/app/api/analytics/route.ts", "w") as f:
    f.write(code)
