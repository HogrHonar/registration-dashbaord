import re

with open("src/app/dashboard/page.tsx", "r") as f:
    code = f.read()

# Imports
code = code.replace(
    'import { AlertCircle, FileText, Users, TrendingUp, MapPin, ListRestart, FileCheck, ScrollText } from "lucide-react";',
    'import { AlertCircle, FileText, Users, TrendingUp, MapPin, ListRestart, FileCheck, ScrollText } from "lucide-react";\nimport { motion } from "framer-motion";\nimport NumberFlow from "@number-flow/react";'
)

# Variants
variants = """const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function Analytics() {"""
code = code.replace("export default function Analytics() {", variants)

# Replace <div> with <motion.div> for the Card
code = re.sub(r'<Card>', r'<motion.div variants={itemVariants}>\n                <Card>', code)
code = re.sub(r'</Card>', r'</Card>\n              </motion.div>', code)

# Replace the grid wrappers
code = code.replace('<div className="grid grid-cols-1 md:grid-cols-3 gap-4">', '<motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-3 gap-4">')
code = code.replace('<div className="grid grid-cols-1 md:grid-cols-4 gap-4">', '<motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-4 gap-4">')
code = code.replace('<div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">', '<motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">')

# Close the motion divs instead of normal divs
code = code.replace('              </motion.div>\n            </div>\n          </TabsContent>', '              </motion.div>\n            </motion.div>\n          </TabsContent>')
code = code.replace('              </motion.div>\n            </div>\n\n            <motion.div variants={itemVariants}>', '              </motion.div>\n            </motion.div>\n\n            <motion.div variants={itemVariants}>')

# Wait, this might get messy. Let's just fix the closing div manually for the grids.
# A grid is `<div className="grid ...">`. If I changed it to `<motion.div ... className="grid ...">`, I should change the corresponding `</div>` to `</motion.div>`.
# For today: 
code = code.replace('              </motion.div>\n            </div>\n          </TabsContent>', '              </motion.div>\n            </motion.div>\n          </TabsContent>')

# The numbers replacement for NumberFlow
# {data?.todayfilled} -> <NumberFlow value={data?.todayfilled || 0} />
code = re.sub(r'\{data\?\.todayfilled\}', r'<NumberFlow value={data?.todayfilled || 0} />', code)
code = re.sub(r'\{data\?\.returnedToday\}', r'<NumberFlow value={data?.returnedToday || 0} />', code)
code = re.sub(r'\{data\?\.todayDocumented\}', r'<NumberFlow value={data?.todayDocumented || 0} />', code)
code = re.sub(r'\{data\?\.filledForms\}', r'<NumberFlow value={data?.filledForms || 0} />', code)
code = re.sub(r'\{data\?\.totalForms\}', r'<NumberFlow value={data?.totalForms || 0} />', code)
code = re.sub(r'\{data\?\.returnedForms\}', r'<NumberFlow value={data?.returnedForms || 0} />', code)
code = re.sub(r'\{data\?\.documentedForms\}', r'<NumberFlow value={data?.documentedForms || 0} />', code)
code = re.sub(r'\{data\?\.pendingForms\}', r'<NumberFlow value={data?.pendingForms || 0} />', code)
code = re.sub(r'\{data\?\.preRegTotal \|\| 0\}', r'<NumberFlow value={data?.preRegTotal || 0} />', code)
code = re.sub(r'\{data\?\.nextStepTotal \|\| 0\}', r'<NumberFlow value={data?.nextStepTotal || 0} />', code)


with open("src/app/dashboard/page.tsx", "w") as f:
    f.write(code)
