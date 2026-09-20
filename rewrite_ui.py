import re

with open("src/app/dashboard/page.tsx", "r") as f:
    code = f.read()

# We know the bug is extra </motion.div> or missing. Let's fix the nesting.
# Let's count <motion.div and </motion.div>
open_count = code.count('<motion.div')
close_count = code.count('</motion.div>')
print(f"open: {open_count}, close: {close_count}")

