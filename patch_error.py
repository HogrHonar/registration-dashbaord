import re

with open("src/app/dashboard/page.tsx", "r") as f:
    code = f.read()

code = code.replace('<div className="flex items-center justify-center h-screen">\n        <AlertCircle className="mr-2" />', '<div className="flex items-center justify-center h-screen gap-2">\n        <AlertCircle className="w-6 h-6" />')

with open("src/app/dashboard/page.tsx", "w") as f:
    f.write(code)
