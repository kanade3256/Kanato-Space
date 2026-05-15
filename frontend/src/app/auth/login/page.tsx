"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { getSupabaseBrowserClient } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const supabaseEnvReady = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
  const supabase = supabaseEnvReady ? getSupabaseBrowserClient() : null;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const onSignIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!supabase) {
      setMessage("Supabase の環境変数が未設定です。NEXT_PUBLIC_SUPABASE_URL と NEXT_PUBLIC_SUPABASE_ANON_KEY を確認してください。");
      return;
    }

    setLoading(true);
    setMessage(null);

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (error) {
      setMessage("ログインに失敗しました。メールアドレスとパスワードを確認してください。");
      return;
    }

    // サーバー側セッション設定エンドポイント呼び出し
    try {
      // localStorage から access_token を取得
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      if (supabaseUrl) {
        const projectId = new URL(supabaseUrl).hostname.split(".")[0];
        const authTokenKey = `sb-${projectId}-auth-token`;
        const authToken = localStorage.getItem(authTokenKey);
        
        if (authToken) {
          const parsed = JSON.parse(authToken);
          const token = parsed?.access_token;
          
          if (token) {
            console.log("[LoginPage] Sending Bearer token to /api/auth/callback");
            const response = await fetch("/api/auth/callback", {
              method: "POST",
              headers: {
                "Authorization": `Bearer ${token}`,
              },
            });
            if (!response.ok) {
              console.error("[LoginPage] Failed to establish server session:", response.status);
            } else {
              console.log("[LoginPage] Server session established");
            }
          }
        }
      }
    } catch (err) {
      console.error("[LoginPage] Session callback error:", err);
    }

    router.replace("/admin/analytics");
  };

  const onMagicLink = async () => {
    if (!supabase) {
      setMessage("Supabase の環境変数が未設定です。NEXT_PUBLIC_SUPABASE_URL と NEXT_PUBLIC_SUPABASE_ANON_KEY を確認してください。");
      return;
    }

    setLoading(true);
    setMessage(null);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/api/auth/callback?next=/admin/analytics`,
      },
    });

    setLoading(false);
    if (error) {
      setMessage("マジックリンク送信に失敗しました。メールアドレスを確認してください。");
      return;
    }

    setMessage("マジックリンクを送信しました。メールを確認してください。");
  };

  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-md items-center px-6 py-12">
      <div className="w-full rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="mb-2 text-2xl font-bold text-slate-900">管理者ログイン</h1>
        <p className="mb-6 text-sm text-slate-600">/admin 配下へアクセスするにはログインが必要です。</p>

        {!supabaseEnvReady && (
          <div className="mb-4 rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
            Supabase の環境変数が未設定です。<br />
            .env.local に NEXT_PUBLIC_SUPABASE_URL と NEXT_PUBLIC_SUPABASE_ANON_KEY を入れて、再起動してください。
          </div>
        )}

        <form onSubmit={onSignIn} className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">
              メールアドレス
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-blue-500 focus:ring"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium text-slate-700">
              パスワード
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-blue-500 focus:ring"
              required
            />
          </div>

          {message && <p className="text-sm text-slate-700">{message}</p>}

          <button
            type="submit"
            disabled={loading || !supabaseEnvReady}
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? "処理中..." : "ログイン"}
          </button>
        </form>

        <button
          type="button"
          onClick={onMagicLink}
          disabled={loading || !email || !supabaseEnvReady}
          className="mt-3 w-full rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
        >
          マジックリンクを送信
        </button>
      </div>
    </div>
  );
}