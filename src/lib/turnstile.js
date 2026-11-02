/**
 * Verifikasi token Cloudflare Turnstile di sisi server
 * Dokumentasi: https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
 */

export async function verifyTurnstileToken(token, remoteIp = null) {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  // Jika kunci rahasia belum dikonfigurasi di environment, bypass verifikasi
  // sehingga pengembangan lokal dan pengujian tidak terblokir.
  if (!secretKey) {
    return { success: true, bypassed: true };
  }

  // Jika token kosong padahal secretKey aktif
  if (!token) {
    return {
      success: false,
      error: "Token verifikasi keamanan (CAPTCHA) tidak ditemukan.",
    };
  }

  try {
    const formData = new URLSearchParams();
    formData.append("secret", secretKey);
    formData.append("response", token);
    if (remoteIp) {
      formData.append("remoteip", remoteIp);
    }

    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    const data = await res.json();

    if (!data.success) {
      console.warn("[Turnstile] Verifikasi gagal:", data["error-codes"]);
      return {
        success: false,
        error: "Verifikasi keamanan tidak berhasil. Silakan muat ulang halaman dan coba lagi.",
        errorCodes: data["error-codes"],
      };
    }

    return { success: true, hostname: data.hostname, challengeTs: data.challenge_ts };
  } catch (err) {
    console.error("[Turnstile] Kesalahan jaringan saat verifikasi:", err);
    // Jika Cloudflare mengalami downtime sesaat, jangan tolak pengisian guru yang berharga
    return { success: true, fallback: true };
  }
}
