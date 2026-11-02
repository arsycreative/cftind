# PRD & System Design — CFTInd.my.id

Platform pengisian instrumen CFTIndex untuk responden guru, dengan rekap data yang dapat diunduh dalam format Excel.

Versi 0.1 (Draft) · 2 November 2026 · Stack: Next.js · Supabase · Netlify

## 1. Ringkasan Eksekutif

CFTInd adalah platform asesmen dan riset yang berfokus pada perilaku guru dalam menumbuhkan kreativitas peserta didik. Pada tahap awal (MVP), platform ini hanya melakukan dua hal:

1. **Responden mengisi instrumen** secara daring (45 butir, 9 dimensi) melalui tautan.
2. **Admin merekap dan mengunduh data** hasil pengisian dalam format Excel (.xlsx).

Analisis, skor, dan dashboard visual sengaja ditunda ke fase berikutnya. Karena itu fondasi yang paling penting di MVP adalah **kualitas dan keamanan data mentah**: struktur database yang rapi, persetujuan responden (informed consent) yang tercatat, dan ekspor yang bersih sehingga bisa langsung diolah di SPSS, R, JASP, atau Excel.

## 2. Latar Belakang dan Tujuan

Bahan yang sudah tersedia:

- **Instrumen**: file Excel "Instrumen CFTIndex Bahasa Indonesia" berisi 45 butir pernyataan dalam 9 dimensi (Independence, Integration, Motivation, Judgement, Flexibility, Evaluation, Question, Opportunities, Frustration), masing-masing 5 butir.
- **Identitas brand**: logo, palet warna, dan tagline "Menumbuhkan Kreativitas Bersama Guru".
- **Prototipe website**: halaman konseptual dengan dua jalur, yaitu *Ruang Penelitian* dan *Refleksi & Asesmen Guru*, serta FAQ yang menegaskan bahwa instrumen belum tervalidasi dan memerlukan izin penggunaan.

### Tujuan MVP

| # | Tujuan | Indikator keberhasilan |
| --- | --- | --- |
| 1 | Responden dapat mengisi instrumen dengan mudah dari ponsel | Tingkat penyelesaian ≥ 80% dari yang memulai |
| 2 | Data tersimpan utuh dan aman | 0 kehilangan data; semua pengisian punya catatan persetujuan |
| 3 | Peneliti dapat mengunduh rekap kapan saja | Ekspor Excel selesai < 30 detik untuk ≤ 5.000 responden |
| 4 | Arsitektur siap berkembang ke analisis | Penambahan dashboard tidak membutuhkan perubahan skema data |

### Di Luar Cakupan MVP (Non-Goals)

- Skor dimensi/total yang ditampilkan ke responden, interpretasi, atau norma.
- Analisis statistik (reliabilitas, faktor, dsb.) dan grafik di dashboard.
- Akun responden (login), riwayat hasil pribadi, dan sertifikat.
- Pembuat instrumen (form builder) dan multi-bahasa.
- Integrasi pembayaran dan notifikasi email massal.

## 3. Pengguna dan Peran

| Peran | Deskripsi | Akses |
| --- | --- | --- |
| **Responden** | Guru (PAUD sampai SMA/SMK/pendidikan khusus) yang diundang mengisi instrumen | Tanpa login; mengisi lewat tautan publik. Dapat melanjutkan pengisian di perangkat yang sama |
| **Admin / Peneliti** | Tim CFTInd yang mengelola dan merekap data | Login; melihat daftar respons, mengunduh Excel |
| **Super Admin** | Pemilik platform | Semua akses admin, plus mengelola akun admin lain |

## 4. Persona dan User Journey

**Bu Sari, guru SD, 38 tahun.** Menerima tautan CFTInd.my.id lewat grup WhatsApp, membukanya di ponsel dengan koneksi tidak stabil. Ia ingin tahu apa tujuan studi ini, memastikan datanya aman, lalu mengisi instrumen dalam waktu singkat tanpa harus membuat akun.

**Pak Dimas, peneliti.** Ingin membuka dashboard di akhir pekan, melihat berapa responden yang sudah masuk, lalu mengunduh Excel untuk diolah di SPSS.

### Alur responden

1. Membuka halaman instrumen, membaca penjelasan studi.
2. Membaca dan menyetujui informed consent (centang eksplisit).
3. Mengisi profil singkat.
4. Mengisi 45 butir, dibagi 9 halaman × 5 butir, dengan progress bar dan penyimpanan otomatis.
5. Meninjau jawaban yang belum terisi, lalu mengirim.
6. Melihat halaman terima kasih (tanpa skor di MVP).

### Alur admin

1. Login → melihat ringkasan (jumlah masuk, selesai, belum selesai).
2. Membuka daftar respons, memfilter berdasarkan tanggal/status/jenjang.
3. Klik **Unduh Excel** → file .xlsx berisi data mentah, kamus variabel, dan info ekspor.

## 5. Kebutuhan Fungsional

Prioritas: **P0** = wajib MVP, **P1** = sebaiknya ada di MVP jika waktu cukup, **P2** = fase berikutnya.

### 5.1 Sisi Responden

