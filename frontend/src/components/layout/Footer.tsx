import Link from "next/link";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

import { Container } from "@/components/ui/Container";
import { isAdminEmail } from "@/lib/auth-utils";

const footerLinks = [
  { label: "Contact", href: "/contact" },
  { label: "Blog", href: "/blog" },
  { label: "Lab", href: "/lab" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export async function Footer() {
  // サーバーサイドで Supabase セッションを確認
  const reqCookies = await cookies();
  const cookieList = reqCookies.getAll();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
    {
      cookies: {
        getAll() {
          return cookieList;
        },
        setAll() {
          // no-op for server-rendered footer (we only need to read session)
        },
      } as any,
    }
  );
  const { data } = await supabase.auth.getUser();
  const user = data?.user ?? null;

  const showAdminButton = isAdminEmail(user?.email ?? null);

  return (
    <footer className="border-t border-border bg-white">
      <Container className="py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-lg font-semibold text-primary">Kanato Space</p>
            <p className="mt-2 text-sm leading-7 text-secondary">技術の実験場・ポートフォリオ・成長ログ</p>
            <p className="mt-6 text-sm text-secondary">© 2026 Kanato Space</p>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-sm text-secondary">
            <a href="#" target="_blank" rel="noreferrer" className="hover:text-primary hover:underline">
              GitHub
            </a>
            {footerLinks.map((item) => (
              <Link key={item.label} href={item.href} className="hover:text-primary hover:underline">
                {item.label}
              </Link>
            ))}

            {showAdminButton && (
              <Link
                href="/admin"
                className="ml-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-2 text-sm font-medium text-violet-700 hover:bg-violet-100"
              >
                管理へ
              </Link>
            )}
          </div>
        </div>
      </Container>
    </footer>
  );
}
