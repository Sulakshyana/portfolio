import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE } from "@/lib/adminAuth";

export async function POST(request: NextRequest) {
  const { password } = await request.json() as { password: string };

  if (!password || !process.env.ADMIN_SECRET || password !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ success: false, error: "Invalid password" }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set(ADMIN_COOKIE.name, process.env.ADMIN_SECRET, ADMIN_COOKIE.options);
  return response;
}
