import re

with open("src/app/page.tsx", "r") as f:
    code = f.read()

logo_pattern = re.compile(r'<div className="w-24 h-24 bg-\[#007AFF\].*?</div>', re.DOTALL)
new_logo = '<img src="/bright-logo.svg" alt="BTVI Logo" className="w-32 h-32 drop-shadow-2xl" />'

code = logo_pattern.sub(new_logo, code)

with open("src/app/page.tsx", "w") as f:
    f.write(code)
