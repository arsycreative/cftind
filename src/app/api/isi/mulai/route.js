import { NextResponse } from "next/server";
import { createSubmission } from "@/lib/db";
import { rateLimitMulai } from "@/lib/ratelimit";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(request) {
  try {
    // 1. Rate Limiting Check
    const rl = rateLimitMulai(request);
    if (!rl.success) {
      return NextResponse.json(
        { error: "Terlalu banyak permintaan sesi dari perangkat Anda. Silakan coba beberapa menit lagi." },
        { status: 429, headers: { "Retry-After": String(Math.ceil(rl.resetMs / 1000)) } }
      );
    }

    const { profil, session_id, turnstile_token } = await request.json();

    // 2. Cloudflare Turnstile CAPTCHA Verification
    const turnstileResult = await verifyTurnstileToken(turnstile_token, rl.ip);
    if (!turnstileResult.success) {
      return NextResponse.json(
        { error: turnstileResult.error || "Verifikasi keamanan (CAPTCHA) gagal. Silakan coba lagi." },
        { status: 403 }
      );
    }

    // 3. Validation
    if (!profil || !profil.jenjang || !profil.lama || !profil.status || !profil.provinsi) {
      return NextResponse.json(
        { error: "Profil tidak lengkap. Jenjang, lama mengajar, status sekolah, dan provinsi wajib diisi." },
        { status: 400 }
      );
    }

    const sanitizedProfil = {
      jenjang: String(profil.jenjang).slice(0, 100),
      lama: String(profil.lama).slice(0, 100),
      jenis_kelamin: profil.jenis_kelamin ? String(profil.jenis_kelamin).slice(0, 50) : "",
      usia: profil.usia ? String(profil.usia).slice(0, 50) : "",
      pendidikan: profil.pendidikan ? String(profil.pendidikan).slice(0, 50) : "",
      status: String(profil.status).slice(0, 50),
      provinsi: String(profil.provinsi).slice(0, 100),
      mapel: profil.mapel ? String(profil.mapel).slice(0, 200) : "",
      email: profil.email ? String(profil.email).slice(0, 254) : "",
    };

    const userAgent = request.headers.get("user-agent")?.slice(0, 255) || null;

    const res = await createSubmission({
      id: session_id,
      profil: sanitizedProfil,
      consent_version: "1.0",
      ip_hash: rl.ipHash,
      user_agent: userAgent,
    });

    return NextResponse.json({ ok: true, session_id: res.session_id });
  } catch (err) {
    console.error("[api/isi/mulai]", err);
    return NextResponse.json({ error: "Kesalahan server saat memulai sesi." }, { status: 500 });
  }
}
