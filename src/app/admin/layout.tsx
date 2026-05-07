import Link from "next/link";
import LogoutButton from "@/components/admin/LogoutButton";

export const metadata = { title: { template: "%s | Admin", default: "Admin" } };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="pt-16">
      {/* Admin top bar */}
      <div className="fixed top-16 left-0 right-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-2 flex items-center justify-between">
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link
            href="/admin"
            className="section-subtitle hover:text-primary transition-colors"
          >
            Dashboard
          </Link>
          <Link
            href="/admin/blogs/new"
            className="btn-primary text-sm px-4 py-1.5"
          >
            + New Post
          </Link>
        </nav>
        <LogoutButton />
      </div>

      {/* Page content offset for admin bar */}
      <div className="pt-12">{children}</div>
    </div>
  );
}
