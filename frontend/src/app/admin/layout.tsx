"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabase";

const adminNavItems = [
  { label: "Analytics", href: "/admin/analytics" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const supabaseClient = getSupabaseBrowserClient();

  const handleLogout = async () => {
    await supabaseClient.auth.signOut();
    window.location.href = "/";
  };

  const isNavItemActive = (href: string) => {
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/" className="text-lg font-bold text-slate-900">
                Admin Panel
              </Link>
              <div className="flex gap-6">
                {adminNavItems.map((item) => {
                  const isActive = isNavItemActive(item.href);
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={`text-sm font-medium ${
                        isActive
                          ? "border-b-2 border-blue-600 text-blue-600"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100"
            >
              <LogOut size={16} />
              ログアウト
            </button>
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
}
