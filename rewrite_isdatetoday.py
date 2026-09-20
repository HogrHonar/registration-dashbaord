import re

with open("src/app/api/analytics/route.ts", "r") as f:
    code = f.read()

# Replace the existing isDateToday function completely
pattern = re.compile(r'function isDateToday\(value: unknown, today: string\): boolean \{.*?return candidates\.includes\(today\);\n\}', re.DOTALL)

replacement = """function isDateToday(value: unknown, today: string): boolean {
  if (!value) return false;

  // Convert Eastern Arabic numerals to Western numerals
  let ts = String(value).trim().replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d).toString());
  
  if (ts === today || ts.includes(today)) return true;

  const date = ts.split(/[ T]/)[0];
  const parts = date.split(/[-/.]/);
  if (parts.length !== 3) return false;

  const [first, second, rawYear] = parts;
  const year = rawYear.length === 2 ? `20${rawYear}` : rawYear;
  
  const p1 = first.padStart(2, "0");
  const p2 = second.padStart(2, "0");
  
  const candidates = [
    `${p1}/${p2}/${year}`,
    `${p2}/${p1}/${year}`,
    `${year}/${p2}/${p1}`
  ];

  return candidates.includes(today);
}"""

code = pattern.sub(replacement, code)

with open("src/app/api/analytics/route.ts", "w") as f:
    f.write(code)
