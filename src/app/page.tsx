"use server";

import { auth } from "@/auth";
import { SignInButton } from "./components/sign-in-button";
import Link from "next/link";
import { SignOutButton } from "./components/sign-out-button";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    // If they are logged in, probably they want to see the dashboard right away.
    // Let's redirect them to the dashboard automatically!
    redirect("/dashboard");
  }

  return (
    <div className="relative min-h-screen bg-[#F2F2F7] flex items-center justify-center p-6 overflow-hidden" dir="rtl">
      
      {/* Decorative blurry background circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-full max-h-lg opacity-40 pointer-events-none">
        <div className="absolute top-0 right-10 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl " />
        <div className="absolute top-0 left-10 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl  " />
        <div className="absolute -bottom-8 left-20 w-64 h-64 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl  " />
      </div>

      <div className="relative z-10 w-full max-w-[420px]">
        {/* Logo/Icon */}
        <div className="flex justify-center mb-8">
          <img src="/bright-logo.svg" alt="BTVI Logo" className="w-32 h-32 drop-shadow-2xl" />
        </div>

        {/* Card */}
        <div className="bg-white/80 backdrop-blur-xl border border-white p-8 rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight">بەخێربێیت</h1>
          <p className="text-[15px] text-gray-500 mb-8 leading-relaxed">
            بۆ بینینی داتاکانی تۆمارکردنی خوێندکاران، تکایە بە هەژماری گۆگڵەکەت بچۆ ژوورەوە.
          </p>
          
          <SignInButton />

          <p className="mt-6 text-[13px] text-gray-400">
            تەنها ڕێگە بە هەژمارە باوەڕپێکراوەکان دەدرێت.
          </p>
        </div>
      </div>
    </div>
  );
}
