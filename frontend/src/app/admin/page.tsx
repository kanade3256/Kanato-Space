import Link from "next/link";
import { ArrowRight, BarChart3, ExternalLink, LayoutDashboard, Shield, Sparkles } from "lucide-react";

export default function AdminTopPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-[28px] border border-[#ece8ff] bg-white p-8 shadow-[0_4px_20px_rgba(124,58,237,0.08)]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-violet-700">
              <Shield size={14} />
              Admin Top
            </div>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 lg:text-4xl">
              Kanato Space Admin Console
            </h1>
            <p className="mt-4 text-sm leading-7 text-slate-600 lg:text-base">
              公開サイトには影響を与えず、Analytics を中心に運用するための admin 専用 UI です。
              ここから分析画面へ戻る導線と、公開サイトを別タブで確認する導線を固定しています。
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/analytics"
              className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-violet-700 hover:shadow-sm"
            >
              Analytics へ
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white px-5 py-3 text-sm font-semibold text-violet-700 transition-all duration-200 hover:-translate-y-0.5 hover:bg-violet-50 hover:shadow-sm"
            >
              Site Home を確認
              <ExternalLink size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-[24px] border border-[#ece8ff] bg-white p-5 shadow-[0_4px_20px_rgba(124,58,237,0.08)] transition-transform duration-200 hover:-translate-y-1">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
              <LayoutDashboard size={18} />
            </span>
            <div>
              <p className="text-sm font-medium text-slate-500">Dashboard</p>
              <h2 className="text-base font-semibold text-slate-900">Admin Top</h2>
            </div>
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            日々の確認はここから入り、詳細分析は Analytics へ遷移します。
          </p>
        </div>

        <div className="rounded-[24px] border border-[#ece8ff] bg-white p-5 shadow-[0_4px_20px_rgba(124,58,237,0.08)] transition-transform duration-200 hover:-translate-y-1">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
              <BarChart3 size={18} />
            </span>
            <div>
              <p className="text-sm font-medium text-slate-500">Analytics</p>
              <h2 className="text-base font-semibold text-slate-900">戻り導線を固定</h2>
            </div>
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            どの admin 画面からでも分析画面へ戻れる状態を維持します。
          </p>
        </div>

        <div className="rounded-[24px] border border-[#ece8ff] bg-white p-5 shadow-[0_4px_20px_rgba(124,58,237,0.08)] transition-transform duration-200 hover:-translate-y-1">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
              <Sparkles size={18} />
            </span>
            <div>
              <p className="text-sm font-medium text-slate-500">Preview</p>
              <h2 className="text-base font-semibold text-slate-900">公開側は別タブ</h2>
            </div>
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            `/` は admin 外への遷移として明示し、公開 UI には admin 要素を混ぜません。
          </p>
        </div>
      </section>
    </div>
  );
}