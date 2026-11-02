/**
 * Standalone Supabase Keep-Alive Script
 *
 * Menghubungi Supabase secara langsung atau via endpoint /api/health
 * untuk mencatatkan aktivitas database dan mencegah free-tier Supabase dijeda (paused).
 *
 * Penggunaan:
 *   node scripts/keepalive.js
 */

const https = require("https");
const http = require("http");
const fs = require("fs");
const path = require("path");

// Load .env.local if running locally
try {
  const envPath = path.join(__dirname, "..", ".env.local");
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, "utf8");
    envContent.split("\n").forEach((line) => {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        const key = match[1];
        let val = match[2] || "";
        val = val.trim().replace(/^["']|["']$/g, "");
        if (!process.env[key]) process.env[key] = val;
      }
    });
  }
} catch (e) {
  // Ignore
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_ANON_KEY;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "https://cftind.my.id";

function makeRequest(url, headers = {}) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const client = parsed.protocol === "https:" ? https : http;

    const req = client.request(
      url,
      {
        method: "GET",
        headers: {
          "User-Agent": "CFTInd-KeepAlive/1.0",
          ...headers,
        },
        timeout: 10000,
      },
      (res) => {
        let body = "";
        res.on("data", (chunk) => (body += chunk));
        res.on("end", () => {
          resolve({ statusCode: res.statusCode, body });
        });
      }
    );

    req.on("error", reject);
    req.on("timeout", () => {
      req.destroy();
      reject(new Error("Request timed out after 10s"));
    });

    req.end();
  });
}

async function run() {
  console.log(`[${new Date().toISOString()}] Memulai Supabase Keep-Alive Ping...`);
  let successCount = 0;

  // 1. Direct Ping ke Supabase REST API (jika kredensial tersedia)
  if (supabaseUrl && supabaseKey) {
    const cleanUrl = supabaseUrl.replace(/\/$/, "");
    const restEndpoint = `${cleanUrl}/rest/v1/instruments?select=id&limit=1`;

    try {
      console.log(`[1/2] Mengirim direct ping ke Supabase REST API: ${cleanUrl}...`);
      const res = await makeRequest(restEndpoint, {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
      });

      if (res.statusCode >= 200 && res.statusCode < 300) {
        console.log(`  ✓ Supabase REST API merespons: HTTP ${res.statusCode}`);
        successCount++;
      } else {
        console.warn(`  ⚠ Supabase REST API HTTP ${res.statusCode}: ${res.body}`);
      }
    } catch (err) {
      console.error(`  ✗ Gagal direct ping ke Supabase: ${err.message}`);
    }
  } else {
    console.log(`[1/2] Kredensial Supabase URL / Key tidak terdeteksi di env, lewati direct ping.`);
  }

  // 2. Ping ke App Health Endpoint
  const healthEndpoint = `${siteUrl.replace(/\/$/, "")}/api/health`;
  try {
    console.log(`[2/2] Mengirim ping ke App Health Endpoint: ${healthEndpoint}...`);
    const res = await makeRequest(healthEndpoint);

    if (res.statusCode >= 200 && res.statusCode < 300) {
      console.log(`  ✓ App Health Endpoint merespons: HTTP ${res.statusCode}`);
      console.log(`  Payload: ${res.body}`);
      successCount++;
    } else {
      console.warn(`  ⚠ App Health Endpoint HTTP ${res.statusCode}: ${res.body}`);
    }
  } catch (err) {
    console.error(`  ✗ Gagal ping ke App Health: ${err.message}`);
  }

  if (successCount > 0) {
    console.log(`[${new Date().toISOString()}] Sukses! Aktivitas database tercatat, Supabase tetap aktif.`);
    process.exit(0);
  } else {
    console.error(`[${new Date().toISOString()}] Seluruh ping gagal. Periksa koneksi atau URL target.`);
    process.exit(1);
  }
}

run();