| ID | Kebutuhan | Prioritas |
| --- | --- | --- |
| R-01 | Halaman pengantar instrumen: tujuan studi, estimasi durasi (±10 menit), kontak peneliti | P0 |
| R-02 | Informed consent berversi; responden wajib mencentang persetujuan sebelum lanjut. Versi teks dan waktu persetujuan dicatat | P0 |
| R-03 | Formulir profil singkat (lihat 5.3) | P0 |
| R-04 | Pengisian 45 butir dengan skala jawaban; 5 butir per halaman; progress bar | P0 |
| R-05 | Penyimpanan otomatis tiap halaman; responden dapat melanjutkan di perangkat yang sama (cookie sesi) | P0 |
| R-06 | Validasi: semua butir wajib dijawab sebelum kirim; butir kosong ditandai | P0 |
| R-07 | Halaman terima kasih; pengiriman tidak dapat diulang untuk sesi yang sama | P0 |
| R-08 | Tampilan mobile-first, ringan, dan dapat diakses (kontras, ukuran sentuh ≥ 44px, dukung keyboard) | P0 |
| R-09 | Perlindungan spam: CAPTCHA tanpa gangguan (mis. Cloudflare Turnstile) dan rate limit | P1 |
| R-10 | Halaman kebijakan privasi dan kontak | P0 |
| R-11 | Dua jalur (Ruang Penelitian dan Refleksi Guru) dengan teks persetujuan berbeda | P2 (lihat Pertanyaan Terbuka) |

### 5.2 Sisi Admin

| ID | Kebutuhan | Prioritas |
| --- | --- | --- |
| A-01 | Login admin (Supabase Auth), hanya akun yang terdaftar sebagai admin | P0 |
| A-02 | Ringkasan: total respons, selesai, sedang berjalan, respons per hari | P0 |
| A-03 | Tabel respons dengan pencarian, filter (status, tanggal, jenjang), dan paginasi | P0 |
| A-04 | Detail satu respons (profil + 45 jawaban) | P1 |
| A-05 | **Unduh Excel** sesuai filter aktif (lihat 5.4) | P0 |
| A-06 | Log ekspor (siapa, kapan, filter apa, berapa baris) | P1 |
| A-07 | Buka/tutup pengumpulan data (toggle status instrumen) | P1 |
| A-08 | Hapus respons atas permintaan responden (soft delete + audit) | P1 |
| A-09 | Kelola akun admin | P2 |
| A-10 | Dashboard analitik dan skor dimensi | P2 |

### 5.3 Profil Responden (Usulan)

Prinsip: **kumpulkan seminimal mungkin**. Tidak ada nama, NIK, atau nomor telepon di MVP.

| Field | Tipe | Wajib |
| --- | --- | --- |
| Jenjang mengajar | pilihan: PAUD, SD, SMP, SMA, SMK, Pendidikan Khusus, Lainnya | Ya |
| Lama mengajar | pilihan rentang (<5, 5–10, 11–20, >20 tahun) | Ya |
| Jenis kelamin | pilihan (termasuk "memilih tidak menjawab") | Opsional |
| Rentang usia | pilihan rentang | Opsional |
| Pendidikan terakhir | pilihan | Opsional |
| Status sekolah | Negeri / Swasta | Ya |
| Provinsi | pilihan 38 provinsi | Ya |
| Mata pelajaran / guru kelas | teks singkat atau pilihan | Opsional |
| Email (untuk kabar hasil studi) | teks, disimpan terpisah | Opsional |

Daftar field ini sebaiknya disimpan sebagai konfigurasi (JSON), sehingga mudah diubah tanpa migrasi besar.

### 5.4 Spesifikasi Ekspor Excel

File `.xlsx` dengan sheet berikut:

| Sheet | Isi |
| --- | --- |
| **Data\_Lebar** | 1 baris = 1 responden. Kolom: `submission_id` (kode anonim), `status`, `mulai`, `selesai`, `durasi_menit`, kolom profil, lalu `B01` … `B45` berisi angka jawaban. Format siap impor ke SPSS/R/JASP |
| **Kamus\_Variabel** | Nomor butir, kode kolom, dimensi, teks butir, skala dan label jawaban, penanda butir *reverse-scored* (jika ada) |
| **Info\_Ekspor** | Nama instrumen & versi, versi teks persetujuan, filter yang dipakai, jumlah baris, waktu ekspor, nama pengunduh |
| **Skor\_Dimensi** (opsional, P1) | Jumlah/rerata mentah per dimensi, diberi catatan "skor mentah, bukan hasil terinterpretasi" |

Aturan ekspor:

- Default hanya data **berstatus selesai**; admin dapat memilih menyertakan yang belum selesai.
- Kolom jawaban berupa **angka** (bukan teks) agar langsung bisa dianalisis.
- Nilai teks bebas disanitasi dari karakter pembuka rumus (`=`, `+`, `-`, `@`) untuk mencegah *formula injection*.
- Email (jika ada) tidak disertakan di Data\_Lebar secara default; hanya melalui opsi ekspor khusus.

## 6. Kebutuhan Non-Fungsional

