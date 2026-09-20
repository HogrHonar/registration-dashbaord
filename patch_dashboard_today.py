import re

with open("src/app/dashboard/page.tsx", "r") as f:
    code = f.read()

# 1. Update interface AnalyticsData
interface_pattern = re.compile(r'interface AnalyticsData \{')
interface_replacement = r'''interface AnalyticsData {
  todayPreReg: number;
  todayNextStep: number;'''
code = interface_pattern.sub(interface_replacement, code)

# 2. Update TabsContent value="today" grid and add cards
today_grid_pattern = re.compile(r'(<TabsContent value="today" className="mb-8" dir="rtl">\s*<motion\.div variants=\{containerVariants\} initial="hidden" animate="visible" className=")grid grid-cols-1 md:grid-cols-3 gap-6(">)')

today_grid_replacement = r'\1grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4\2'
code = today_grid_pattern.sub(today_grid_replacement, code)

# Find the end of the 3rd card in today's tab (where it closes <motion.div variants={containerVariants}>)
# Specifically, we insert after todayDocumented card.
card_pattern = re.compile(r'(<NumberFlow value=\{data\?\.todayDocumented \|\| 0\} />\s*</div>\s*</motion\.div>)')

new_cards = r'''\1

              <motion.div variants={itemVariants} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-purple-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
                <div className="relative flex justify-between items-start mb-4">
                  <div className="text-sm font-semibold text-gray-500">پێشوەختە (ئەمرۆ)</div>
                  <div className="p-2.5 bg-purple-100 text-purple-600 rounded-xl"><Globe className="h-5 w-5" /></div>
                </div>
                <div className="relative text-4xl font-bold text-gray-900 tabular-nums tracking-tight">
                  <NumberFlow value={data?.todayPreReg || 0} />
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
                <div className="relative flex justify-between items-start mb-4">
                  <div className="text-sm font-semibold text-gray-500">نێکست ستێپ (ئەمرۆ)</div>
                  <div className="p-2.5 bg-indigo-100 text-indigo-600 rounded-xl"><MonitorSmartphone className="h-5 w-5" /></div>
                </div>
                <div className="relative text-4xl font-bold text-gray-900 tabular-nums tracking-tight">
                  <NumberFlow value={data?.todayNextStep || 0} />
                </div>
              </motion.div>'''

code = card_pattern.sub(new_cards, code)

with open("src/app/dashboard/page.tsx", "w") as f:
    f.write(code)
