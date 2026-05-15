"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Building2,
  ChartNoAxesCombined,
  Clock3,
  FileText,
  Globe2,
  Users,
} from "lucide-react";

import { AnalyticsCard } from "@/components/admin/AnalyticsCard";
import { CountBadge } from "@/components/admin/CountBadge";
import { MetricCard } from "@/components/admin/MetricCard";
import { getSupabaseBrowserClient } from "@/lib/supabase";

interface CompanyAccess {
  name: string;
  count: number;
}

interface PageAccess {
  path: string;
  count: number;
}

interface CountryAccess {
  country: string;
  count: number;
}

interface AccessLog {
  id: string;
  created_at: string;
  path: string;
  referrer: string | null;
  user_agent: string;
  ip_hash: string;
  company_name: string | null;
  org: string | null;
  asn: string | null;
  country: string | null;
  region: string | null;
  city: string | null;
}

export default function AdminAnalyticsPage() {
  const router = useRouter();
  const [topCompanies, setTopCompanies] = useState<CompanyAccess[]>([]);
  const [latestAccess, setLatestAccess] = useState<AccessLog[]>([]);
  const [pageAccess, setPageAccess] = useState<PageAccess[]>([]);
  const [countryAccess, setCountryAccess] = useState<CountryAccess[]>([]);
  const [stats, setStats] = useState<{ totalAccess: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const numberFormatter = new Intl.NumberFormat("ja-JP");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Supabase のセッションを取得
        const supabase = getSupabaseBrowserClient();
        const { data, error: sessionError } = await supabase.auth.getSession();

        if (sessionError || !data.session) {
          console.log("[Analytics] No session found, redirecting to login");
          router.replace("/auth/login");
          return;
        }

        const token = data.session.access_token;
        const headers = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        };

        // 統計情報取得
        const statsRes = await fetch("/api/admin/analytics", { headers });
        console.log("[Analytics] Stats response status:", statsRes.status);
        if (!statsRes.ok) throw new Error("Failed to fetch stats");
        const statsData = await statsRes.json();
        setStats(statsData.data);

        // 会社別ランキング取得
        const companiesRes = await fetch("/api/admin/analytics?query=top-companies", { headers });
        if (!companiesRes.ok) throw new Error("Failed to fetch companies");
        const companiesData = await companiesRes.json();
        setTopCompanies(companiesData.data);

        // 最新アクセス取得
        const latestRes = await fetch("/api/admin/analytics?query=latest", { headers });
        if (!latestRes.ok) throw new Error("Failed to fetch latest");
        const latestData = await latestRes.json();
        setLatestAccess(latestData.data);

        // ページ別アクセス取得
        const pageRes = await fetch("/api/admin/analytics?query=by-page", { headers });
        if (!pageRes.ok) throw new Error("Failed to fetch page stats");
        const pageData = await pageRes.json();
        setPageAccess(pageData.data);

        // 国別アクセス取得
        const countryRes = await fetch("/api/admin/analytics?query=by-country", { headers });
        if (!countryRes.ok) throw new Error("Failed to fetch country stats");
        const countryData = await countryRes.json();
        setCountryAccess(countryData.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  if (loading) {
    return (
      <div className="rounded-[28px] border border-[#ece8ff] bg-white p-8 shadow-[0_4px_20px_rgba(124,58,237,0.08)]">
        <div className="text-center">
          <p className="text-sm font-medium text-slate-500">読み込み中...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-[28px] border border-[#ece8ff] bg-white p-8 shadow-[0_4px_20px_rgba(124,58,237,0.08)]">
        <div className="text-center">
          <p className="text-sm font-medium text-rose-600">エラーが発生しました: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[28px] border border-[#ece8ff] bg-white p-6 shadow-[0_4px_20px_rgba(124,58,237,0.08)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-violet-500">Analytics Dashboard</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">B2B アクセス解析</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
              企業別、ページ別、国別のアクセス傾向を一画面で確認できます。admin 専用ナビゲーションから
              いつでも戻れる構成です。
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white px-4 py-2 text-sm font-medium text-violet-700 transition-all duration-200 hover:-translate-y-0.5 hover:bg-violet-50 hover:shadow-sm"
            >
              Admin Top
            </Link>
            <Link
              href="/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-violet-700 hover:shadow-sm"
            >
              View Site
            </Link>
          </div>
        </div>
      </section>

      {stats && (
        <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <MetricCard
            label="総アクセス数"
            value={numberFormatter.format(stats.totalAccess)}
            icon={<Users size={22} />}
            description="全期間のアクセス総数です。"
          />
          <MetricCard
            label="企業数"
            value={numberFormatter.format(topCompanies.length)}
            icon={<Building2 size={22} />}
            description="ユニークな企業名の件数です。"
          />
          <MetricCard
            label="アクセス元国数"
            value={numberFormatter.format(countryAccess.length)}
            icon={<ChartNoAxesCombined size={22} />}
            description="アクセス元として観測された国の数です。"
          />
        </section>
      )}

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <AnalyticsCard title="企業別アクセス数 TOP20" icon={<Building2 size={18} />}>
          <div className="space-y-2">
            {topCompanies.length > 0 ? (
              topCompanies.map((company, idx) => (
                <div
                  key={`${company.name || "unknown"}-${idx}`}
                  className="flex items-center justify-between rounded-2xl border-b border-slate-100 px-1 py-3 transition-colors duration-200 last:border-b-0 hover:bg-violet-50/60"
                >
                  <span className="mr-4 truncate text-sm font-medium text-slate-700">
                    {company.name || "不明"}
                  </span>
                  <CountBadge>{numberFormatter.format(company.count)}</CountBadge>
                </div>
              ))
            ) : (
              <p className="py-6 text-sm text-slate-500">データがありません</p>
            )}
          </div>
        </AnalyticsCard>

        <AnalyticsCard title="ページ別アクセス数 TOP20" icon={<FileText size={18} />}>
          <div className="space-y-2">
            {pageAccess.length > 0 ? (
              pageAccess.map((page, idx) => (
                <div
                  key={`${page.path}-${idx}`}
                  className="flex items-center justify-between rounded-2xl border-b border-slate-100 px-1 py-3 transition-colors duration-200 last:border-b-0 hover:bg-violet-50/60"
                >
                  <span className="mr-4 truncate text-sm font-medium text-slate-700">{page.path}</span>
                  <CountBadge>{numberFormatter.format(page.count)}</CountBadge>
                </div>
              ))
            ) : (
              <p className="py-6 text-sm text-slate-500">データがありません</p>
            )}
          </div>
        </AnalyticsCard>

        <AnalyticsCard title="国別アクセス数" icon={<Globe2 size={18} />}>
          <div className="space-y-2">
            {countryAccess.length > 0 ? (
              countryAccess.map((country, idx) => (
                <div
                  key={`${country.country}-${idx}`}
                  className="flex items-center justify-between rounded-2xl border-b border-slate-100 px-1 py-3 transition-colors duration-200 last:border-b-0 hover:bg-violet-50/60"
                >
                  <span className="mr-4 truncate text-sm font-medium text-slate-700">
                    {country.country || "-"}
                  </span>
                  <CountBadge>{numberFormatter.format(country.count)}</CountBadge>
                </div>
              ))
            ) : (
              <p className="py-6 text-sm text-slate-500">データがありません</p>
            )}
          </div>
        </AnalyticsCard>

        <AnalyticsCard title="最新アクセス一覧" icon={<Clock3 size={18} />}>
          {latestAccess.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-separate border-spacing-0 text-sm">
                <thead>
                  <tr className="bg-slate-50 text-left text-xs uppercase tracking-[0.16em] text-slate-500">
                    <th className="rounded-tl-2xl px-4 py-3 font-semibold">時刻</th>
                    <th className="px-4 py-3 font-semibold">企業</th>
                    <th className="px-4 py-3 font-semibold">ページ</th>
                    <th className="rounded-tr-2xl px-4 py-3 font-semibold">国</th>
                  </tr>
                </thead>
                <tbody>
                  {latestAccess.slice(0, 20).map((log, idx) => (
                    <tr
                      key={`${log.id}-${idx}`}
                      className="border-b border-slate-100 transition-colors duration-200 hover:bg-violet-50/50"
                    >
                      <td className="px-4 py-4 text-xs text-slate-500">
                        {new Date(log.created_at).toLocaleString("ja-JP")}
                      </td>
                      <td className="px-4 py-4 text-xs font-medium text-slate-700">
                        {log.company_name || "不明"}
                      </td>
                      <td className="px-4 py-4 text-xs text-slate-600">{log.path}</td>
                      <td className="px-4 py-4 text-xs text-slate-600">{log.country || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="py-6 text-sm text-slate-500">データがありません</p>
          )}
        </AnalyticsCard>
      </section>
    </div>
  );
}
