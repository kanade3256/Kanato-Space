import Link from "next/link";
import { Cloud, Zap, Brain } from "lucide-react";

export function Hero() {
  const features = [
    {
      icon: Cloud,
      text: "AWS × LINE を活用した業務改革システム開発",
    },
    {
      icon: Zap,
      text: "歩行解析 × Explainable AI の研究に従事",
    },
    {
      icon: Brain,
      text: "実運用を想視した設計と安全を重視",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(120deg,#eef8ff_0%,#eee7ff_48%,#ffe7f5_100%)]">
      <div className="mx-auto grid min-h-[520px] max-w-7xl grid-cols-1 items-center gap-12 px-8 py-20 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Left Content */}
        <div className="space-y-8">
          <div className="space-y-6">
            <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Kanato Space.
            </h1>
            <p className="text-lg text-slate-700 leading-relaxed max-w-xl font-medium">
              技術で人の課題を解決するための試行錯誤と改善の記録
            </p>
          </div>

          {/* Features with Icons */}
          <div className="space-y-4 pt-2">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="flex items-start gap-4 group">
                  <div className="flex-shrink-0 mt-1 bg-white/70 backdrop-blur-md rounded-xl p-2.5 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                    <Icon className="h-5 w-5 text-indigo-600" strokeWidth={2.5} />
                  </div>
                  <p className="text-base text-slate-700 leading-relaxed pt-0.5 font-medium">
                    {feature.text}
                  </p>
                </div>
              );
            })}
          </div>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-[12px] bg-slate-900 text-white font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
            >
              About
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/lab"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-[12px] bg-white/70 backdrop-blur-md text-slate-900 font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 border border-white/50 hover:bg-white/80"
            >
              Labを見る
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="#latest-updates"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-[12px] text-slate-700 font-semibold hover:bg-white/60 transition-all duration-300"
            >
              最新の更新
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Right Visual - 3D Sphere */}
        <div className="relative hidden min-h-[440px] items-center justify-center lg:flex">
          {/* Glow Light */}
          <div className="absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-400/20 blur-3xl" />

          {/* Orbital Lines */}
          <div className="absolute left-1/2 top-1/2 h-[300px] w-[620px] -translate-x-1/2 -translate-y-1/2 rotate-[-12deg] rounded-full border border-white/60" />
          <div className="absolute left-1/2 top-1/2 h-[230px] w-[560px] -translate-x-1/2 -translate-y-1/2 rotate-[16deg] rounded-full border border-white/45" />
          <div className="absolute left-1/2 top-1/2 h-[360px] w-[680px] -translate-x-1/2 -translate-y-1/2 rotate-[8deg] rounded-full border border-white/35" />

          {/* Orbital Light Points */}
          <span className="absolute left-[20%] top-[42%] h-3 w-3 rounded-full bg-white shadow-[0_0_18px_rgba(255,255,255,0.9)]" />
          <span className="absolute right-[18%] top-[28%] h-2.5 w-2.5 rounded-full bg-sky-400 shadow-[0_0_18px_rgba(56,189,248,0.8)]" />
          <span className="absolute right-[28%] bottom-[22%] h-2.5 w-2.5 rounded-full bg-white shadow-[0_0_18px_rgba(255,255,255,0.9)]" />

          {/* 3D Sphere */}
          <div className="relative h-[240px] w-[240px] rounded-full">
            {/* Outer glow layer (air feel - furthest) */}
            <div className="absolute inset-[-20%] rounded-full bg-white/20 blur-3xl" />
            
            {/* Middle glow layer (soft air) */}
            <div className="absolute inset-[-12%] rounded-full bg-white/40 blur-2xl" />
            
            {/* Main sphere gradient */}
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,#dbeafe_0%,#93c5fd_18%,#3b82f6_42%,#6366f1_65%,#a78bfa_85%,#f0abfc_100%)] shadow-[0_10px_40px_rgba(99,102,241,0.15)]" />
            
            {/* Subtle highlight (soft, weak) */}
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_35%_30%,rgba(255,255,255,0.35),transparent_40%)]" />
            
            {/* Inner rim */}
            <div className="absolute inset-[10%] rounded-full border border-white/15" />
          </div>

          {/* Labels */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Development */}
            <div className="absolute top-6 left-8" style={{ animation: "float-subtle 3s ease-in-out infinite" }}>
              <div className="bg-white/80 backdrop-blur-md rounded-full px-4 py-2 shadow-lg text-xs font-semibold text-slate-900 whitespace-nowrap">
                Development
              </div>
            </div>

            {/* Data Analysis */}
            <div className="absolute top-12 right-6" style={{ animation: "float-subtle 3s ease-in-out infinite 0.5s" }}>
              <div className="bg-white/80 backdrop-blur-md rounded-full px-4 py-2 shadow-lg text-xs font-semibold text-slate-900 whitespace-nowrap">
                Data Analysis
              </div>
            </div>

            {/* Automation */}
            <div className="absolute bottom-20 right-12" style={{ animation: "float-subtle 3s ease-in-out infinite 1s" }}>
              <div className="bg-white/80 backdrop-blur-md rounded-full px-4 py-2 shadow-lg text-xs font-semibold text-slate-900 whitespace-nowrap">
                Automation
              </div>
            </div>

            {/* Cloud */}
            <div className="absolute bottom-8 right-4" style={{ animation: "float-subtle 3s ease-in-out infinite 1.5s" }}>
              <div className="bg-white/80 backdrop-blur-md rounded-full px-4 py-2 shadow-lg text-xs font-semibold text-slate-900 whitespace-nowrap">
                Cloud
              </div>
            </div>

            {/* AI / Research */}
            <div className="absolute bottom-12 left-8" style={{ animation: "float-subtle 3s ease-in-out infinite 2s" }}>
              <div className="bg-white/80 backdrop-blur-md rounded-full px-4 py-2 shadow-lg text-xs font-semibold text-slate-900 whitespace-nowrap">
                AI / Research
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
