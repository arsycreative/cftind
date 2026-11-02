# CFTInd — Menumbuhkan Kreativitas Bersama Guru

Platform daring asesmen dan riset perilaku guru dalam menumbuhkan kreativitas peserta didik (CFTIndex — *Creativity Fostering Teacher Behaviour Index*), dilengkapi sistem pengisian bertahap mobile-first dan panel rekap data ekspor Excel (.xlsx).

---

## 🚀 Fitur Utama

### 1. Sisi Responden Guru (`/isi`)
- **Tahap 1: Pengantar Riset** — Penjelasan tujuan penelitian, estimasi durasi (±10 menit), sifat sukarela, dan jaminan anonimitas.
- **Tahap 2: Informed Consent Berversi (v1.0)** — Responden wajib memberikan persetujuan eksplisit sebelum melanjutkan; tersedia tombol "Tidak Bersedia" yang membawa ke halaman penolakan ramah tanpa menyimpan data.
- **Tahap 3: Profil Singkat** — Pengumpulan demografi minimalis (Jenjang, Lama Mengajar, Status Sekolah, Provinsi, dll.) tanpa data identitas sensitif (tanpa nama, NIK, atau telepon).
- **Tahap 4: Petunjuk Pengisian & Skala** — Skala Likert 1–5 dengan contoh interaktif dan penegasan "tidak ada jawaban benar/salah".
- **Tahap 5: Kuesioner 45 Butir (9 Bagian × 5 Butir)**:
  - Progress bar dinamis "Bagian n dari 9" & jumlah terjawab.
  - Autosave per bagian dan sinkronisasi berkala.
  - Validasi butir kosong otomatis scroll ke butir yang belum terisi.
  - Penanganan jaringan putus dengan pesan ramah tanpa menghapus pilihan di layar.
- **Tahap 6: Tinjau & Kirim** — Ringkasan jumlah terjawab sebelum pengiriman final, proteksi submit ganda.
- **Tahap 7: Selesai** — Ucapan terima kasih dan informasi tindak lanjut (tanpa interpretasi psikometrik individual sebelum instrumen tervalidasi).

### 2. Sisi Admin Peneliti (`/admin`)
- **Autentikasi Aman (`/admin/login`)**:
  - Mendukung Supabase Auth & role guard `admin_users`.
  - Dilengkapi mode pengembangan lokal untuk kemudahan demonstrasi (`admin@cftind.my.id`).
- **Dashboard Ringkasan (`/admin/dashboard`)**:
  - Kartu statistik: Total Respons, Selesai (Completed), Sedang Berjalan (In Progress), Masuk Hari Ini.
  - Visual grafik batang tren 14 hari terakhir.
  - Indikator status koneksi database (Live Supabase / Local Store).
- **Tabel Data Respons (`/admin/respons`)**:
  - Pencarian ID respon secara instan.
  - Filter status dan filter jenjang pendidikan.
  - Paginasi data (25 entri per halaman).
  - **Modal Rincian Respons**: Menampilkan demografi lengkap dan seluruh 45 butir jawaban beserta skor pilihan.
  - **Soft Delete**: Menghapus data atas permintaan responden dengan pencatatan audit.
- **Ekspor Excel Multi-Sheet (`/admin/ekspor`)**:
  - Menggunakan pustaka `ExcelJS` menghasilkan file `.xlsx` berformat rapi.
  - **Sheet 1 (`Data_Lebar`)**: 1 baris per responden, kolom `B01`–`B45` berisi angka mentah, durasi pengerjaan, penanda kualitas (`flag_cepat` < 3 menit, `flag_seragam`).
  - **Sheet 2 (`Kamus_Variabel`)**: 45 butir instrumen, 9 dimensi, kode kolom, dan skala nilai.
  - **Sheet 3 (`Info_Ekspor`)**: Metadata ekspor, waktu unduh, filter yang digunakan.
  - Perlindungan *Formula Injection* otomatis pada nilai teks bebas.

---

## 🛠️ Arsitektur & Teknologi

- **Framework**: [Next.js](https://nextjs.org) (App Router, Turbopack)
- **Styling**: Vanilla CSS & Tailwind CSS tokens
- **Spreadsheet Engine**: [ExcelJS](https://github.com/exceljs/exceljs)
- **Database & Auth**: [Supabase](https://supabase.com) (PostgreSQL, Row Level Security)
- **Penyimpanan Fallback**: Dual-layer architecture (`src/lib/db.js`) yang otomatis berjalan dalam mode local development jika kredensial Supabase belum diisi.

---

## 💻 Menjalankan di Komputer Lokal

1. **Install dependensi**:
   ```bash
   npm install
   ```

2. **Jalankan dev server**:
   ```bash
   npm run dev
   ```

3. **Buka di peramban**:
   - Beranda: [http://localhost:3000](http://localhost:3000)
   - Kuesioner Guru: [http://localhost:3000/isi](http://localhost:3000/isi)
   - Panel Admin: [http://localhost:3000/admin](http://localhost:3000/admin) (Gunakan tombol kredensial demo `admin@cftind.my.id` / `admin123`)

---

## 🗄️ Menghubungkan ke Supabase (Produksi)

1. Buat project baru di [Supabase Dashboard](https://supabase.com).
2. Salin isi berkas [`supabase/schema.sql`](supabase/schema.sql) dan jalankan di menu **SQL Editor** pada project Supabase Anda.
3. Buat user admin di menu **Authentication > Users** (mis. `admin@cftind.my.id`).
4. Daftarkan UID admin tersebut ke tabel `admin_users` mengikuti petunjuk di [`supabase/seed.sql`](supabase/seed.sql).
5. Buat berkas `.env.local` di root folder proyek:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJh...
   SUPABASE_SERVICE_ROLE_KEY=eyJh...
   ```
6. Sistem akan otomatis mendeteksi konfigurasi tersebut dan beralih ke database Supabase secara real-time.

---

## 📄 Hak Cipta & Lisensi

CFTInd adalah platform riset dan asesmen untuk guru di Indonesia. Penggunaan instrumen CFTIndex (*Creativity Fostering Teacher Behaviour Index*) memerlukan atribusi akademik dan perizinan sesuai ketentuan ilmiah.
