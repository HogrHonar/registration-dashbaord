import re

with open("src/app/api/analytics/route.ts", "r") as f:
    code = f.read()

pattern = re.compile(r'const today = new Date\(\)\.toLocaleDateString\("en-GB", \{ timeZone: "Asia/Baghdad" \}\);')

replacement = """// Construct date manually to avoid hidden LTR/RTL marks on Windows
    const d = new Date();
    const formatter = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Baghdad',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
    const dparts = formatter.formatToParts(d);
    const day = dparts.find(p => p.type === 'day')?.value || "";
    const month = dparts.find(p => p.type === 'month')?.value || "";
    const year = dparts.find(p => p.type === 'year')?.value || "";
    const today = `${day}/${month}/${year}`;"""

code = pattern.sub(replacement, code)

with open("src/app/api/analytics/route.ts", "w") as f:
    f.write(code)
