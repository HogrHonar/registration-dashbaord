import re

# 1. Update Login Page (src/app/page.tsx)
with open("src/app/page.tsx", "r") as f:
    code = f.read()
code = code.replace('<span className="text-white text-6xl font-bold">ڕ</span>', '<span className="text-white text-3xl font-bold tracking-tight">BTVI</span>')
with open("src/app/page.tsx", "w") as f:
    f.write(code)

# 2. Update Web Icon (src/app/icon.tsx)
with open("src/app/icon.tsx", "r") as f:
    code = f.read()
code = code.replace("fontSize: 250,", "fontSize: 160,")
code = code.replace(">ڕ<", ">BTVI<")
with open("src/app/icon.tsx", "w") as f:
    f.write(code)

# 3. Update Apple Icon (src/app/apple-icon.tsx)
with open("src/app/apple-icon.tsx", "r") as f:
    code = f.read()
code = code.replace("fontSize: 90,", "fontSize: 55,")
code = code.replace(">ڕ<", ">BTVI<")
with open("src/app/apple-icon.tsx", "w") as f:
    f.write(code)
