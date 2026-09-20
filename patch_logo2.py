import re

for filename in ["src/app/icon.tsx", "src/app/apple-icon.tsx"]:
    with open(filename, "r") as f:
        code = f.read()
    
    code = re.sub(r'>\s*ڕ\s*<', '>BTVI<', code)
    
    with open(filename, "w") as f:
        f.write(code)

