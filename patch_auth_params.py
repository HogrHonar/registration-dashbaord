import re

with open("src/auth.ts", "r") as f:
    code = f.read()

pattern = re.compile(r'authorization:\s*\{\s*params:\s*\{\s*prompt:\s*"select_account",\s*\},\s*\},', re.DOTALL)
replacement = r'''authorization: {
        params: {
          prompt: "select_account",
          access_type: "offline",
          response_type: "code",
          scope: "openid profile email"
        },
      },'''

code = pattern.sub(replacement, code)

with open("src/auth.ts", "w") as f:
    f.write(code)
