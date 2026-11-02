import { NextResponse } from "next/server";
import { submitAnswers } from "@/lib/db";
import { rateLimitKirim } from "@/lib/ratelimit";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(request) {
  try {
    // 1. Rate Limiting Check
    const rl = rateLimitKirim(request);
    if (!rl.success) {
      return NextResponse.json(
        { error: "Terlalu banyak permintaan pengiriman. Silakan tunggu beberapa menit." },
        { status: 429, headers: { "Retry-After": String(Math.ceil(rl.resetMs / 1000)) } }
      );
    }

    const { session_id, turnstile_token } = await request.json();

    if (!session_id) {
      return NextResponse.json({ error: "session_id diperlukan." }, { status: 400 });
    }

    // 2. Cloudflare Turnstile CAPTCHA Verification
    const turnstileResult = await verifyTurnstileToken(turnstile_token, rl.ip);
    if (!turnstileResult.success) {
      return NextResponse.json(
        { error: turnstileResult.error || "Verifikasi keamanan (CAPTCHA) gagal. Silakan coba lagi." },
        { status: 403 }
      );
    }

    // 3. Submit Answers
    const result = await submitAnswers({ session_id });

    if (!result.ok) {
      return NextResponse.json(
        { error: result.error || "Gagal mengirimkan jawaban." },
        { status: 422 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/isi/kirim]", err);
    return NextResponse.json({ error: "Gagal mengirim. Silakan coba lagi." }, { status: 500 });
  }
}
