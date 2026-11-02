import { createHash } from "crypto";

// ── In-Memory Sliding Window Rate Limiter ────────────────────────────────────
// Map of key -> array of timestamps
const hitMap = new Map();

// Periodic cleanup every 5 minutes to prevent memory leak
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, timestamps] of hitMap.entries()) {
      const valid = timestamps.filter((t) => now - t < 15 * 60 * 1000);
      if (valid.length === 0) {
        hitMap.delete(key);
      } else {
        hitMap.set(key, valid);
      }
    }
  }, 5 * 60 * 1000);
}

/**
 * Mendapatkan alamat IP klien dari berbagai header proxy/reverse proxy.
 */
export function getClientIp(request) {
  const headers = request.headers;
  const cfIp = headers.get("cf-connecting-ip");
  if (cfIp) return cfIp.trim();

  const xForwardedFor = headers.get("x-forwarded-for");
  if (xForwardedFor) {
    const ips = xForwardedFor.split(",");
    return ips[0].trim();
  }

  const xRealIp = headers.get("x-real-ip");
  if (xRealIp) return xRealIp.trim();

  return "127.0.0.1";
}

/**
 * Menghasilkan hash IP satu arah untuk privasi sesuai UU PDP (PRD Bagian 11.3).
 * IP mentah TIDAK disimpan di database, melainkan hash berumur pendek.
 */
export function getAnonymizedIpHash(ip, salt = "cftind-privacy-salt-2026") {
  return createHash("sha256")
    .update(`${ip}-${salt}`)
    .digest("hex")
    .slice(0, 32);
}

/**
 * Memeriksa apakah request melebihi ambang batas rate limit.
 * @param {string} identifier - Kunci unik (mis. hash IP + endpoint)
 * @param {number} limit - Jumlah maksimal request dalam jendela waktu
 * @param {number} windowMs - Jendela waktu dalam milidetik
 * @returns {{ success: boolean, remaining: number, resetMs: number }}
 */
export function checkRateLimit(identifier, limit = 10, windowMs = 60 * 1000) {
  const now = Date.now();
  const timestamps = hitMap.get(identifier) || [];
  
  // Filter timestamp yang masih berada dalam jendela waktu
  const activeTimestamps = timestamps.filter((t) => now - t < windowMs);

  if (activeTimestamps.length >= limit) {
    const oldest = activeTimestamps[0];
    const resetMs = Math.max(0, windowMs - (now - oldest));
    return {
      success: false,
      remaining: 0,
      resetMs,
    };
  }

  activeTimestamps.push(now);
  hitMap.set(identifier, activeTimestamps);

  return {
    success: true,
    remaining: limit - activeTimestamps.length,
    resetMs: windowMs,
  };
}

// ── Shortcut Helper Functions ───────────────────────────────────────────────

/**
 * Rate limit untuk memulai sesi kuesioner (/api/isi/mulai)
 * Batas: Max 15 sesi per IP dalam 10 menit
 */
export function rateLimitMulai(request) {
  const ip = getClientIp(request);
  const ipHash = getAnonymizedIpHash(ip);
  const result = checkRateLimit(`mulai:${ipHash}`, 15, 10 * 60 * 1000);
  return { ...result, ipHash, ip };
}

/**
 * Rate limit untuk pengiriman final kuesioner (/api/isi/kirim)
 * Batas: Max 5 pengiriman per IP dalam 10 menit
 */
export function rateLimitKirim(request) {
  const ip = getClientIp(request);
  const ipHash = getAnonymizedIpHash(ip);
  const result = checkRateLimit(`kirim:${ipHash}`, 5, 10 * 60 * 1000);
  return { ...result, ipHash, ip };
}

/**
 * Rate limit login admin (/api/admin/login) untuk mencegah brute-force
 * Batas: Max 6 percobaan per IP dalam 15 menit
 */
export function rateLimitLogin(request) {
  const ip = getClientIp(request);
  const ipHash = getAnonymizedIpHash(ip);
  const result = checkRateLimit(`login:${ipHash}`, 6, 15 * 60 * 1000);
  return { ...result, ipHash, ip };
}
