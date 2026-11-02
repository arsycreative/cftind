import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Kebijakan Privasi — CFTInd",
  description: "Kebijakan privasi dan perlindungan data responden platform CFTInd.",
};

export default function KebijakanPrivasiPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-[800px] mx-auto px-7 py-16">
          <h1 className="font-[family-name:var(--font-plus-jakarta)] font-extrabold text-4xl text-navy mb-2">
            Kebijakan Privasi
          </h1>
          <p className="text-muted text-sm mb-8">Berlaku sejak November 2026</p>

          <div className="prose prose-slate max-w-none">
            {[
              {
                title: "1. Data yang Kami Kumpulkan",
                content: `Kami mengumpulkan data berikut:
• Profil demografis: jenjang mengajar, lama mengajar, jenis kelamin (opsional), rentang usia (opsional), pendidikan terakhir (opsional), status sekolah, dan provinsi.
• Jawaban atas 45 pernyataan instrumen dalam bentuk angka (1–5).
• Waktu pengisian.
• Email (hanya jika dengan sengaja diisi oleh responden, bersifat opsional).

Kami TIDAK mengumpulkan nama lengkap, NIK, nomor telepon, atau informasi yang dapat mengidentifikasi Anda secara langsung.`,
              },
              {
                title: "2. Tujuan Penggunaan",
                content: `Data yang dikumpulkan digunakan semata-mata untuk keperluan penelitian ilmiah tentang perilaku guru dalam menumbuhkan kreativitas peserta didik, sesuai yang disebutkan dalam naskah informed consent.`,
              },
              {
                title: "3. Penyimpanan dan Keamanan",
                content: `Data disimpan di server Singapura dengan enkripsi dan kontrol akses yang ketat. Hanya admin penelitian yang terdaftar yang dapat mengakses data. Setiap ekspor data dicatat secara otomatis.`,
              },
              {
                title: "4. Retensi Data",
                content: `Data disimpan selama masa studi berlangsung dan hingga 5 tahun setelah penelitian selesai, sesuai ketentuan institusi. Setelah itu, data akan dihapus atau dianonimkan sepenuhnya.`,
              },
              {
                title: "5. Hak Responden",
                content: `Anda memiliki hak untuk meminta penghapusan data Anda. Permohonan dapat disampaikan melalui email kontak peneliti dan akan diproses dalam ≤ 14 hari kerja.`,
              },
              {
                title: "6. Cookie dan Pelacakan",
                content: `Kami menggunakan sessionStorage browser untuk menyimpan progres pengisian sementara. Data ini otomatis terhapus saat sesi browser berakhir. Kami tidak menggunakan cookie pelacak pihak ketiga.`,
              },
              {
                title: "7. Perubahan Kebijakan",
                content: `Kebijakan privasi ini dapat diperbarui dari waktu ke waktu. Perubahan substansial akan diinformasikan melalui platform ini.`,
              },
            ].map((section) => (
              <div key={section.title} className="mb-8">
                <h2 className="font-[family-name:var(--font-plus-jakarta)] font-bold text-xl text-navy mb-3">
                  {section.title}
                </h2>
                <div className="text-[#4a6068] leading-[1.8] whitespace-pre-line text-sm">
                  {section.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
