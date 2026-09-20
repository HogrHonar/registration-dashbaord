import re

with open("src/app/dashboard/page.tsx", "r") as f:
    code = f.read()

# Replace BranchSettingsList with SettingsList and LocationCompactGrid with MiniBarsList definitions
components = """
function SettingsList({ data }: { data: { name: string, value: number }[] }) {
  return (
    <div className="bg-white rounded-[10px] overflow-hidden shadow-sm border border-gray-100 w-full">
      <ul className="flex flex-col m-0 p-0">
        {data.map((item, idx) => (
          <motion.li 
            key={item.name}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.04, duration: 0.3 }}
            className="relative flex items-center justify-between px-4 py-3 bg-white hover:bg-gray-50 transition-colors"
          >
            <span className="text-[15px] font-medium text-gray-900">{item.name}</span>
            <span className="text-[15px] font-semibold text-gray-500 tabular-nums">
              <NumberFlow value={item.value} />
            </span>
            {idx < data.length - 1 && (
              <div className="absolute bottom-0 left-0 right-4 h-[1px] bg-gray-100" />
            )}
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

function MiniBarsList({ data, color }: { data: { name: string, value: number }[], color: string }) {
  const maxVal = Math.max(...data.map(d => d.value), 1);
  return (
    <div className="flex flex-col gap-4 w-full">
      {data.map((item, idx) => (
        <div key={item.name} className="flex flex-col gap-1.5 group">
          <div className="flex justify-between items-baseline">
            <span className="text-[15px] font-medium text-gray-900">{item.name}</span>
            <span className="text-[15px] text-gray-500 tabular-nums"><NumberFlow value={item.value} /></span>
          </div>
          <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${(item.value / maxVal) * 100}%` }}
              transition={{ delay: idx * 0.05, duration: 0.6, ease: "easeOut" }}
              className="h-full rounded-full"
              style={{ backgroundColor: color }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
"""

# Find the old components and replace them
old_components_pattern = re.compile(r'function BranchSettingsList.*?</motion\.div>\s*\)\)\}\s*</div>\s*\);\s*\}', re.DOTALL)
code = old_components_pattern.sub(components, code)

# Swap the usages in the JSX
# Branches: was <BranchSettingsList data={data?.branchData || []} /> -> <MiniBarsList data={data?.branchData || []} color="#007AFF" />
code = code.replace('<BranchSettingsList data={data?.branchData || []} />', '<MiniBarsList data={data?.branchData || []} color="#007AFF" />')

# Locations: was <LocationCompactGrid data={data?.locationData || []} /> -> <SettingsList data={data?.locationData || []} />
code = code.replace('<LocationCompactGrid data={data?.locationData || []} />', '<SettingsList data={data?.locationData || []} />')


with open("src/app/dashboard/page.tsx", "w") as f:
    f.write(code)
