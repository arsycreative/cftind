/**
 * Skrip untuk membuat akun admin Supabase secara otomatis
 * Penggunaan:
 *   node scripts/create-admin.js <email> <password> [nama]
 * Contoh:
 *   node scripts/create-admin.js admin@cftind.my.id rahasia123 "Admin CFTInd"
 */

const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

// Muat .env.local
const envPath = path.join(__dirname, "..", ".env.local");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf8");
  envContent.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) return;
    const idx = trimmed.indexOf("=");
    if (idx !== -1) {
      const key = trimmed.slice(0, idx).trim();
      const val = trimmed.slice(idx + 1).trim().replace(/^['"]|['"]$/g, "");
      process.env[key] = val;
    }
  });
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error("❌ NEXT_PUBLIC_SUPABASE_URL atau SUPABASE_SERVICE_ROLE_KEY tidak ditemukan di .env.local");
  process.exit(1);
}

const email = process.argv[2] || "admin@cftind.my.id";
const password = process.argv[3] || "admin123";
const nama = process.argv[4] || "Admin Peneliti CFTInd";

async function main() {
  let ws;
  try {
    ws = require("ws");
  } catch {}

  const supabase = createClient(url, serviceKey, {
    auth: { persistSession: false },
    ...(ws ? { realtime: { transport: ws } } : {}),
  });

  console.log(`Membuat akun admin di Supabase: ${email}...`);

  // 1. Cek apakah user auth sudah ada
  const { data: userList, error: listError } = await supabase.auth.admin.listUsers();
  if (listError) {
    console.error("❌ Gagal membaca daftar user:", listError.message);
    process.exit(1);
  }

  let user = userList.users.find((u) => u.email.toLowerCase() === email.toLowerCase());

  if (!user) {
    // Buat user baru
    const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name: nama },
    });

    if (createError) {
      console.error("❌ Gagal membuat user di Supabase Auth:", createError.message);
      process.exit(1);
    }
    user = newUser.user;
    console.log(`✓ User auth berhasil dibuat (UID: ${user.id})`);
  } else {
    console.log(`ℹ User auth sudah ada (UID: ${user.id}). Memperbarui kata sandi...`);
    await supabase.auth.admin.updateUserById(user.id, { password });
  }

  // 2. Daftarkan / pastikan ada di tabel public.admin_users
  const { error: adminError } = await supabase.from("admin_users").upsert(
    {
      user_id: user.id,
      email: user.email,
      role: "super_admin",
      nama,
    },
    { onConflict: "email" }
  );

  if (adminError) {
    console.error("❌ Gagal mendaftarkan ke tabel public.admin_users:", adminError.message);
    process.exit(1);
  }

  console.log(`\n🎉 SUKSES! Akun admin berhasil disiapkan:`);
  console.log(`   Email    : ${email}`);
  console.log(`   Password : ${password}`);
  console.log(`   Role     : super_admin`);
  console.log(`\nSilakan login di http://localhost:3000/admin/login atau http://localhost:3001/admin/login`);
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