| Aspek | Target |
| --- | --- |
| Performa | Halaman instrumen memuat < 3 detik di jaringan 4G; tiap simpan otomatis < 1 detik |
| Skalabilitas | Hingga ±10.000 responden dan beberapa ratus pengisian bersamaan tanpa perubahan arsitektur |
| Ketersediaan | Mengikuti SLA Netlify dan Supabase; cadangan data harian (lihat Risiko) |
| Keamanan | HTTPS, RLS aktif di semua tabel, service-role key hanya di server, rate limit, audit ekspor |
| Privasi | Sesuai prinsip UU Pelindungan Data Pribadi (UU 27/2022): tujuan jelas, persetujuan eksplisit, minimisasi data, hak hapus |
| Aksesibilitas | WCAG 2.1 AA sebagai acuan |
| Bahasa | Bahasa Indonesia penuh (antarmuka dan pesan galat) |
| Observabilitas | Log galat (mis. Sentry) dan log audit admin |

## 7. Ketentuan Etika dan Legal

Hal berikut **bukan masalah teknis, tetapi menentukan boleh-tidaknya data dikumpulkan**:

1. **Izin penggunaan instrumen.** Website prototipe sudah menyatakan bahwa CFTIndex dikembangkan oleh peneliti aslinya dan bahwa adaptasi serta digitalisasinya memerlukan izin dan atribusi. Pastikan izin tertulis dan teks atribusi tersedia sebelum peluncuran.
2. **Persetujuan etik** (ethical clearance) bila data dipakai untuk riset/publikasi, sesuai ketentuan institusi.
3. **Status validitas.** Selama bukti validitas dan reliabilitas adaptasi belum ada, platform tidak boleh menampilkan skor atau interpretasi individual ke responden. MVP sudah sejalan dengan hal ini.
4. **Informed consent** berversi, tersimpan bersama setiap respons.
5. **Retensi dan penghapusan data**: tetapkan masa simpan dan prosedur hapus atas permintaan.

## 8. Desain UX dan Brand

- **Warna**: Navy `#153A5B` (utama), Hijau (aksen pertumbuhan), Kuning `#F4C542` (ide baru), Peach `#F8D6B3` (ramah). Latar krem lembut sesuai prototipe.
- **Tipografi**: Poppins pada panduan brand, sedangkan prototipe website memakai Plus Jakarta Sans / DM Sans. Perlu diputuskan satu keluarga font (lihat Pertanyaan Terbuka).
- **Logo**: gunakan versi full color di header, versi monokrom/negatif untuk latar gelap. Simpan sebagai SVG.
- **Tampilan kuesioner**: satu kartu per butir, tombol skala besar yang nyaman di sentuhan, 5 butir per layar, progress "Bagian 3 dari 9". Nama dimensi tidak ditampilkan ke responden, untuk menghindari bias jawaban.
- **Penanganan butir**: urutan butir mengikuti file instrumen (dimensi berselang-seling), dengan opsi pengacakan urutan butir per responden sebagai fitur lanjutan.

## 9. User Story dan Kriteria Penerimaan

Setiap kebutuhan P0 diuji terhadap kriteria berikut sebelum dianggap selesai.

### 9.1 Responden

| ID | User story | Kriteria penerimaan |
| --- | --- | --- |
| US-R1 | Sebagai guru, saya ingin tahu tujuan studi sebelum mengisi, agar saya yakin untuk ikut | Halaman pengantar memuat tujuan, penyelenggara, estimasi durasi, kontak, dan tautan kebijakan privasi; tombol "Lanjut" aktif tanpa harus menggulir jauh di ponsel |
| US-R2 | Sebagai guru, saya ingin memberi atau menolak persetujuan dengan jelas | Tombol lanjut nonaktif sampai kotak persetujuan dicentang; tersedia tombol "Saya tidak bersedia" yang membawa ke halaman terima kasih tanpa menyimpan data apa pun; versi teks persetujuan tercatat |
| US-R3 | Sebagai guru, saya ingin mengisi profil singkat tanpa menyebut identitas | Field wajib divalidasi; tidak ada kolom nama/NIK/telepon; pesan galat berbahasa Indonesia dan menunjuk field yang salah |
| US-R4 | Sebagai guru, saya ingin mengisi 45 butir dengan nyaman dari ponsel | 5 butir per layar; pilihan skala dapat disentuh (≥ 44px); progress "Bagian n dari 9"; tidak ada geser horizontal pada lebar layar 360px |
| US-R5 | Sebagai guru, saya ingin jawaban saya tidak hilang jika koneksi putus | Jawaban tiap bagian tersimpan saat menekan "Lanjut"; menutup lalu membuka ulang tautan di perangkat yang sama membawa ke bagian terakhir; gagal simpan menampilkan pesan dan tombol "Coba lagi" tanpa menghapus pilihan di layar |
| US-R5b | Sebagai guru, saya ingin bisa kembali ke bagian sebelumnya | Tombol "Kembali" menampilkan jawaban yang sudah dipilih dan dapat diubah sebelum pengiriman akhir |
| US-R6 | Sebagai guru, saya ingin diberi tahu bila ada butir terlewat | Pada tombol "Kirim", butir kosong ditandai dan layar melompat ke butir kosong pertama; kirim ditolak sampai 45 butir terisi |
| US-R7 | Sebagai guru, saya ingin tahu pengisian saya sudah masuk | Halaman terima kasih tampil setelah kirim berhasil; membuka ulang tautan sesi yang sudah selesai tidak membuka kuesioner lagi |

