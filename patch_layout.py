import re

with open("src/app/layout.tsx", "r") as f:
    code = f.read()

# Replace metadata
new_metadata = """export const metadata: Metadata = {
  title: "Registration Dashboard",
  description: "داشبۆردی تۆمارکردنی خوێندکاران",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Registration",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  interactiveWidget: "resizes-content",
  themeColor: "#f9fafb",
};"""

code = re.sub(r'export const metadata: Metadata = \{.*?\};', new_metadata, code, flags=re.DOTALL)

with open("src/app/layout.tsx", "w") as f:
    f.write(code)
