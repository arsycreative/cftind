import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Kontak & Layanan Peneliti",
  description:
    "Hubungi tim peneliti platform CFTInd untuk pertanyaan riset, kolaborasi akademik, atau permohonan penarikan data sesuai UU PDP.",
  alternates: {
    canonical: "/kontak",
  },
  openGraph: {
    title: "Kontak & Layanan Peneliti | CFTInd",
    description:
      "Hubungi tim peneliti platform CFTInd untuk pertanyaan riset, kolaborasi akademik, atau permohonan penarikan data sesuai UU PDP.",
    url: "/kontak",
  },
};

export default function KontakPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-[800px] mx-auto px-7 py-16">
          <h1 className="font-[family-name:var(--font-plus-jakarta)] font-extrabold text-4xl text-navy mb-2">
            Kontak Peneliti
          </h1>
          <p className="text-muted mb-8 leading-relaxed">
            Kami terbuka untuk pertanyaan, masukan, atau permohonan penghapusan data.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
            {[
              {
                icon: "✉️",
                title: "Email",
                content: "cftind@gmail.com",
                note: "Respons dalam 1–3 hari kerja",
              },
              {
                icon: "🏛️",
                title: "Institusi",
                content: "Tim CFTInd",
                note: "Platform Riset Kreativitas Guru",
              },
            ].map((item) => (
              <div key={item.title} className="bg-[#f5f9f6] rounded-2xl p-6 border border-[#dce8e0]">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-navy text-sm uppercase tracking-wider mb-1">{item.title}</h3>
                <p className="font-bold text-navy2">{item.content}</p>
                <p className="text-muted text-xs mt-1">{item.note}</p>
              </div>
            ))}
          </div>

          <div className="bg-[#eff7f1] border border-[#c8e6d4] rounded-2xl p-6 text-sm text-[#345c47] mb-8">
            <p className="font-bold mb-2">Permohonan Penghapusan Data</p>
            <p className="leading-relaxed">
              Sesuai hak Anda berdasarkan UU Pelindungan Data Pribadi (UU 27/2022), Anda dapat meminta penghapusan
              data yang telah Anda kirimkan. Kirimkan permohonan ke email di atas dengan subjek
              <strong> "Penghapusan Data CFTInd"</strong>. Permohonan akan diproses dalam ≤ 14 hari kerja.
            </p>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-sm text-amber-800">
            <p className="font-bold mb-2">⚠️ Status Platform</p>
            <p className="leading-relaxed">
              CFTInd saat ini sedang dalam tahap pengumpulan data penelitian. Instrumen belum memiliki bukti
              validitas adaptasi Indonesia yang lengkap. Tidak ada skor atau interpretasi individual yang
              tersedia untuk responden.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
