import Link from "next/link";
import { ExternalLink } from "lucide-react";

import { AdminNav } from "@/components/admin/AdminNav";

export function AdminSidebar() {
  return (
    <aside className="sticky top-24 rounded-[24px] border border-[#ece8ff] bg-white p-5 shadow-[0_4px_20px_rgba(124,58,237,0.08)]">
      <div className="space-y-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-violet-500">Admin Center</p>
          <h2 className="mt-2 text-lg font-semibold text-slate-900">Navigation</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Analytics を中心に運用し、公開サイトへは Preview 経由で分岐します。
          </p>
        </div>

        <AdminNav orientation="vertical" className="w-full" />

        <div className="rounded-2xl bg-gradient-to-br from-violet-50 to-white p-4">
          <p className="text-sm font-semibold text-violet-900">Site Home を確認</p>
          <p className="mt-1 text-sm leading-6 text-violet-700/80">公開サイトは新しいタブで開きます。</p>
          <Link
            href="/"
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white px-4 py-2 text-sm font-medium text-violet-700 transition-all duration-200 hover:-translate-y-0.5 hover:bg-violet-50 hover:shadow-sm"
          >
            View Site
            <ExternalLink size={16} />
          </Link>
        </div>
      </div>
    </aside>
  );
}