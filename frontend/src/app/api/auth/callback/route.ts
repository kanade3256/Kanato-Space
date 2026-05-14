import { NextRequest, NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * POST /api/auth/callback
 * ログイン後、ブラウザ側のセッションをサーバー側 Cookie に同期
 */
export async function POST(request: NextRequest) {
  console.log("[POST /api/auth/callback] Called - syncing session to server cookies");

  try {
    const supabase = createRouteHandlerClient({ cookies });
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      console.log("[POST /api/auth/callback] No session found");
      return NextResponse.json({ error: "No session" }, { status: 401 });
    }

    console.log(`[POST /api/auth/callback] Session synced for user: ${session.user.email}`);
    return NextResponse.json({ ok: true, user: session.user.email });
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
    const supabase = createRouteHandlerClient({ cookies });
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("[GET /api/auth/callback] Exchange failed:", error);
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    console.log("[GET /api/auth/callback] Code exchanged, redirecting to:", next);
    return NextResponse.redirect(new URL(next, request.url));
  } catch (error) {
    console.error("[GET /api/auth/callback] Error:", error);
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}
