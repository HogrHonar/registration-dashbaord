import re

with open("src/app/dashboard/page.tsx", "r") as f:
    code = f.read()

# 1. Remove from prereg
pattern_prereg_remove = re.compile(r'<motion\.div variants=\{containerVariants\} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">\s*<motion\.div variants=\{itemVariants\}>\s*<Card>\s*<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">\s*<CardTitle className="text-sm font-medium">کۆی گشتی ناوتۆمارکردنی ئۆنلاین</CardTitle>\s*<Users className="h-4 w-4 text-blue-600" />\s*</CardHeader>\s*<CardContent>\s*<div className="text-2xl font-bold"><NumberFlow value=\{data\?\.preRegTotal \|\| 0\} /></div>\s*</CardContent>\s*</Card>\s*</motion\.div>\s*</motion\.div>', re.DOTALL)

code = pattern_prereg_remove.sub('', code)

# 2. Remove from nextstep
pattern_nextstep_remove = re.compile(r'<motion\.div variants=\{containerVariants\} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">\s*<motion\.div variants=\{itemVariants\}>\s*<Card>\s*<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">\s*<CardTitle className="text-sm font-medium">کۆی گشتی نێکست ستێپ</CardTitle>\s*<Users className="h-4 w-4 text-emerald-600" />\s*</CardHeader>\s*<CardContent>\s*<div className="text-2xl font-bold"><NumberFlow value=\{data\?\.nextStepTotal \|\| 0\} /></div>\s*</CardContent>\s*</Card>\s*</motion\.div>\s*</motion\.div>', re.DOTALL)

code = pattern_nextstep_remove.sub('', code)

# 3. Add to "all" tab
# We need to find the end of the `all` tab's grid and insert the two new cards before `</motion.div>\n          </TabsContent>`
new_cards = """
              <motion.div variants={itemVariants} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-purple-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
                <div className="relative flex justify-between items-start mb-4">
                  <div className="text-sm font-semibold text-gray-500">ناوتۆمارکردنی ئۆنلاین</div>
                  <div className="p-2.5 bg-purple-100 text-purple-600 rounded-xl"><Users className="h-5 w-5" /></div>
                </div>
                <div className="relative text-4xl font-bold text-gray-900 tabular-nums tracking-tight">
                  <NumberFlow value={data?.preRegTotal || 0} />
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
                <div className="relative flex justify-between items-start mb-4">
                  <div className="text-sm font-semibold text-gray-500">نێکست ستێپ</div>
                  <div className="p-2.5 bg-emerald-100 text-emerald-600 rounded-xl"><Users className="h-5 w-5" /></div>
                </div>
                <div className="relative text-4xl font-bold text-gray-900 tabular-nums tracking-tight">
                  <NumberFlow value={data?.nextStepTotal || 0} />
                </div>
              </motion.div>

            </motion.div>
          </TabsContent>"""

# Replace the closing of the `all` tab
pattern_all_end = re.compile(r'</motion\.div>\s*</TabsContent>', re.DOTALL)
# wait, there are multiple </motion.div>\n</TabsContent> in the file. We need to match the specific one for "all" tab.
# Let's match the "pendingForms" card in the "all" tab and append the new cards after it.

pattern_pending = re.compile(r'<div className="relative text-4xl font-bold text-gray-900 tabular-nums tracking-tight">\s*<NumberFlow value=\{data\?\.pendingForms \|\| 0\} />\s*</div>\s*</motion\.div>')

code = pattern_pending.sub(r'\g<0>' + new_cards.replace('\n            </motion.div>\n          </TabsContent>', ''), code)

# 4. Change grid classes for "all" tab from lg:grid-cols-4 to lg:grid-cols-3 xl:grid-cols-6
code = code.replace('className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"', 'className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6"')

with open("src/app/dashboard/page.tsx", "w") as f:
    f.write(code)
