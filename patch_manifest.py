import re

with open("src/app/manifest.ts", "r") as f:
    code = f.read()

new_icons = """    icons: [
      {
        src: '/bright-logo.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      }
    ],"""

code = re.sub(r'icons:\s*\[.*?\]\s*,', new_icons, code, flags=re.DOTALL)

with open("src/app/manifest.ts", "w") as f:
    f.write(code)
