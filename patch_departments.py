import re

with open("src/app/dashboard/page.tsx", "r") as f:
    code = f.read()

old_block = """<div className="space-y-4">
                  {data?.departmentStats.map((dept, idx) => (
                    <div key={idx} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold">{dept.name}</span>
                        <span className="text-sm text-gray-500">
                          کەمترین کۆنمرە: {dept.minMark}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-500"
                              style={{
                                width:
                                  dept.totalRequests > 0
                                    ? (dept.qualified / dept.totalRequests) *
                                      100
                                    : 0,
                              }}
                            />
                          </div>
                        </div>
                        <div className="text-sm font-medium min-w-fit">
                          {dept.qualified} / {dept.totalRequests}
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {dept.totalRequests > 0
                          ? (
                              (dept.qualified / dept.totalRequests) *
                              100
                            ).toFixed(1)
                          : 0}
                        % وەرگیراو
                      </p>
                    </div>
                  ))}
                </div>"""

new_block = """<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {data?.departmentStats.map((dept, idx) => {
                    const percent = dept.totalRequests > 0 ? (dept.qualified / dept.totalRequests) * 100 : 0;
                    const dashArray = 2 * Math.PI * 36;
                    const dashOffset = dashArray - (dashArray * percent) / 100;
                    return (
                      <motion.div 
                        key={idx}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.05, duration: 0.4, ease: "easeOut" }}
                        className="bg-gray-50 p-4 border border-gray-100 rounded-2xl flex flex-col items-center text-center"
                      >
                        <div className="relative w-24 h-24 mb-3">
                          <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
                            <circle cx="40" cy="40" r="36" className="fill-none stroke-gray-200" strokeWidth="8" />
                            <motion.circle 
                              cx="40" cy="40" r="36" 
                              className="fill-none stroke-cyan-500" 
                              strokeWidth="8" 
                              strokeLinecap="round"
                              initial={{ strokeDashoffset: dashArray }}
                              animate={{ strokeDashoffset: dashOffset }}
                              transition={{ delay: idx * 0.05 + 0.1, duration: 1, ease: "easeOut" }}
                              style={{ strokeDasharray: dashArray }}
                            />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-lg font-bold text-gray-800">
                              <NumberFlow value={percent} format={{ maximumFractionDigits: 0 }} />%
                            </span>
                          </div>
                        </div>
                        <h3 className="text-sm font-semibold text-gray-700 leading-tight">{dept.name}</h3>
                        <p className="text-[10px] text-gray-500 mt-1">{dept.qualified} / {dept.totalRequests} وەردەگیرێن</p>
                        <p className="text-[9px] text-gray-400 mt-0.5">نمرە {dept.minMark}</p>
                      </motion.div>
                    );
                  })}
                </div>"""

code = code.replace(old_block, new_block)

with open("src/app/dashboard/page.tsx", "w") as f:
    f.write(code)
