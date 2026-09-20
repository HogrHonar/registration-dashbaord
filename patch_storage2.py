import re

with open("src/app/dashboard/page.tsx", "r") as f:
    code = f.read()

apple_colors = 'const APPLE_COLORS = ["#007AFF", "#34C759", "#FF9500", "#FF3B30", "#AF52DE", "#5856D6", "#FF2D55", "#5AC8FA"];'
if "APPLE_COLORS" not in code:
    code = code.replace('export default function Dashboard() {', f'{apple_colors}\n\nexport default function Dashboard() {{')

def get_storage_html(data_key):
    return f"""<div className="w-full">
                  {{(() => {{
                    const reqs = {data_key} || [];
                    const total = reqs.reduce((sum, d) => sum + d.requests, 0) || 1;
                    return (
                      <>
                        <div className="w-full h-3 rounded-full overflow-hidden flex mb-6 bg-gray-100">
                          {{reqs.map((dept, idx) => (
                            <motion.div
                              key={{dept.name}}
                              initial={{{{ width: 0 }}}}
                              animate={{{{ width: `${{Math.max((dept.requests / total) * 100, 0.5)}}%` }}}}
                              transition={{{{ delay: idx * 0.05, duration: 0.6, ease: "easeOut" }}}}
                              style={{{{ backgroundColor: APPLE_COLORS[idx % APPLE_COLORS.length] }}}}
                              className="h-full border-r border-white last:border-r-0"
                            />
                          ))}}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                          {{reqs.map((dept, idx) => (
                            <motion.div 
                              key={{dept.name}}
                              initial={{{{ opacity: 0 }}}}
                              animate={{{{ opacity: 1 }}}}
                              transition={{{{ delay: 0.3 + (idx * 0.05), duration: 0.3 }}}}
                              className="flex items-center justify-between"
                            >
                              <div className="flex items-center gap-2 overflow-hidden">
                                <div 
                                  className="w-2.5 h-2.5 rounded-full shrink-0" 
                                  style={{{{ backgroundColor: APPLE_COLORS[idx % APPLE_COLORS.length] }}}} 
                                />
                                <span className="text-sm text-gray-800 truncate">{{dept.name}}</span>
                              </div>
                              <span className="text-sm text-gray-500 tabular-nums shrink-0 ml-2">
                                <NumberFlow value={{dept.requests}} />
                              </span>
                            </motion.div>
                          ))}}
                        </div>
                      </>
                    );
                  }})()}}
                </div>"""

# 1. Departments
dept_pattern = re.compile(r'<ul className="divide-y divide-gray-100 -mx-6 -mb-6">\s*\{\(data\?\.departmentRequests \|\| \[\]\)\.map\(\(dept, idx, arr\) => \{.*?</motion\.li>\s*\);\s*\}\)\}\s*</ul>', re.DOTALL)
code = dept_pattern.sub(get_storage_html('data?.departmentRequests'), code)

# 2. PreReg
prereg_pattern = re.compile(r'<ul className="divide-y divide-gray-100 -mx-6 -mb-6">\s*\{\(data\?\.preRegDepartmentRequests \|\| \[\]\)\.map\(\(dept, idx, arr\) => \{.*?</motion\.li>\s*\);\s*\}\)\}\s*</ul>', re.DOTALL)
code = prereg_pattern.sub(get_storage_html('data?.preRegDepartmentRequests'), code)

# 3. NextStep
nextstep_pattern = re.compile(r'<ul className="divide-y divide-gray-100 -mx-6 -mb-6">\s*\{\(data\?\.nextStepDepartmentRequests \|\| \[\]\)\.map\(\(dept, idx, arr\) => \{.*?</motion\.li>\s*\);\s*\}\)\}\s*</ul>', re.DOTALL)
code = nextstep_pattern.sub(get_storage_html('data?.nextStepDepartmentRequests'), code)

with open("src/app/dashboard/page.tsx", "w") as f:
    f.write(code)