### 9.2 Admin

| ID | User story | Kriteria penerimaan |
| --- | --- | --- |
| US-A1 | Sebagai admin, saya ingin login dengan aman | Hanya akun yang terdaftar sebagai admin yang dapat membuka `/admin`; akun non-admin yang berhasil login tetap ditolak; sesi berakhir setelah logout |
| US-A2 | Sebagai admin, saya ingin melihat jumlah responden sekilas | Ringkasan menampilkan total, selesai, belum selesai, dan jumlah per hari 14 hari terakhir; angka cocok dengan hasil query langsung |
| US-A3 | Sebagai admin, saya ingin mencari dan memfilter respons | Filter status, rentang tanggal, jenjang, dan provinsi dapat dikombinasikan; paginasi 25/50/100 baris |
| US-A4 | Sebagai admin, saya ingin mengunduh Excel sesuai filter | File dapat dibuka di Excel dan LibreOffice tanpa peringatan galat; jumlah baris sama dengan jumlah pada tabel; ke-45 kolom jawaban berisi angka |
| US-A5 | Sebagai admin, saya ingin menutup pengumpulan data | Setelah status instrumen "closed", responden baru melihat pesan "pengisian telah ditutup"; sesi yang sedang berjalan diberi tenggang yang ditetapkan admin |
| US-A6 | Sebagai admin, saya ingin menghapus respons atas permintaan responden | Penghapusan bersifat soft delete, tercatat siapa dan kapan, dan data tidak lagi muncul di ekspor |

## 10. Spesifikasi Layar dan Konten

Bagian ini menjadi acuan desain dan penulisan teks antarmuka. Teks final disepakati bersama peneliti.

| # | Layar | Elemen utama | Perilaku dan catatan |
| --- | --- | --- | --- |
| 1 | **Landing** `/` | Hero "Menumbuhkan Kreativitas Bersama Guru", ringkasan platform, tombol "Mulai Berpartisipasi", FAQ, footer berisi atribusi instrumen | Diadaptasi dari prototipe; tautan "Simulasi" dan data demo dihapus; tombol hanya aktif bila instrumen berstatus open |
| 2 | **Pengantar** | Judul studi, penyelenggara dan institusi, tujuan, siapa yang boleh ikut, estimasi durasi (±10 menit), hak responden, kontak peneliti | Satu halaman ringkas; teks panjang dilipat dalam "Baca selengkapnya" |
| 3 | **Persetujuan** | Naskah informed consent berversi, kotak centang "Saya telah membaca dan bersedia berpartisipasi", tombol Lanjut dan "Tidak bersedia" | Waktu dan versi persetujuan dicatat di server, bukan dari klien |
| 4 | **Profil** | Field pada 5.3, penjelasan singkat mengapa data ditanyakan | Tombol Lanjut membuat sesi di server; sesi tidak dibuat sebelum profil valid |
| 5 | **Petunjuk pengisian** | Contoh satu butir, penjelasan skala 1–5 (atau sesuai instrumen), pesan "tidak ada jawaban benar atau salah" | Ditampilkan sekali sebelum bagian 1 |
| 6 | **Kuesioner** (9 bagian) | Progress bar, 5 kartu butir, pilihan skala, tombol Kembali/Lanjut | Nama dimensi tidak ditampilkan; lompat ke butir kosong saat validasi gagal; fokus keyboard berpindah ke butir pertama tiap bagian |
| 7 | **Tinjau dan kirim** | Ringkasan jumlah butir terjawab, tombol Kirim | Hanya muncul setelah bagian 9; tombol nonaktif saat mengirim agar tidak terkirim dua kali |
| 8 | **Terima kasih** | Ucapan terima kasih, kontak peneliti, tautan privasi | Tidak ada skor atau interpretasi |
| 9 | **Instrumen ditutup / tidak ditemukan** | Pesan ramah dan kontak | Untuk status closed/draft atau kode salah |
| 10 | **Admin: login** | Email, kata sandi (atau tautan ajaib), tautan lupa kata sandi | Pesan galat umum, tidak membedakan "email tidak ada" dan "kata sandi salah" |
| 11 | **Admin: ringkasan** | Kartu angka, grafik harian sederhana, tombol "Unduh Excel" | Grafik harian P1 |
| 12 | **Admin: tabel respons** | Filter, tabel, paginasi, tombol unduh | Kolom: kode, status, tanggal mulai/selesai, jenjang, provinsi, durasi |
| 13 | **Admin: ekspor** | Pilihan filter ekspor, opsi "sertakan belum selesai", riwayat unduhan | Menampilkan siapa dan kapan mengunduh |

### 10.1 Pesan sistem (contoh)

| Situasi | Teks |
| --- | --- |
| Butir belum dijawab | "Mohon pilih satu jawaban untuk butir ini." |
| Gagal menyimpan | "Jawaban belum tersimpan karena koneksi bermasalah. Pilihan Anda masih ada di layar. Silakan coba lagi." |
| Sesi tidak ditemukan | "Kami tidak menemukan pengisian Anda di perangkat ini. Anda dapat memulai kembali." |
| Instrumen ditutup | "Terima kasih atas minat Anda. Pengisian instrumen ini sudah ditutup." |
| Sudah pernah mengirim | "Pengisian Anda sudah kami terima. Terima kasih." |

