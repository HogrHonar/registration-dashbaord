import re

with open("src/app/dashboard/page.tsx", "r") as f:
    code = f.read()

bad = """const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};"""

good = """const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};"""

code = code.replace(bad, good)

with open("src/app/dashboard/page.tsx", "w") as f:
    f.write(code)
