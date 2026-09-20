import re

with open("src/app/dashboard/page.tsx", "r") as f:
    code = f.read()

# Fix framer-motion import
code = code.replace('import { motion } from "framer-motion";', 'import { motion, AnimatePresence } from "framer-motion";')

# Define the new component
storage_component = """
function StorageBarChart({ reqs }: { reqs: { name: string, requests: number }[] }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const total = reqs.reduce((sum, d) => sum + d.requests, 0) || 1;

  return (
    <>
      <div 
        className="w-full h-3 rounded-full overflow-hidden flex mb-6 bg-gray-100"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {reqs.map((dept, idx) => {
          const isHovered = hoveredIndex === idx;
          const isDimmed = hoveredIndex !== null && hoveredIndex !== idx;
          return (
            <motion.div
              key={dept.name}
              initial={{ width: 0 }}
              animate={{ 
                width: `${Math.max((dept.requests / total) * 100, 0.5)}%`,
                opacity: isDimmed ? 0.3 : 1
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onMouseEnter={() => setHoveredIndex(idx)}
              onTouchStart={() => setHoveredIndex(idx)}
              style={{ backgroundColor: APPLE_COLORS[idx % APPLE_COLORS.length] }}
              className="relative h-full border-r border-white last:border-r-0 cursor-pointer group"
            >
              {/* Tooltip */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 flex flex-col items-center pointer-events-none"
                  >
                    <div className="bg-black/90 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-lg shadow-xl whitespace-nowrap">
                      {dept.name}: {dept.requests}
                    </div>
                    <div className="w-2.5 h-2.5 bg-black/90 rotate-45 -mt-1.5 rounded-sm" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
        {reqs.map((dept, idx) => {
          const isDimmed = hoveredIndex !== null && hoveredIndex !== idx;
          return (
            <motion.div 
              key={dept.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: isDimmed ? 0.4 : 1 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-between cursor-pointer transition-opacity"
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              onTouchStart={() => setHoveredIndex(idx)}
              onTouchEnd={() => setHoveredIndex(null)}
            >
              <div className="flex items-center gap-2 overflow-hidden">
                <div 
                  className="w-2.5 h-2.5 rounded-full shrink-0 transition-transform" 
                  style={{ backgroundColor: APPLE_COLORS[idx % APPLE_COLORS.length], transform: hoveredIndex === idx ? 'scale(1.2)' : 'scale(1)' }} 
                />
                <span className={`text-sm truncate transition-colors ${hoveredIndex === idx ? 'text-black font-semibold' : 'text-gray-800'}`}>
                  {dept.name}
                </span>
              </div>
              <span className={`text-sm tabular-nums shrink-0 ml-2 transition-colors ${hoveredIndex === idx ? 'text-black font-bold' : 'text-gray-500'}`}>
                <NumberFlow value={dept.requests} />
              </span>
            </motion.div>
          );
        })}
      </div>
    </>
  );
}
"""

code = code.replace('export default function Analytics() {', f'{storage_component}\n\nexport default function Analytics() {{')

# Now replace the inline implementations with the new component.
old_inline = re.compile(r'\{\(\(\) => \{\s*const reqs = (.*?) \|\| \[\];\s*const total = reqs\.reduce\(\(sum, d\) => sum \+ d\.requests, 0\) \|\| 1;\s*return \(\s*<>\s*<div className="w-full h-3 rounded-full overflow-hidden flex mb-6 bg-gray-100">.*?</div>\s*<div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">.*?</div>\s*</>\s*\);\s*\}\)\(\)\}', re.DOTALL)

code = old_inline.sub(r'<StorageBarChart reqs={\1 || []} />', code)

with open("src/app/dashboard/page.tsx", "w") as f:
    f.write(code)