## 11. Kualitas Data dan Kebijakan Data

### 11.1 Definisi Status

| Status | Definisi |
| --- | --- |
| `in_progress` | Persetujuan dan profil tersimpan; 45 butir belum lengkap atau belum dikirim |
| `completed` | Seluruh 45 butir terjawab dan tombol Kirim berhasil |
| Ditinggalkan (turunan) | `in_progress` tanpa aktivitas > 7 hari; tetap tersimpan, dikecualikan dari ekspor default |
| Dihapus | `deleted_at` terisi; tidak muncul di ekspor atau tabel |

### 11.2 Penanda Kualitas di Ekspor

Platform **tidak membuang** data secara otomatis. Penanda hanya membantu peneliti memutuskan sendiri saat membersihkan data.

| Penanda | Aturan | Kegunaan |
| --- | --- | --- |
| `durasi_menit` | Selisih mulai pengisian butir pertama sampai kirim | Mendeteksi pengisian terlalu cepat |
| `flag_cepat` | Durasi < 3 menit untuk 45 butir | Dugaan asal jawab atau bot |
| `flag_seragam` | Semua jawaban bernilai sama (*straight-lining*) | Dugaan asal jawab |
| `jumlah_sesi_perangkat` | Banyak sesi dari hash IP/perangkat yang sama dalam 24 jam | Dugaan pengisian ganda |

Ambang dapat diubah peneliti; nilai awal di atas adalah usulan.

### 11.3 Kebijakan Privasi dan Retensi

| Hal | Kebijakan usulan |
| --- | --- |
| Data yang dikumpulkan | Profil demografis tanpa identitas langsung, jawaban 45 butir, waktu pengisian; email hanya bila dengan sengaja diisi responden |
| IP dan perangkat | Tidak disimpan mentah; hanya hash berumur pendek untuk rate limit dan deteksi ganda |
| Tujuan penggunaan | Hanya untuk penelitian yang disebut dalam naskah persetujuan |
| Siapa yang dapat mengakses | Admin terdaftar; tiap ekspor dicatat |
| Retensi | Ditetapkan peneliti dan institusi (mis. selama studi + 5 tahun); setelah itu dihapus atau dianonimkan penuh |
| Hak responden | Dapat meminta penghapusan lewat kontak peneliti; permintaan diproses ≤ 14 hari kerja (usulan) |
| Kebocoran data | Prosedur pemberitahuan ke responden dan pihak berwenang disiapkan sebelum peluncuran |
| Penyimpanan | Server Singapura; informasikan lokasi penyimpanan di naskah persetujuan |

Naskah akhir sebaiknya ditinjau oleh pihak etik institusi dan, bila perlu, penasihat hukum.

## 12. Metrik dan Pelacakan

| Metrik | Cara menghitung | Target awal |
| --- | --- | --- |
| Tingkat mulai | Sesi dibuat / kunjungan halaman pengantar | Dipantau |
| Tingkat persetujuan | Persetujuan / pengunjung halaman persetujuan | Dipantau |
| Tingkat penyelesaian | `completed` / semua sesi | ≥ 80% |
| Titik gugur | Distribusi sesi `in_progress` menurut bagian terakhir | Dipantau; bagian dengan gugur > 10% dikaji |
| Median durasi | Median durasi sesi `completed` | ≤ 12 menit |
| Galat simpan | Jumlah gagal simpan / total simpan | < 1% |
| Keberhasilan ekspor | Ekspor sukses / percobaan | 100% untuk ≤ 5.000 baris |

Analitik penggunaan cukup memakai pengukur ringan tanpa cookie pelacak pihak ketiga (mis. Plausible atau Umami) agar sejalan dengan prinsip privasi. Metrik penyelesaian dan titik gugur dapat dihitung langsung dari database.

## 13. Pemangku Kepentingan dan Dependensi

| Pihak | Peran | Dibutuhkan untuk |
| --- | --- | --- |
| Peneliti utama / pemilik produk | Keputusan skala, profil, teks persetujuan, ambang kualitas data | Tahap 0 |
| Pengembang instrumen asli | Izin penggunaan dan atribusi | Sebelum peluncuran |
| Komite etik institusi | Persetujuan etik | Sebelum pengumpulan data |
| Pengembang / developer | Implementasi dan operasi | Seluruh tahap |
| Desainer (bila ada) | Penerapan brand dan UI | Tahap 1–2 |
| Guru pilot (10–20 orang) | Uji keterpakaian | Tahap 4 |

## 14. Rencana Rilis

Rincian teknis tiap tahap ada di dokumen **System Design**.

