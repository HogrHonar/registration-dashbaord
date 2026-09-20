import re

with open("src/app/api/analytics/route.ts", "r") as f:
    code = f.read()

# Add numeral conversion to isDateToday
old_func_start = "function isDateToday(dateString: string, todayFormatted: string): boolean {"
new_func_start = """function isDateToday(dateString: string, todayFormatted: string): boolean {
  if (!dateString) return false;
  // Convert Eastern Arabic numerals to Western numerals
  let ts = dateString.toString().trim().replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d).toString());"""

# Replace the first two lines of the function
code = re.sub(r'function isDateToday\(dateString: string, todayFormatted: string\): boolean \{\s*if \(\!dateString\) return false;\s*const ts = dateString\.toString\(\)\.trim\(\);', new_func_start, code)

with open("src/app/api/analytics/route.ts", "w") as f:
    f.write(code)
