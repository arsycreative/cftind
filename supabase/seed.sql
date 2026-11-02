-- ==============================================================================
-- CFTInd — Supabase Seed Script
-- Jalankan di SQL Editor Supabase setelah membuat user admin di Supabase Auth
-- ==============================================================================

-- Panduan mendaftarkan admin:
-- 1. Buka Supabase Dashboard > Authentication > Users > Add User
-- 2. Masukkan email: admin@cftind.my.id dan kata sandi yang Anda tentukan
-- 3. Copy UID user dari tabel Auth, lalu jalankan query di bawah ini:

-- Ganti 'PASTE_USER_UUID_DISINI' dengan UUID dari Supabase Auth
/*
INSERT INTO public.admin_users (user_id, email, role, nama)
VALUES (
  'PASTE_USER_UUID_DISINI',
  'admin@cftind.my.id',
  'super_admin',
  'Admin Peneliti CFTInd'
) ON CONFLICT (email) DO NOTHING;
*/
