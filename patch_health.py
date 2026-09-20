import re

with open("src/app/dashboard/page.tsx", "r") as f:
    code = f.read()

# Define the new component
health_component = """
function HealthAcceptanceList({ stats }: { stats: { name: string, minMark: number, totalRequests: number, qualified: number }[] }) {
  return (
    <div className="flex flex-col gap-5 w-full">
      {stats.map((dept, idx) => {
        const percent = dept.totalRequests > 0 ? (dept.qualified / dept.totalRequests) * 100 : 0;
        const dashArray = 2 * Math.PI * 16;
        const dashOffset = dashArray - (dashArray * percent) / 100;
        const color = APPLE_COLORS[idx % APPLE_COLORS.length];
        
        return (
          <motion.div 
            key={dept.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05, duration: 0.4 }}
            className="flex items-center gap-4 group"
          >
            <div className="relative w-11 h-11 shrink-0">
              <svg className="w-full h-full -rotate-90 drop-shadow-sm" viewBox="0 0 40 40">
                <circle cx="20" cy="20" r="16" className="fill-none stroke-gray-100" strokeWidth="4.5" />
                <motion.circle 
                  cx="20" cy="20" r="16" 
                  className="fill-none" 
                  strokeWidth="4.5" 
                  strokeLinecap="round"
                  stroke={color}
                  initial={{ strokeDashoffset: dashArray }}
                  animate={{ strokeDashoffset: dashOffset }}
                  transition={{ delay: idx * 0.1 + 0.2, duration: 0.8, ease: "easeOut" }}
                  style={{ strokeDasharray: dashArray }}
                />
              </svg>
            </div>
            
            <div className="flex-1 flex flex-col justify-center border-b border-gray-100 pb-3 group-last:border-0 group-last:pb-0">
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-[15px] font-semibold text-gray-900">{dept.name}</span>
                <span className="text-[16px] font-bold tabular-nums" style={{ color }}>
                  <NumberFlow value={percent} format={{ maximumFractionDigits: 0 }} />%
                </span>
              </div>
              <div className="text-[12px] text-gray-500 flex justify-between">
                <span>کەمترین نمرە: {dept.minMark}</span>
                <span>{dept.qualified} وەرگیراو لە {dept.totalRequests}</span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
"""

code = code.replace('export default function Analytics() {', f'{health_component}\n\nexport default function Analytics() {{')

# Now replace the inline implementations with the new component.
old_inline = re.compile(r'<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">\s*\{\(?(data\?\.\w+Stats)(?: \|\| \[\]\))?\.map\(\(dept, idx\) => \{.*?</motion\.div>\s*\);\s*\}\)\}\s*</div>', re.DOTALL)

code = old_inline.sub(r'<HealthAcceptanceList stats={\1 || []} />', code)

with open("src/app/dashboard/page.tsx", "w") as f:
    f.write(code)
