import re

with open("src/app/dashboard/page.tsx", "r") as f:
    code = f.read()

# Replace the first TabsList (all, today)
# <TabsList className="mb-4" dir="rtl">
code = code.replace('<TabsList className="mb-4" dir="rtl">', '<TabsList className="mb-4 w-full flex justify-start sm:justify-center overflow-x-auto hide-scrollbar h-auto p-1" dir="rtl">')

# Replace the second TabsList (branches, departments...)
# <TabsList>
code = code.replace('<TabsList>', '<TabsList className="w-full flex justify-start sm:justify-center overflow-x-auto hide-scrollbar h-auto p-1">')

with open("src/app/dashboard/page.tsx", "w") as f:
    f.write(code)
