"use client";

import { useEffect, useState } from "react";

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
  const [topCompanies, setTopCompanies] = useState<CompanyAccess[]>([]);
  const [latestAccess, setLatestAccess] = useState<AccessLog[]>([]);
  const [pageAccess, setPageAccess] = useState<PageAccess[]>([]);
  const [countryAccess, setCountryAccess] = useState<CountryAccess[]>([]);
  const [stats, setStats] = useState<{ totalAccess: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // 統計情報取得
        const statsRes = await fetch("/api/admin/analytics");
        if (!statsRes.ok) throw new Error("Failed to fetch stats");
        const statsData = await statsRes.json();
        setStats(statsData.data);

        // 会社別ランキング取得
        const companiesRes = await fetch("/api/admin/analytics?query=top-companies");
        if (!companiesRes.ok) throw new Error("Failed to fetch companies");
        const companiesData = await companiesRes.json();
        setTopCompanies(companiesData.data);

        // 最新アクセス取得
        const latestRes = await fetch("/api/admin/analytics?query=latest");
        if (!latestRes.ok) throw new Error("Failed to fetch latest");
        const latestData = await latestRes.json();
        setLatestAccess(latestData.data);

        // ページ別アクセス取得
        const pageRes = await fetch("/api/admin/analytics?query=by-page");
        if (!pageRes.ok) throw new Error("Failed to fetch page stats");
        const pageData = await pageRes.json();
        setPageAccess(pageData.data);

        // 国別アクセス取得
        const countryRes = await fetch("/api/admin/analytics?query=by-country");
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
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="text-center">
          <p className="text-gray-600">読み込み中...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="text-center">
          <p className="text-red-600">エラーが発生しました: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-3xl font-bold">B2B アクセス解析</h1>

        {/* 統計情報 */}
        {stats && (
          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-lg bg-white p-6 shadow">
              <h2 className="text-sm font-semibold text-gray-600">総アクセス数</h2>
              <p className="mt-2 text-2xl font-bold">{stats.totalAccess}</p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow">
              <h2 className="text-sm font-semibold text-gray-600">企業数</h2>
              <p className="mt-2 text-2xl font-bold">{topCompanies.length}</p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow">
              <h2 className="text-sm font-semibold text-gray-600">アクセス元国数</h2>
              <p className="mt-2 text-2xl font-bold">{countryAccess.length}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* 会社別ランキング */}
          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="mb-4 text-xl font-bold">企業別アクセス数（TOP20）</h2>
            <div className="space-y-3">
              {topCompanies.length > 0 ? (
                topCompanies.map((company, idx) => (
                  <div key={idx} className="flex items-center justify-between border-b pb-2">
                    <span className="truncate text-sm">{company.name || "不明"}</span>
                    <span className="ml-2 rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-800">
                      {company.count}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">データがありません</p>
              )}
            </div>
          </div>

          {/* ページ別アクセス */}
          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="mb-4 text-xl font-bold">ページ別アクセス数（TOP20）</h2>
            <div className="space-y-3">
              {pageAccess.length > 0 ? (
                pageAccess.map((page, idx) => (
                  <div key={idx} className="flex items-center justify-between border-b pb-2">
                    <span className="truncate text-sm">{page.path}</span>
                    <span className="ml-2 rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-800">
                      {page.count}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">データがありません</p>
              )}
            </div>
          </div>

          {/* 国別アクセス */}
          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="mb-4 text-xl font-bold">国別アクセス数</h2>
            <div className="space-y-3">
              {countryAccess.length > 0 ? (
                countryAccess.map((country, idx) => (
                  <div key={idx} className="flex items-center justify-between border-b pb-2">
                    <span className="truncate text-sm">{country.country}</span>
                    <span className="ml-2 rounded-full bg-purple-100 px-3 py-1 text-sm font-semibold text-purple-800">
                      {country.count}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">データがありません</p>
              )}
            </div>
          </div>

          {/* 最新アクセス一覧 */}
          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="mb-4 text-xl font-bold">最新アクセス一覧</h2>
            <div className="space-y-3">
              {latestAccess.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b text-left">
                        <th className="pb-2 font-semibold">時刻</th>
                        <th className="pb-2 font-semibold">企業</th>
                        <th className="pb-2 font-semibold">ページ</th>
                        <th className="pb-2 font-semibold">国</th>
                      </tr>
                    </thead>
                    <tbody>
                      {latestAccess.slice(0, 20).map((log, idx) => (
                        <tr key={idx} className="border-b">
                          <td className="py-2 text-xs">
                            {new Date(log.created_at).toLocaleString("ja-JP")}
                          </td>
                          <td className="truncate py-2 text-xs">{log.company_name || "不明"}</td>
                          <td className="truncate py-2 text-xs">{log.path}</td>
                          <td className="py-2 text-xs">{log.country || "-"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500">データがありません</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
