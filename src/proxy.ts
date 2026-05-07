import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Already on login page — redirect authenticated users to dashboard
  if (pathname === "/admin/login") {
    const token = request.cookies.get("admin_token")?.value;
    if (token && token === process.env.ADMIN_SECRET) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  // Guard all other /admin/* routes
  const token = request.cookies.get("admin_token")?.value;
  if (!token || token !== process.env.ADMIN_SECRET) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
