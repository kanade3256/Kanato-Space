import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase";
import {
  getClientIP,
  hashIP,
  isPrivateIP,
  isBotUserAgent,
  getIPInfo,
  transformToAccessLog,
} from "@/lib/ipinfo";

export async function POST(request: NextRequest) {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json({ ok: true });
    }

    const body = await request.json();
    const { path, referrer } = body;

    // 必須フィールドの確認
    if (!path) {
      return NextResponse.json({ error: "path is required" }, { status: 400 });
    }

    // クライアントIPを取得
    const ip = getClientIP(request);
    if (!ip) {
      // IPが取得できない場合はスキップ
      return NextResponse.json({ ok: true });
    }

    // User-Agentを取得
    const userAgent = request.headers.get("user-agent") || "";

    // ボットの場合はスキップ
    if (isBotUserAgent(userAgent)) {
      return NextResponse.json({ ok: true });
    }

    // プライベートIPの場合はIPinfo APIに問い合わせない
    let ipinfo = null;
    if (!isPrivateIP(ip)) {
      ipinfo = await getIPInfo(ip);
    }

    // IPをハッシュ化
    const ipHash = hashIP(ip);

    // Supabaseに保存するデータを生成
    const accessLogData = transformToAccessLog(ipinfo, path, referrer || null, userAgent, ipHash);

    // Supabaseに保存
    const supabase = getSupabaseAdminClient();
    const { error } = await supabase.from("access_logs").insert([accessLogData]);

    if (error) {
      console.error("Supabase insert error:", error);
      // エラーが発生しても 200 を返す（クライアント側に影響しないように）
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Track API error:", error);
    // エラーが発生しても 200 を返す
    return NextResponse.json({ ok: true });
  }
}
