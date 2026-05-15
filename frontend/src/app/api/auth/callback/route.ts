import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

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

function createSupabaseClient(request: NextRequest, cookiesToSet: CookieToSet[]) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY");
  }

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(nextCookiesToSet: CookieToSet[]) {
        nextCookiesToSet.forEach((cookie) => {
          cookiesToSet.push(cookie);
        });
      },
    },
  });
}

function applyCookies(response: NextResponse, cookiesToSet: CookieToSet[]) {
  cookiesToSet.forEach(({ name, value, options }) => {
    response.cookies.set(name, value, options);
  });
}

/**
 * POST /api/auth/callback
 * ログイン後、ブラウザ側のセッションをサーバー側 Cookie に同期
 */
export async function POST(request: NextRequest) {
  console.log("[POST /api/auth/callback] Called - syncing session to server cookies");

  try {
    const cookiesToSet: CookieToSet[] = [];
    const supabase = createSupabaseClient(request, cookiesToSet);
    
    // Authorization ヘッダーから Bearer token を取得（ブラウザ側の新しいセッション用）
    const authHeader = request.headers.get("Authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.substring(7);
      console.log("[POST /api/auth/callback] Bearer token found in Authorization header");
      
      // Bearer token からユーザー情報を取得
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser(token);
      
      if (error || !user) {
        console.log("[POST /api/auth/callback] Bearer token validation failed:", error?.message);
      } else {
        console.log(`[POST /api/auth/callback] Bearer token validated for user: ${user.email}`);
        return NextResponse.json({ ok: true, user: user.email });
      }
    }

    // Bearer token がない場合は、サーバー Cookie からセッションを試す
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      console.log("[POST /api/auth/callback] No session found in Cookie or Bearer token");
      return NextResponse.json({ error: "No session" }, { status: 401 });
    }

    console.log(`[POST /api/auth/callback] Session synced for user: ${session.user.email}`);
    const response = NextResponse.json({ ok: true, user: session.user.email });
    applyCookies(response, cookiesToSet);
    return response;
  } catch (error) {
    console.error("[POST /api/auth/callback] Error:", error);
    return NextResponse.json({ error: "Callback failed" }, { status: 500 });
  }
}

/**
 * GET /api/auth/callback
 * マジックリンク確認後のリダイレクト先（exchange code for session）
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") || "/admin/analytics";

  if (!code) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  try {
    const cookiesToSet: CookieToSet[] = [];
    const supabase = createSupabaseClient(request, cookiesToSet);
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("[GET /api/auth/callback] Exchange failed:", error);
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    console.log("[GET /api/auth/callback] Code exchanged, redirecting to:", next);
    const response = NextResponse.redirect(new URL(next, request.url));
    applyCookies(response, cookiesToSet);
    return response;
  } catch (error) {
    console.error("[GET /api/auth/callback] Error:", error);
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}
