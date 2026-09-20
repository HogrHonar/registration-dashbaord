import re

with open("src/app/dashboard/page.tsx", "r") as f:
    code = f.read()

# 1. Fix StorageBarChart borders
code = code.replace('border-r border-white last:border-r-0', 'border-l border-white last:border-l-0')

# 2. Fix StorageBarChart margins
code = code.replace('ml-2 transition-colors', 'mr-2 transition-colors')

# 3. Fix absolute tooltip in StorageBarChart
# it was left-1/2 -translate-x-1/2, this is fine in RTL.

with open("src/app/dashboard/page.tsx", "w") as f:
    f.write(code)
