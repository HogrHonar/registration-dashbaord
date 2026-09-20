import re

with open("src/app/api/analytics/route.ts", "r") as f:
    code = f.read()

if "export const dynamic = 'force-dynamic';" not in code:
    code = code.replace("import { NextResponse } from \"next/server\";", "import { NextResponse } from \"next/server\";\n\nexport const dynamic = 'force-dynamic';\nexport const revalidate = 0;\n")

with open("src/app/api/analytics/route.ts", "w") as f:
    f.write(code)
