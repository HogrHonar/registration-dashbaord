const fs = require('fs');
const path = 'src/app/dashboard/page.tsx';
let code = fs.readFileSync(path, 'utf8');

// 1. Add imports
const importSearch = 'import { AlertCircle, FileText, Users, TrendingUp, MapPin, ListRestart, FileCheck, ScrollText } from "lucide-react";';
const importReplace = \`import { AlertCircle, FileText, Users, TrendingUp, MapPin, ListRestart, FileCheck, ScrollText } from "lucide-react";
import { motion } from "framer-motion";
import NumberFlow from "@number-flow/react";\`;
code = code.replace(importSearch, importReplace);

// 2. Add animation variants
const variantsSearch = 'export default function Analytics() {';
const variantsReplace = \`const containerVariants = {
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

export default function Analytics() {\`;
code = code.replace(variantsSearch, variantsReplace);

// 3. Wrap generic grid cards with motion and replace numbers with NumberFlow
const todayGridSearch = \`<div className="grid grid-cols-1 md:grid-cols-3 gap-4">\`;
const todayGridReplace = \`<motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-3 gap-4">\`;
code = code.replace(todayGridSearch, todayGridReplace);

const allGridSearch = \`<div className="grid grid-cols-1 md:grid-cols-4 gap-4">\`;
const allGridReplace = \`<motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-4 gap-4">\`;
code = code.replace(allGridSearch, allGridReplace);

const preRegGridSearch = \`<div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">\`;
const preRegGridReplace = \`<motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">\`;
// Replace first 2 occurrences of preRegGridSearch
let count = 0;
code = code.replace(new RegExp(preRegGridSearch.replace(/[.*+?^\${}()|[\\]\\\\]/g, '\\\\$&'), 'g'), match => {
  count++;
  if (count <= 2) return preRegGridReplace;
  return match;
});

// Close motion.div instead of div for the above grids
// I will just do a global replace for the closing div of those grids by matching their specific pattern
code = code.replace(/<\\/Card>\\s*<\\/div>\\s*<\\/TabsContent>/g, '</Card>\n              </motion.div>\n          </TabsContent>');
// Wait, the grid contains multiple cards. The closing div is \`</div>\` before \`</TabsContent>\` for today and all. But for prereg and nextstep it's before the next \`<Card>\`. Let's just do it manually with regex.

fs.writeFileSync(path, code);
