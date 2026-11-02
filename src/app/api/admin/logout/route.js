/**
 * POST /api/admin/logout
 * Clears the session cookie.
 */
import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.delete("sb-session");
  return response;
}