| Tahap | Cakupan | Keluaran | Estimasi |
| --- | --- | --- | --- |
| 0. Persiapan | Izin instrumen, naskah persetujuan, keputusan skala/profil/ambang, aset brand SVG | Dokumen keputusan + naskah final | 1–2 minggu, paralel |
| 1. Fondasi | Repo, database + RLS + seed, deploy Netlify + domain, tema brand | Situs kosong dapat diakses di domain | 1 minggu |
| 2. Alur responden | Pengantar, persetujuan, profil, kuesioner, simpan otomatis, kirim | Responden dapat mengisi sampai selesai | 1,5–2 minggu |
| 3. Admin dan ekspor | Login, ringkasan, tabel respons, unduh Excel | Admin dapat mengunduh data | 1–1,5 minggu |
| 4. Pengamanan dan uji | Turnstile, rate limit, uji ponsel nyata, uji beban, pilot 10–20 guru | Laporan uji dan perbaikan | 1 minggu |
| 5. Peluncuran | Buka pengumpulan data, pantau 2 minggu pertama | Pengumpulan data berjalan | — |

Estimasi kasar untuk satu developer: 5–7 minggu termasuk pilot. Tahap 0 dapat berjalan paralel dengan Tahap 1–2, tetapi **Tahap 5 tidak boleh dimulai** sebelum izin instrumen dan persetujuan etik selesai.

### 14.1 Kriteria Siap Rilis (Definition of Done)

- [ ] Seluruh kebutuhan P0 lolos kriteria penerimaan pada bagian 9.
- [ ] Izin penggunaan instrumen dan persetujuan etik tersedia (tertulis).
- [ ] Naskah persetujuan dan kebijakan privasi final tampil di situs.
- [ ] Uji pada minimal 3 ponsel nyata (Android lama, Android baru, iPhone) dan 2 peramban.
- [ ] Pilot 10–20 guru selesai dan temuan utama diperbaiki.
- [ ] Ekspor Excel diverifikasi: jumlah baris, urutan kolom, dan nilai cocok dengan database untuk sampel 20 responden.
- [ ] Cadangan database aktif dan pemulihan pernah diuji.
- [ ] Akun admin memakai autentikasi dua faktor.

## 15. Peta Jalan Setelah MVP

| Fase | Fitur | Prasyarat |
| --- | --- | --- |
| 1.1 | Ekspor asinkron untuk data besar, grafik harian di ringkasan, detail respons, log ekspor | MVP berjalan stabil |
| 2.0 | Dashboard analitik: sebaran jawaban, rerata per dimensi, filter demografi | Ada cukup data; keputusan cara penyajian |
| 2.1 | Analisis psikometrik: reliabilitas (Cronbach's α / McDonald's ω), korelasi butir-total, CFA (layanan R/Python terpisah) | Ukuran sampel memadai; tim analis |
| 3.0 | Hasil personal untuk guru (jalur Refleksi & Asesmen) | Bukti validitas dan dasar interpretasi tersedia |
| 3.x | Multi-instrumen, multi-gelombang (pre-post), kode undangan per sekolah, pengacakan urutan butir, versi bahasa Inggris | Kebutuhan riset berikutnya |

## 16. Risiko dan Mitigasi

| Risiko | Dampak | Peluang | Mitigasi |
| --- | --- | --- | --- |
| Izin penggunaan instrumen belum ada | Tidak boleh dipublikasikan | Sedang | Selesaikan di Tahap 0; tampilkan atribusi di footer dan halaman pengantar |
| Persetujuan etik terlambat | Peluncuran mundur | Sedang | Ajukan sejak Tahap 0; siapkan naskah lebih dulu |
| Pengisian ganda atau bot | Data kotor | Sedang | Turnstile, rate limit, penanda `flag_cepat` dan `flag_seragam` di ekspor |
| Koneksi guru tidak stabil | Responden berhenti di tengah | Tinggi | Simpan per bagian, halaman ringan, dapat dilanjutkan |
| Kebocoran data profil | Pelanggaran privasi | Rendah | Minimisasi data, RLS, kunci layanan hanya di server, MFA admin |
| Skala atau skoring salah dikonfigurasi | Data tidak sesuai analisis | Rendah | Skala dikonfirmasi pada Tahap 0 dan disimpan di data instrumen; diverifikasi di UAT |
| Tier gratis layanan database dijeda atau tanpa cadangan memadai | Data atau akses terganggu | Sedang | Gunakan paket berbayar untuk produksi; ekspor Excel berkala sebagai salinan tambahan |
| Hasil dipakai menilai individu guru | Dampak etis pada responden | Rendah | Tidak ada skor individual di MVP; pernyataan penggunaan di naskah persetujuan |
| Satu orang developer = titik kegagalan | Pemeliharaan terhenti | Sedang | Dokumentasi, infrastruktur sebagai kode, akses cadangan pemilik produk |

## 17. Pertanyaan Terbuka

Keputusan berikut dibutuhkan sebelum pengembangan; pemilik yang disarankan di kolom kedua.

