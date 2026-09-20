import re

with open("src/app/dashboard/page.tsx", "r") as f:
    code = f.read()

apple_colors = 'const APPLE_COLORS = ["#007AFF", "#34C759", "#FF9500", "#FF3B30", "#AF52DE", "#5856D6", "#FF2D55", "#5AC8FA"];'
code = code.replace('export default function Analytics() {', f'{apple_colors}\n\nexport default function Analytics() {{')

with open("src/app/dashboard/page.tsx", "w") as f:
    f.write(code)
