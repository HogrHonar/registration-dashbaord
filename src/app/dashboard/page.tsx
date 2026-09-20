"use client";
import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, Globe, MonitorSmartphone, FileText, Users, TrendingUp, MapPin, ListRestart, FileCheck, ScrollText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import NumberFlow from "@number-flow/react";

const BRANCHES = [
  "زانستی",
  "وێژەیی",
  "پیشەیی",
  "ئامادەیی ئیسلامی",
  "پەیمانگە پێنج ساڵییەکان",
];

const DEPARTMENTS = [
  { name: "پەرستاری", minMark: 53.5 },
  { name: "دەرمانسازی", minMark: 56.5 },
  { name: "کارگێڕی کار", minMark: 50 },
  { name: "مەوشن گرافیکس", minMark: 50 },
  { name: "بەڵگەی تاوان", minMark: 50 },
  { name: "تەکنەلۆجیای تاقیگەی پزیشکی", minMark: 50 },
  { name: "دیکۆری ناوخۆیی", minMark: 50 },
  { name: "کارگێڕی یاسا", minMark: 50 },
  { name: "میکانیکی ئۆتۆمۆبێل", minMark: 50 },
  { name: "خزمەتگوزاری و تەکنەلۆجیای چاو", minMark: 50 },
  { name: "وزە نوێبووەکان", minMark: 50 },
  { name: "وایەرسازی ئۆتۆمۆبێل", minMark: 50 },
  { name: "ئایتی (IT Support and Maintenance)", minMark: 50 },
  { name: "ئینگلیزی (بۆ پەرەپێدانی پیشەیی)", minMark: 50 },
];

