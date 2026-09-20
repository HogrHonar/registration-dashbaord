import re

with open("src/app/page.tsx", "r") as f:
    code = f.read()

code = code.replace("animate-blob", "")
code = code.replace("animation-delay-2000", "")
code = code.replace("animation-delay-4000", "")

with open("src/app/page.tsx", "w") as f:
    f.write(code)
