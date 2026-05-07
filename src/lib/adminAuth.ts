import { type NextRequest } from "next/server";

export function isAdminRequest(request: NextRequest): boolean {
  const token = request.cookies.get("admin_token")?.value;
  return Boolean(token && process.env.ADMIN_SECRET && token === process.env.ADMIN_SECRET);
}

export const ADMIN_COOKIE = {
  name: "admin_token",
  options: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours
  },
};
