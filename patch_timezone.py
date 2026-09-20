import re

with open("src/app/api/analytics/route.ts", "r") as f:
    code = f.read()

# 1. Fix regex to include dot
code = code.replace('const parts = ts.split(" ")[0].split(/[-/]/);', 'const parts = ts.split(" ")[0].split(/[-/.]/);')

# 2. Fix timezone
code = code.replace('const today = new Date().toLocaleDateString("en-GB");', 'const today = new Date().toLocaleDateString("en-GB", { timeZone: "Asia/Baghdad" });')

with open("src/app/api/analytics/route.ts", "w") as f:
    f.write(code)
