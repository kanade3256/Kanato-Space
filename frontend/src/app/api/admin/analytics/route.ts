import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { getSupabaseAdminClient } from "@/lib/supabase";
import { isAdminEmail } from "@/lib/auth-utils";

type CookieToSet = {
  name: string;
  value: string;
  options?: {
    domain?: string;
    path?: string;
    maxAge?: number;
    expires?: Date;
    httpOnly?: boolean;
    secure?: boolean;
    sameSite?: "lax" | "strict" | "none";
  };
};

/**
 * 管理者認証をチェック
 */
async function checkAdminAuth(request: NextRequest): Promise<{ email: string } | null> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  const response = NextResponse.next();
  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet: CookieToSet[]) {
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email || !isAdminEmail(user.email)) {
    return null;
  }

  return { email: user.email };
}

/**
 * 会社別アクセス数ランキング
 */
export async function GET(request: NextRequest) {
  const adminUser = await checkAdminAuth(request);

  if (!adminUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabase = getSupabaseAdminClient();

    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");

    if (query === "top-companies") {
      // 会社別アクセス数ランキング
      const { data, error } = await supabase
        .from("access_logs")
        .select("company_name", { count: "exact" })
        .not("company_name", "is", null)
        .order("created_at", { ascending: false })
        .limit(1000);

      if (error) {
        throw error;
      }

      // company_nameでグループ化してカウント
      const companyStats = data.reduce(
        (acc, row) => {
          const company = row.company_name || "Unknown";
          acc[company] = (acc[company] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>
      );

      const topCompanies = Object.entries(companyStats)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 20)
        .map(([name, count]) => ({ name, count }));

      return NextResponse.json({ data: topCompanies });
    } else if (query === "latest") {
      // 最新アクセス一覧（直近100件）
      const { data, error } = await supabase
        .from("access_logs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100);

      if (error) {
        throw error;
      }

      return NextResponse.json({ data });
    } else if (query === "by-page") {
      // ページ別アクセス数
      const { data, error } = await supabase
        .from("access_logs")
        .select("path", { count: "exact" })
        .order("created_at", { ascending: false })
        .limit(1000);

      if (error) {
        throw error;
      }

      const pageStats = data.reduce(
        (acc, row) => {
          const path = row.path || "/";
          acc[path] = (acc[path] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>
      );

      const pageRanking = Object.entries(pageStats)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 20)
        .map(([path, count]) => ({ path, count }));

      return NextResponse.json({ data: pageRanking });
    } else if (query === "by-country") {
      // 国別アクセス数
      const { data, error } = await supabase
        .from("access_logs")
        .select("country", { count: "exact" })
        .not("country", "is", null)
        .order("created_at", { ascending: false })
        .limit(1000);

      if (error) {
        throw error;
      }

      const countryStats = data.reduce(
        (acc, row) => {
          const country = row.country || "Unknown";
          acc[country] = (acc[country] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>
      );

      const countryRanking = Object.entries(countryStats)
        .sort(([, a], [, b]) => b - a)
        .map(([country, count]) => ({ country, count }));

      return NextResponse.json({ data: countryRanking });
    } else {
      // デフォルト：統計情報
      const { count: totalCount, error: countError } = await supabase
        .from("access_logs")
        .select("*", { count: "exact", head: true });

      if (countError) {
        throw countError;
      }

      return NextResponse.json({
        data: {
          totalAccess: totalCount || 0,
        },
      });
    }
  } catch (error) {
    console.error("Analytics API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