const COLORS = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6"];
const DEPT_COLORS = [
  "#06b6d4",
  "#0ea5e9",
  "#3b82f6",
  "#6366f1",
  "#8b5cf6",
  "#d946ef",
  "#ec4899",
  "#f43f5e",
  "#f97316",
  "#eab308",
  "#84cc16",
  "#22c55e",
  "#10b981",
  "#14b8a6",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const APPLE_COLORS = ["#007AFF", "#34C759", "#FF9500", "#FF3B30", "#AF52DE", "#5856D6", "#FF2D55", "#5AC8FA"];


function StorageBarChart({ reqs }: { reqs: { name: string, requests: number }[] }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const total = reqs.reduce((sum, d) => sum + d.requests, 0) || 1;

  return (
    <>
      <div 
        className="w-full h-3 rounded-full overflow-hidden flex mb-6 bg-gray-100"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {reqs.map((dept, idx) => {
          const isHovered = hoveredIndex === idx;
          const isDimmed = hoveredIndex !== null && hoveredIndex !== idx;
          return (
            <motion.div
              key={dept.name}
              initial={{ width: 0 }}
              animate={{ 
                width: `${Math.max((dept.requests / total) * 100, 0.5)}%`,
                opacity: isDimmed ? 0.3 : 1
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onMouseEnter={() => setHoveredIndex(idx)}
              onTouchStart={() => setHoveredIndex(idx)}
              style={{ backgroundColor: APPLE_COLORS[idx % APPLE_COLORS.length] }}
              className="relative h-full border-l border-white last:border-l-0 cursor-pointer group"
            >
              {/* Tooltip */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 flex flex-col items-center pointer-events-none"
                  >
                    <div className="bg-black/90 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-lg shadow-xl whitespace-nowrap">
                      {dept.name}: {dept.requests}
                    </div>
                    <div className="w-2.5 h-2.5 bg-black/90 rotate-45 -mt-1.5 rounded-sm" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
        {reqs.map((dept, idx) => {
          const isDimmed = hoveredIndex !== null && hoveredIndex !== idx;
          return (
            <motion.div 
              key={dept.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: isDimmed ? 0.4 : 1 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-between cursor-pointer transition-opacity"
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              onTouchStart={() => setHoveredIndex(idx)}
              onTouchEnd={() => setHoveredIndex(null)}
            >
              <div className="flex items-center gap-2 overflow-hidden">
                <div 
                  className="w-2.5 h-2.5 rounded-full shrink-0 transition-transform" 
                  style={{ backgroundColor: APPLE_COLORS[idx % APPLE_COLORS.length], transform: hoveredIndex === idx ? 'scale(1.2)' : 'scale(1)' }} 
                />
                <span className={`text-sm truncate transition-colors ${hoveredIndex === idx ? 'text-black font-semibold' : 'text-gray-800'}`}>
                  {dept.name}
                </span>
              </div>
              <span className={`text-sm tabular-nums shrink-0 mr-2 transition-colors ${hoveredIndex === idx ? 'text-black font-bold' : 'text-gray-500'}`}>
                <NumberFlow value={dept.requests} />
              </span>
            </motion.div>
          );
        })}
      </div>
    </>
  );
}



function HealthAcceptanceList({ stats }: { stats: { name: string, minMark: number, totalRequests: number, qualified: number }[] }) {
  return (
    <div className="flex flex-col gap-5 w-full">
      {stats.map((dept, idx) => {
        const percent = dept.totalRequests > 0 ? (dept.qualified / dept.totalRequests) * 100 : 0;
        const dashArray = 2 * Math.PI * 16;
        const dashOffset = dashArray - (dashArray * percent) / 100;
        const color = APPLE_COLORS[idx % APPLE_COLORS.length];
        
        return (
          <motion.div 
            key={dept.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05, duration: 0.4 }}
            className="flex items-center gap-4 group"
          >
            <div className="relative w-11 h-11 shrink-0">
              <svg className="w-full h-full -rotate-90 drop-shadow-sm" viewBox="0 0 40 40">
                <circle cx="20" cy="20" r="16" className="fill-none stroke-gray-100" strokeWidth="4.5" />
                <motion.circle 
                  cx="20" cy="20" r="16" 
                  className="fill-none" 
                  strokeWidth="4.5" 
                  strokeLinecap="round"
                  stroke={color}
                  initial={{ strokeDashoffset: dashArray }}
                  animate={{ strokeDashoffset: dashOffset }}
                  transition={{ delay: idx * 0.1 + 0.2, duration: 0.8, ease: "easeOut" }}
                  style={{ strokeDasharray: dashArray }}
                />
              </svg>
            </div>
            
            <div className="flex-1 flex flex-col justify-center border-b border-gray-100 pb-3 group-last:border-0 group-last:pb-0">
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-[15px] font-semibold text-gray-900">{dept.name}</span>
                <span className="text-[16px] font-bold tabular-nums" style={{ color }}>
                  <NumberFlow value={percent} format={{ maximumFractionDigits: 0 }} />%
                </span>
              </div>
              <div className="text-[12px] text-gray-500 flex justify-between">
                <span>کەمترین نمرە: {dept.minMark}</span>
                <span>{dept.qualified} وەرگیراو لە {dept.totalRequests}</span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}




function SettingsList({ data }: { data: { name: string, value: number }[] }) {
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

function MiniBarsList({ data, color }: { data: { name: string, value: number }[], color: string }) {
  const maxVal = Math.max(...data.map(d => d.value), 1);
  return (
    <div className="flex flex-col gap-4 w-full">
      {data.map((item, idx) => (
        <div key={item.name} className="flex flex-col gap-1.5 group">
          <div className="flex justify-between items-baseline">
            <span className="text-[15px] font-medium text-gray-900">{item.name}</span>
            <span className="text-[15px] text-gray-500 tabular-nums"><NumberFlow value={item.value} /></span>
          </div>
          <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${(item.value / maxVal) * 100}%` }}
              transition={{ delay: idx * 0.05, duration: 0.6, ease: "easeOut" }}
              className="h-full rounded-full"
              style={{ backgroundColor: color }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}



export default function Analytics() {
  interface AnalyticsData {
  todayPreReg: number;
  todayNextStep: number;
    filledForms: number;
    returnedToday: number;
    todayfilled: number;
    todayDocumented: number;
    documentedForms: number;
    totalForms: number;
    fillPercentage: number;
    returnedForms: number;
    pendingForms: number;
    branchData: { name: string; value: number }[];
    departmentRequests: { name: string; requests: number }[];
    departmentStats: {
      name: string;
      minMark: number;
      totalRequests: number;
      qualified: number;
    }[];
    nextStepTotal: number;
    nextStepDepartmentRequests: { name: string; requests: number }[];
    nextStepDepartmentStats: {
      name: string;
      minMark: number;
      totalRequests: number;
      qualified: number;
    }[];
    locationData: { name: string; value: number }[];
    preRegTotal: number;
    preRegDepartmentRequests: { name: string; requests: number }[];
    preRegDepartmentStats: {
      name: string;
      minMark: number;
      totalRequests: number;
      qualified: number;
    }[];
  }

  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      // Replace with your actual API endpoint
      const response = await fetch("/api/analytics");
      if (!response.ok) throw new Error("Failed to fetch data");
      const result = await response.json();
      setData(result);
    } catch (err) {
      console.log("====================================");
      console.log(err);
      console.log("====================================");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading Please...
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="flex items-center justify-center h-screen gap-2">
        <AlertCircle className="w-6 h-6" />
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            ڕاپۆرتی فۆڕمی تۆمارکردن
          </h1>
        </div>
        <Tabs defaultValue="all" className="space-y-4" dir="rtl">
          <TabsList className="mb-4 w-full flex justify-start sm:justify-center overflow-x-auto hide-scrollbar h-auto p-1" dir="rtl">
            <TabsTrigger value="all">گشتی</TabsTrigger>
            <TabsTrigger value="today">ئەمرۆ</TabsTrigger>
          </TabsList>
          <TabsContent value="today" className="mb-8" dir="rtl">
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              
              <motion.div variants={itemVariants} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
                <div className="relative flex justify-between items-start mb-4">
                  <div className="text-sm font-semibold text-gray-500">فۆرمی تۆمارکراو</div>
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
              </motion.div>

            </motion.div>
          </TabsContent>

          <TabsContent value="all" className="mb-8" dir="rtl">
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
              
              <motion.div variants={itemVariants} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
                <div className="relative flex justify-between items-start mb-4">
                  <div className="text-sm font-semibold text-gray-500">فۆرمی تۆمارکراو</div>
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
          </TabsContent>
        </Tabs>

        {/* Main Charts */}
        <Tabs defaultValue="branches" className="space-y-4" dir="rtl">
          <TabsList className="w-full flex justify-start sm:justify-center overflow-x-auto hide-scrollbar h-auto p-1">
            <TabsTrigger value="branches">لقەکان</TabsTrigger>
            <TabsTrigger value="departments">بەشەکان</TabsTrigger>
            <TabsTrigger value="prereg">تۆمارکردنی پێشوەختە (ئۆنلاین)</TabsTrigger>
            <TabsTrigger value="nextstep">نێکست ستێپ</TabsTrigger>
          </TabsList>

          {/* Branch Distribution */}
          <TabsContent value="branches">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div variants={itemVariants}>
                <Card>
                <CardHeader>
                  <CardTitle>ژمارەی فۆرم بەپێی لقەکان</CardTitle>
                </CardHeader>
                <CardContent>
                  <MiniBarsList data={data?.branchData || []} color="#007AFF" />
                </CardContent>
              </Card>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Card>
                <CardHeader>
                  <CardTitle>ژمارەی فۆرم بەپێی ناونیشان</CardTitle>
                </CardHeader>
                <CardContent>
                  <SettingsList data={data?.locationData || []} />
                </CardContent>
              </Card>
              </motion.div>
            </div>
          </TabsContent>

          {/* Department Analysis */}
          <TabsContent value="departments" className="space-y-6">
            <motion.div variants={itemVariants}>
                <Card>
              <CardHeader>
                <CardTitle>داواکاری خوێندن بەپێی بەشەکان</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full">
                  <StorageBarChart reqs={data?.departmentRequests || []} />
                </div>
              </CardContent>
            </Card>
              </motion.div>

            <motion.div variants={itemVariants}>
                <Card>
              <CardHeader>
                <CardTitle>ژمارەی وەرگیراوانی بەش بەپێی نمرە</CardTitle>
              </CardHeader>
              <CardContent>
                <HealthAcceptanceList stats={data?.departmentStats || []} />
              </CardContent>
            </Card>
              </motion.div>
          </TabsContent>

          {/* Pre-registration Analysis */}
          <TabsContent value="prereg" className="space-y-6">
            

            <motion.div variants={itemVariants}>
                <Card>
              <CardHeader>
                <CardTitle>داواکاری پێشوەختە بەپێی بەشەکان</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full">
                  <StorageBarChart reqs={data?.preRegDepartmentRequests || []} />
                </div>
              </CardContent>
            </Card>
              </motion.div>

            {/* Pre-registration Acceptance Stats */}
            <motion.div variants={itemVariants}>
                <Card>
              <CardHeader>
                <CardTitle>ئەگەری وەرگرتنی پێشوەختە بەپێی نمرە</CardTitle>
              </CardHeader>
              <CardContent>
                <HealthAcceptanceList stats={data?.preRegDepartmentStats || []} />
              </CardContent>
            </Card>
              </motion.div>

          </TabsContent>

          {/* Next Step Analysis */}
          <TabsContent value="nextstep" className="space-y-6">
            

            <motion.div variants={itemVariants}>
                <Card>
              <CardHeader>
                <CardTitle>داواکاری نێکست ستێپ بەپێی بەشەکان</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full">
                  <StorageBarChart reqs={data?.nextStepDepartmentRequests || []} />
                </div>
              </CardContent>
            </Card>
              </motion.div>

            <motion.div variants={itemVariants}>
                <Card>
              <CardHeader>
                <CardTitle>ئەگەری وەرگرتنی نێکست ستێپ بەپێی نمرە</CardTitle>
              </CardHeader>
              <CardContent>
                <HealthAcceptanceList stats={data?.nextStepDepartmentStats || []} />
              </CardContent>
            </Card>
              </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}