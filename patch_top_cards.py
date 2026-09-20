import re

with open("src/app/dashboard/page.tsx", "r") as f:
    code = f.read()

# Replace today tab
old_today = """<TabsContent value="today" className="mb-8" dir="rtl">
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div variants={itemVariants}>
                <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      فۆرمی تۆمارکراوە
                    </CardTitle>
                  <FileText className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold"><NumberFlow value={data?.todayfilled || 0} /></div>
                </CardContent>
              </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    گەڕاندنەوەی فۆرم
                  </CardTitle>
                  <FileCheck className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    <NumberFlow value={data?.returnedToday || 0} />
                  </div>
                </CardContent>
              </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    پشتگیری بڕوانامە
                  </CardTitle>
                  <ScrollText className="h-4 w-4 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    <NumberFlow value={data?.todayDocumented || 0} />
                  </div>
                </CardContent>
              </Card>
              </motion.div>
            </motion.div>
          </TabsContent>"""

new_today = """<TabsContent value="today" className="mb-8" dir="rtl">
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <motion.div variants={itemVariants} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
                <div className="relative flex justify-between items-start mb-4">
                  <div className="text-sm font-semibold text-gray-500">فۆرمی تۆمارکراوە</div>
                  <div className="p-2.5 bg-blue-100 text-blue-600 rounded-xl"><FileText className="h-5 w-5" /></div>
                </div>
                <div className="relative text-4xl font-bold text-gray-900 tabular-nums tracking-tight">
                  <NumberFlow value={data?.todayfilled || 0} />
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-green-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
                <div className="relative flex justify-between items-start mb-4">
                  <div className="text-sm font-semibold text-gray-500">گەڕاندنەوەی فۆرم</div>
                  <div className="p-2.5 bg-green-100 text-green-600 rounded-xl"><FileCheck className="h-5 w-5" /></div>
                </div>
                <div className="relative text-4xl font-bold text-gray-900 tabular-nums tracking-tight">
                  <NumberFlow value={data?.returnedToday || 0} />
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-orange-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
                <div className="relative flex justify-between items-start mb-4">
                  <div className="text-sm font-semibold text-gray-500">پشتگیری بڕوانامە</div>
                  <div className="p-2.5 bg-orange-100 text-orange-600 rounded-xl"><ScrollText className="h-5 w-5" /></div>
                </div>
                <div className="relative text-4xl font-bold text-gray-900 tabular-nums tracking-tight">
                  <NumberFlow value={data?.todayDocumented || 0} />
                </div>
              </motion.div>

            </motion.div>
          </TabsContent>"""

# Replace all tab
old_all = """<TabsContent value="all" className="mb-8" dir="rtl">
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <motion.div variants={itemVariants}>
                <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {" "}
                    فۆرمی تۆمارکراوە
                  </CardTitle>
                  <FileText className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold"><NumberFlow value={data?.filledForms || 0} /></div>
                  <p className="text-xs text-gray-500">لە <NumberFlow value={data?.totalForms || 0} /></p>
                </CardContent>
              </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    گەڕاندنەوەی فۆرم
                  </CardTitle>
                  <FileCheck className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    <NumberFlow value={data?.returnedForms || 0} />
                  </div>
                </CardContent>
              </Card>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    پشتگیری بڕوانامە
                  </CardTitle>
                  <ScrollText className="h-4 w-4 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    <NumberFlow value={data?.documentedForms || 0} />
                  </div>
                </CardContent>
              </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    فۆرمی نەگەڕاوە
                  </CardTitle>
                  <ListRestart className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    <NumberFlow value={data?.pendingForms || 0} />
                  </div>
                </CardContent>
              </Card>
              </motion.div>
            </motion.div>
          </TabsContent>"""

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
                  لە کۆی {data?.totalForms || 0} فۆڕم
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

code = code.replace(old_today, new_today)
code = code.replace(old_all, new_all)

with open("src/app/dashboard/page.tsx", "w") as f:
    f.write(code)
