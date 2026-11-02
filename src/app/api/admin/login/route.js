import { NextResponse } from "next/server";
import { isSupabaseConfigured, getSupabase } from "@/lib/db";
import { rateLimitLogin } from "@/lib/ratelimit";

export async function POST(request) {
  try {
    // Brute-force protection
    const rl = rateLimitLogin(request);
    if (!rl.success) {
      return NextResponse.json(
        { error: "Terlalu banyak percobaan masuk yang gagal. Demi keamanan, silakan coba lagi setelah 15 menit." },
        { status: 429, headers: { "Retry-After": String(Math.ceil(rl.resetMs / 1000)) } }
      );
    }

    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email dan kata sandi wajib diisi." },
        { status: 400 }
      );
    }

    if (isSupabaseConfigured()) {
      const supabase = await getSupabase();
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error || !data.session) {
        return NextResponse.json(
          { error: "Email atau kata sandi tidak valid." },
          { status: 401 }
        );
      }

      // Check if user is in admin_users table
      const { data: adminUser } = await supabase
        .from("admin_users")
        .select("id, role, nama")
        .eq("user_id", data.user.id)
        .single();

      if (!adminUser) {
        await supabase.auth.signOut();
        return NextResponse.json(
          { error: "Akses ditolak. Akun Anda bukan admin." },
          { status: 403 }
        );
      }

      const response = NextResponse.json({ ok: true, role: adminUser.role, nama: adminUser.nama });
      response.cookies.set("sb-session", data.session.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 8, // 8 hours
      });
      return response;
    }

    // ── Dev / Demo Mode ────────────────────────────────────────────────────────
    // If Supabase is not configured yet, allow demo admin login
    if (email.toLowerCase().includes("admin") || email.toLowerCase().includes("cftind")) {
      const response = NextResponse.json({
        ok: true,
        dev_mode: true,
        message: "Login berhasil (Mode Pengembangan/Demo)",
      });
      response.cookies.set("sb-session", "cftind-dev-admin-token", {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 8,
      });
      return response;
    }

    // If password provided for demo
    if (password === "admin123" || password.length >= 6) {
      const response = NextResponse.json({ ok: true, dev_mode: true });
      response.cookies.set("sb-session", "cftind-dev-admin-token", {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 8,
      });
      return response;
    }

    return NextResponse.json(
      { error: "Email atau kata sandi tidak valid. (Gunakan admin@cftind.my.id / admin123 untuk dev mode)" },
      { status: 401 }
    );
  } catch (err) {
    console.error("[api/admin/login]", err);
    return NextResponse.json({ error: "Kesalahan server saat login." }, { status: 500 });
  }
}
