import { NextRequest, NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * POST /api/auth/refresh
 * refresh_token を使って新しい access_token を取得
 */
export async function POST(request: NextRequest) {
  console.log("[POST /api/auth/refresh] Called");

  try {
    const supabase = createRouteHandlerClient({ cookies });
    
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
    return NextResponse.json({
      ok: true,
      access_token: session.access_token,
    });
  } catch (error) {
    console.error("[POST /api/auth/refresh] Error:", error);
    return NextResponse.json(
      { error: "Refresh failed" },
      { status: 500 }
    );
  }
}
