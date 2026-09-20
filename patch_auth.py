import re

with open("src/auth.ts", "r") as f:
    code = f.read()

code = code.replace("adapter: PrismaAdapter(prisma),", "adapter: PrismaAdapter(prisma),\n  trustHost: true,")

with open("src/auth.ts", "w") as f:
    f.write(code)