| # | Pertanyaan | Pemilik | Asumsi PRD bila belum dijawab |
| --- | --- | --- | --- |
| 1 | **Skala jawaban.** File instrumen hanya berisi butir, tanpa skala dan label | Peneliti | Likert 5 poin: 1 Sangat tidak setuju … 5 Sangat setuju |
| 2 | **Butir berskor terbalik.** Butir 22, 30, 39 bernada negasi namun searah dengan dimensinya | Peneliti | Tidak ada butir terbalik |
| 3 | **Satu jalur atau dua.** Prototipe punya Ruang Penelitian dan Refleksi & Asesmen Guru | Pemilik produk | MVP hanya Ruang Penelitian |
| 4 | **Anonim atau teridentifikasi.** Perlu email atau kode undangan? | Peneliti + etik | Anonim; email opsional dan terpisah |
| 5 | **Skor di ekspor.** Perlu sheet Skor\_Dimensi sejak awal? | Peneliti | Hanya data mentah; skor mentah sebagai P1 |
| 6 | **Brand.** Hijau `#2E8B57` (panduan) vs `#278C57` (prototipe); font Poppins vs Plus Jakarta Sans | Pemilik produk | Warna panduan brand; Poppins |
| 7 | **Siapa admin** dan berapa orang | Pemilik produk | 1–3 admin |
| 8 | **Batas pengisian.** Boleh lebih dari sekali per orang/perangkat? | Peneliti | Satu sesi per perangkat; tidak ada penolakan keras |
| 9 | **Ambang kualitas data** (3 menit, seragam) | Peneliti | Nilai usulan pada 11.2 |
| 10 | **Masa retensi data** dan lokasi penyimpanan yang dapat diterima institusi | Etik + hukum | Studi + 5 tahun; server Singapura |
| 11 | **Sasaran responden:** jumlah dan cara distribusi tautan (WhatsApp, sekolah, dinas) | Peneliti | Hingga 10.000 responden |

## Lampiran A. Dimensi Instrumen

Pola berulang: butir ke-n termasuk dimensi ke-((n−1) mod 9)+1; tiap dimensi punya 5 butir.

| # | Dimensi | Butir |
| --- | --- | --- |
| 1 | Independence | 1, 10, 19, 28, 37 |
| 2 | Integration | 2, 11, 20, 29, 38 |
| 3 | Motivation | 3, 12, 21, 30, 39 |
| 4 | Judgement | 4, 13, 22, 31, 40 |
| 5 | Flexibility | 5, 14, 23, 32, 41 |
| 6 | Evaluation | 6, 15, 24, 33, 42 |
| 7 | Question | 7, 16, 25, 34, 43 |
| 8 | Opportunities | 8, 17, 26, 35, 44 |
| 9 | Frustration | 9, 18, 27, 36, 45 |

## Lampiran B. Daftar Butir Instrumen

Salinan dari file *Instrumen CFTIndex Bahasa Indonesia*; menjadi sumber data seed. Kode kolom ekspor = `B01` … `B45`.

