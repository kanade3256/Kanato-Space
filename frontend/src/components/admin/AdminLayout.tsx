import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

type AdminLayoutProps = {
  children: React.ReactNode;
};

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#faf7ff_0%,#ffffff_26%,#ffffff_100%)] text-slate-900">
      <AdminHeader />
      <div className="mx-auto flex w-full max-w-[1600px] gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <div className="hidden xl:block xl:w-80 xl:shrink-0">
          <AdminSidebar />
        </div>
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}