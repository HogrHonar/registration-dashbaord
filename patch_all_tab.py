import re

with open("src/app/dashboard/page.tsx", "r") as f:
    code = f.read()

# I will use regex to find TabsContent value="all" up to the next TabsContent
pattern = re.compile(r'<TabsContent value="all" className="mb-8" dir="rtl">.*?</TabsContent>', re.DOTALL)

new_all = """<TabsContent value="all" className="mb-8" dir="rtl">
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <motion.div variants={itemVariants} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
                <div className="relative flex justify-between items-start mb-4">
                  <div className="text-sm font-semibold text-gray-500">فۆرمی تۆمارکراوە</div>
                  <div className="p-2.5 bg-blue-100 text-blue-600 rounded-xl"><FileText className="h-5 w-5" /></div>
                </div>
                <div className="relative text-4xl font-bold text-gray-900 tabular-nums tracking-tight">
                  <NumberFlow value={data?.filledForms || 0} />
                </div>
                <div className="relative mt-2 text-xs font-medium text-gray-400">
                  لە کۆی <NumberFlow value={data?.totalForms || 0} /> فۆڕم
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-green-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
                <div className="relative flex justify-between items-start mb-4">
                  <div className="text-sm font-semibold text-gray-500">گەڕاندنەوەی فۆرم</div>
                  <div className="p-2.5 bg-green-100 text-green-600 rounded-xl"><FileCheck className="h-5 w-5" /></div>
                </div>
                <div className="relative text-4xl font-bold text-gray-900 tabular-nums tracking-tight">
                  <NumberFlow value={data?.returnedForms || 0} />
                </div>
                <div className="relative mt-2 text-xs font-medium text-green-600 flex items-center gap-1">
                  ڕێژەی گەڕاندنەوە: <NumberFlow value={data?.fillPercentage || 0} />%
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-orange-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
                <div className="relative flex justify-between items-start mb-4">
                  <div className="text-sm font-semibold text-gray-500">پشتگیری بڕوانامە</div>
                  <div className="p-2.5 bg-orange-100 text-orange-600 rounded-xl"><ScrollText className="h-5 w-5" /></div>
                </div>
                <div className="relative text-4xl font-bold text-gray-900 tabular-nums tracking-tight">
                  <NumberFlow value={data?.documentedForms || 0} />
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-red-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
                <div className="relative flex justify-between items-start mb-4">
                  <div className="text-sm font-semibold text-gray-500">فۆرمی نەگەڕاوە</div>
                  <div className="p-2.5 bg-red-100 text-red-600 rounded-xl"><ListRestart className="h-5 w-5" /></div>
                </div>
                <div className="relative text-4xl font-bold text-gray-900 tabular-nums tracking-tight">
                  <NumberFlow value={data?.pendingForms || 0} />
                </div>
              </motion.div>

            </motion.div>
          </TabsContent>"""

code = pattern.sub(new_all, code, count=1)

with open("src/app/dashboard/page.tsx", "w") as f:
    f.write(code)
