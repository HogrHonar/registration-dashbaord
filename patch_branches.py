import re

with open("src/app/dashboard/page.tsx", "r") as f:
    code = f.read()

components = """
function BranchSettingsList({ data }: { data: { name: string, value: number }[] }) {
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

function LocationCompactGrid({ data }: { data: { name: string, value: number }[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full">
      {data.map((item, idx) => (
        <motion.div 
          key={item.name}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: idx * 0.05, duration: 0.3 }}
          className="bg-white border border-gray-100 rounded-[14px] p-3 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
        >
          <span className="text-[13px] font-medium text-gray-500 mb-2 truncate">{item.name}</span>
          <span className="text-[20px] font-bold text-gray-900 tabular-nums tracking-tight">
            <NumberFlow value={item.value} />
          </span>
        </motion.div>
      ))}
    </div>
  );
}
"""

code = code.replace('export default function Analytics() {', f'{components}\n\nexport default function Analytics() {{')

# Replace the Recharts BarChart for branches
branch_pattern = re.compile(r'<ResponsiveContainer width="100%" height=\{300\}>\s*<BarChart data=\{data\?\.branchData\}>.*?</ResponsiveContainer>', re.DOTALL)
code = branch_pattern.sub(r'<BranchSettingsList data={data?.branchData || []} />', code)

# Replace the list for locations
location_pattern = re.compile(r'<div className="space-y-3">\s*\{data\?\.locationData\.map\(\(loc, idx\) => \(.*?\)\)\}\s*</div>', re.DOTALL)
code = location_pattern.sub(r'<LocationCompactGrid data={data?.locationData || []} />', code)

with open("src/app/dashboard/page.tsx", "w") as f:
    f.write(code)
