import re

with open("src/app/dashboard/page.tsx", "r") as f:
    code = f.read()

# 1. Departments (Cyan)
dept_old = """<ResponsiveContainer width="100%" height={600}>
                  <BarChart data={data?.departmentRequests} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={150} />
                    <Tooltip />
                    <Bar dataKey="requests" fill="#06b6d4" />
                  </BarChart>
                </ResponsiveContainer>"""

dept_new = """<ul className="divide-y divide-gray-100 -mx-6 -mb-6">
                  {(data?.departmentRequests || []).map((dept, idx, arr) => {
                    const maxReq = Math.max(...arr.map(d => d.requests), 1);
                    const width = (dept.requests / maxReq) * 100;
                    return (
                      <motion.li 
                        key={dept.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05, duration: 0.4, ease: "easeOut" }}
                        className="px-6 py-4 flex items-center gap-4 relative overflow-hidden group hover:bg-gray-50 transition-colors"
                      >
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${width}%` }}
                          transition={{ delay: idx * 0.05 + 0.1, duration: 0.8, ease: "easeOut" }}
                          className="absolute right-0 top-0 bottom-0 bg-cyan-50/50 -z-10 border-l border-cyan-100"
                        />
                        <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 text-xs font-bold font-mono shrink-0">
                          {idx + 1}
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-semibold text-gray-900">{dept.name}</div>
                        </div>
                        <div className="text-lg font-bold text-cyan-600 tabular-nums">
                          <NumberFlow value={dept.requests} />
                        </div>
                      </motion.li>
                    );
                  })}
                </ul>"""

# 2. Pre-registration (Purple)
prereg_old = """<ResponsiveContainer width="100%" height={600}>
                  <BarChart data={data?.preRegDepartmentRequests} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={150} />
                    <Tooltip />
                    <Bar dataKey="requests" fill="#8b5cf6" />
                  </BarChart>
                </ResponsiveContainer>"""

prereg_new = """<ul className="divide-y divide-gray-100 -mx-6 -mb-6">
                  {(data?.preRegDepartmentRequests || []).map((dept, idx, arr) => {
                    const maxReq = Math.max(...arr.map(d => d.requests), 1);
                    const width = (dept.requests / maxReq) * 100;
                    return (
                      <motion.li 
                        key={dept.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05, duration: 0.4, ease: "easeOut" }}
                        className="px-6 py-4 flex items-center gap-4 relative overflow-hidden group hover:bg-gray-50 transition-colors"
                      >
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${width}%` }}
                          transition={{ delay: idx * 0.05 + 0.1, duration: 0.8, ease: "easeOut" }}
                          className="absolute right-0 top-0 bottom-0 bg-purple-50/50 -z-10 border-l border-purple-100"
                        />
                        <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 text-xs font-bold font-mono shrink-0">
                          {idx + 1}
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-semibold text-gray-900">{dept.name}</div>
                        </div>
                        <div className="text-lg font-bold text-purple-600 tabular-nums">
                          <NumberFlow value={dept.requests} />
                        </div>
                      </motion.li>
                    );
                  })}
                </ul>"""

# 3. Next Step (Emerald)
nextstep_old = """<ResponsiveContainer width="100%" height={600}>
                  <BarChart data={data?.nextStepDepartmentRequests} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={150} />
                    <Tooltip />
                    <Bar dataKey="requests" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>"""

nextstep_new = """<ul className="divide-y divide-gray-100 -mx-6 -mb-6">
                  {(data?.nextStepDepartmentRequests || []).map((dept, idx, arr) => {
                    const maxReq = Math.max(...arr.map(d => d.requests), 1);
                    const width = (dept.requests / maxReq) * 100;
                    return (
                      <motion.li 
                        key={dept.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05, duration: 0.4, ease: "easeOut" }}
                        className="px-6 py-4 flex items-center gap-4 relative overflow-hidden group hover:bg-gray-50 transition-colors"
                      >
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${width}%` }}
                          transition={{ delay: idx * 0.05 + 0.1, duration: 0.8, ease: "easeOut" }}
                          className="absolute right-0 top-0 bottom-0 bg-emerald-50/50 -z-10 border-l border-emerald-100"
                        />
                        <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 text-xs font-bold font-mono shrink-0">
                          {idx + 1}
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-semibold text-gray-900">{dept.name}</div>
                        </div>
                        <div className="text-lg font-bold text-emerald-600 tabular-nums">
                          <NumberFlow value={dept.requests} />
                        </div>
                      </motion.li>
                    );
                  })}
                </ul>"""

code = code.replace(dept_old, dept_new)
code = code.replace(prereg_old, prereg_new)
code = code.replace(nextstep_old, nextstep_new)

with open("src/app/dashboard/page.tsx", "w") as f:
    f.write(code)
