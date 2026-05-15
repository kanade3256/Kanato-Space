"use client";

import Link from "next/link";
import { ExternalLink, LogOut, Shield } from "lucide-react";

import { AdminNav } from "@/components/admin/AdminNav";
import { getSupabaseBrowserClient } from "@/lib/supabase";

export function AdminHeader() {
  const supabaseClient = getSupabaseBrowserClient();

  const handleLogout = async () => {
    await supabaseClient.auth.signOut();
    window.location.href = "/";
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#ece8ff] bg-white/95 shadow-[0_4px_20px_rgba(124,58,237,0.08)] backdrop-blur">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-center justify-between gap-4 xl:justify-start">
          <Link href="/admin" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
              <Shield size={20} />
            </span>
            <span className="flex flex-col">
              <span className="text-base font-semibold tracking-tight text-slate-900">Kanato Space</span>
              <span className="text-xs font-medium uppercase tracking-[0.22em] text-violet-500">Admin</span>
            </span>
          </Link>

          <span className="rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-violet-700 xl:hidden">
            Admin
          </span>
        </div>

        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-center">
          <AdminNav className="justify-start xl:justify-center" />

          <div className="flex flex-wrap items-center gap-3 xl:justify-end">
            <Link
              href="/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white px-4 py-2 text-sm font-medium text-violet-700 transition-all duration-200 hover:-translate-y-0.5 hover:bg-violet-50 hover:shadow-sm"
            >
              View Site
              <ExternalLink size={16} />
            </Link>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-violet-700 hover:shadow-sm"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}