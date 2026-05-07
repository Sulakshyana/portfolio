"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="text-sm px-4 py-1.5 rounded-lg border border-red-400 text-red-400 hover:bg-red-400 hover:text-white transition-colors"
    >
      Logout
    </button>
  );
}