| No | Kode | Dimensi | Butir |
| --- | --- | --- | --- |
| 1 | B01 | Independence | Saya mendorong murid untuk menunjukkan kepada saya apa yang telah mereka pelajari secara mandiri. |
| 2 | B02 | Integration | Di kelas saya, murid memiliki kesempatan untuk berbagi ide dan pandangan. |
| 3 | B03 | Motivation | Di kelas saya, saya menekankan pentingnya menguasai pengetahuan dan keterampilan dasar dengan baik. |
| 4 | B04 | Judgement | Ketika murid memiliki ide, saya mengajak mereka mengeksplorasi ide tersebut lebih lanjut sebelum saya memberikan penilaian. |
| 5 | B05 | Flexibility | Di kelas saya, saya menggali lebih jauh ide-ide murid untuk mendorong mereka berpikir. |
| 6 | B06 | Evaluation | Saya mengharapkan murid memeriksa sendiri hasil kegiatan mereka daripada menunggu saya mengoreksinya. |
| 7 | B07 | Question | Saya menindaklanjuti usulan murid agar mereka mengetahui bahwa saya menanggapi usulan mereka dengan sungguh-sungguh. |
| 8 | B08 | Opportunities | Saya mendorong murid mencoba menerapkan apa yang telah mereka pelajari dari saya dalam berbagai situasi. |
| 9 | B09 | Frustration | Murid yang merasa frustrasi dapat datang kepada saya untuk memperoleh dukungan emosional. |
| 10 | B10 | Independence | Saya mengajarkan hal-hal dasar kepada murid, kemudian memberi mereka keleluasaan untuk mencari tahu lebih lanjut secara mandiri. |
| 11 | B11 | Integration | Murid di kelas saya secara rutin mendapat kesempatan untuk melakukan kegiatan kelompok. |
| 12 | B12 | Motivation | Saya menekankan pentingnya menguasai pengetahuan dan keterampilan pokok. |
| 13 | B13 | Judgement | Ketika murid mengusulkan sesuatu, saya mengajukan pertanyaan lanjutan agar mereka berpikir lebih jauh. |
| 14 | B14 | Flexibility | Saya mendorong murid mengajukan pertanyaan secara bebas, meskipun pertanyaan itu tampak tidak berkaitan dengan topik yang dibahas. |
| 15 | B15 | Evaluation | Saya memberi kesempatan kepada murid untuk menceritakan kepada teman-teman sekelas hal yang sudah dapat mereka lakukan dan hal yang masih sulit bagi mereka. |
| 16 | B16 | Question | Ketika murid saya memiliki pertanyaan, saya mendengarkan mereka dengan saksama. |
| 17 | B17 | Opportunities | Saya mengapresiasi murid ketika mereka menggunakan apa yang telah dipelajari untuk kegunaan yang berbeda. |
| 18 | B18 | Frustration | Saya membantu murid menghadapi kegagalan agar mereka kembali percaya diri. |
| 19 | B19 | Independence | Saya memberikan pertanyaan kepada murid saya agar mereka mencari jawabannya sendiri. |
| 20 | B20 | Integration | Saya mendorong murid untuk berkontribusi dalam kegiatan pembelajaran melalui ide dan usulan mereka. |
| 21 | B21 | Motivation | Murid saya tahu bahwa saya mengharapkan mereka menguasai pengetahuan dan keterampilan dasar dengan baik. |
| 22 | B22 | Judgement | Saya tidak langsung menyampaikan pendapat tentang ide murid, baik ketika saya setuju maupun tidak setuju. |
| 23 | B23 | Flexibility | Saya mendorong murid memikirkan berbagai kemungkinan, meskipun sebagian ide mungkin tidak berhasil. |
| 24 | B24 | Evaluation | Murid saya tahu bahwa saya mengharapkan mereka memeriksa pekerjaan mereka sendiri sebelum saya memeriksanya. |
| 25 | B25 | Question | Murid saya tahu bahwa saya tidak mengabaikan usulan mereka begitu saja. |
| 26 | B26 | Opportunities | Saya mendorong murid menggunakan apa yang telah mereka pelajari di kelas untuk mencoba berbagai kegiatan. |
| 27 | B27 | Frustration | Saya membantu murid mengambil pelajaran dari pengalaman gagal. |
| 28 | B28 | Independence | Saya mengajarkan hal-hal dasar kepada murid, kemudian memberi ruang bagi mereka untuk belajar secara mandiri. |
| 29 | B29 | Integration | Saya mendorong murid untuk mengajukan pertanyaan dan usulan selama kegiatan belajar. |
| 30 | B30 | Motivation | Di kelas saya, beralih dengan cepat dari satu topik ke topik berikutnya bukanlah prioritas utama saya. |
| 31 | B31 | Judgement | Saya baru memberikan tanggapan terhadap ide murid setelah ide tersebut dieksplorasi lebih mendalam. |
| 32 | B32 | Flexibility | Saya ingin murid meluangkan waktu untuk memikirkan berbagai cara yang berbeda. |
| 33 | B33 | Evaluation | Di kelas saya, murid memiliki kesempatan untuk menilai sendiri apakah yang mereka lakukan sudah tepat atau belum. |
| 34 | B34 | Question | Saya tetap mendengarkan usulan murid, meskipun usulan tersebut sulit diterapkan atau tampak tidak bermanfaat. |
| 35 | B35 | Opportunities | Saya tidak keberatan jika murid mencoba ide mereka sendiri dan melakukan sesuatu dengan cara yang berbeda dari contoh yang saya tunjukkan. |
| 36 | B36 | Frustration | Saya mendorong murid yang merasa frustrasi untuk memandang hal itu sebagai bagian dari proses belajar. |
| 37 | B37 | Independence | Saya memberikan pertanyaan terbuka kepada murid saya agar mereka menemukan jawabannya sendiri. |
| 38 | B38 | Integration | Saya mengharapkan murid di kelas saya bekerja sama dalam kegiatan kelompok. |
| 39 | B39 | Motivation | Bagi saya, menuntaskan seluruh materi pembelajaran tidak lebih penting daripada memastikan murid mempelajari hal-hal dasar dengan baik. |
| 40 | B40 | Judgement | Saya mendorong murid mencoba cara yang berbeda, meskipun hal itu membutuhkan waktu lebih lama. |
| 41 | B41 | Flexibility | Saya mengizinkan murid mencoba cara yang berbeda dari arahan yang diberikan kepada mereka. |
| 42 | B42 | Evaluation | Saya mengizinkan murid saling menunjukkan hasil karya mereka sebelum menyerahkannya kepada saya. |
| 43 | B43 | Question | Saya mendengarkan dengan sabar ketika murid mengajukan pertanyaan yang mungkin terdengar aneh. |
| 44 | B44 | Opportunities | Saya memperbolehkan murid mengeksplorasi hal-hal lebih jauh daripada yang saya ajarkan dalam kegiatan pembelajaran. |
| 45 | B45 | Frustration | Saya mendorong murid yang mengalami kegagalan untuk mencari solusi lain yang mungkin dapat dilakukan. |

## Lampiran C. Glosarium

| Istilah | Arti |
| --- | --- |
| CFTInd | Nama platform; singkatan Creativity-Fostering Teachers, Indonesia |
| CFTIndex | Creativity Fostering Teacher Behaviour Index, instrumen yang dikembangkan peneliti aslinya |
| Informed consent | Persetujuan sadar responden setelah memahami tujuan, risiko, dan hak |
| Likert | Skala tingkat persetujuan terhadap pernyataan |
| Reverse-scored | Butir yang skornya dibalik sebelum dijumlahkan |
| Straight-lining | Memilih jawaban yang sama untuk semua butir |
| MVP | Versi awal dengan fitur minimum yang sudah bernilai |
| RLS | Row Level Security, pembatasan akses baris di database |
