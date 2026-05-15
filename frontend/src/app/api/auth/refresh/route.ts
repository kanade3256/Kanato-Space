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
 * POST /api/auth/refresh
 * refresh_token を使って新しい access_token を取得
 */
export async function POST(request: NextRequest) {
  console.log("[POST /api/auth/refresh] Called");

  try {
    const cookiesToSet: CookieToSet[] = [];
    const supabase = createSupabaseClient(request, cookiesToSet);
    
    // refresh_token は Cookie に保存されている
    const {
      data: { session },
      error,
    } = await supabase.auth.refreshSession();

    if (error || !session) {
      console.log("[POST /api/auth/refresh] Refresh failed:", error?.message);
      return NextResponse.json(
        { error: "Refresh failed" },
        { status: 401 }
      );
    }

    console.log(`[POST /api/auth/refresh] Session refreshed for user: ${session.user.email}`);
    const response = NextResponse.json({
      ok: true,
      access_token: session.access_token,
    });
    applyCookies(response, cookiesToSet);
    return response;
  } catch (error) {
    console.error("[POST /api/auth/refresh] Error:", error);
    return NextResponse.json(
      { error: "Refresh failed" },
      { status: 500 }
    );
  }
}
