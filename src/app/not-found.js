import Link from "next/link";
import CFTIndLogo from "@/components/CFTIndLogo";

export const metadata = {
  title: "Halaman Tidak Ditemukan (404)",
  description: "Halaman yang Anda cari tidak ditemukan atau telah dipindahkan.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FAFBF7] flex flex-col justify-between p-6">
      <header className="max-w-[1180px] mx-auto w-full pt-6">
        <Link href="/" aria-label="CFTInd Beranda">
          <CFTIndLogo />
        </Link>
      </header>

      <main className="max-w-[560px] mx-auto text-center my-auto py-12 px-4">
        {/* Visual Badge */}
        <div className="w-20 h-20 bg-[#edf7f1] text-[#278C57] text-4xl rounded-3xl grid place-items-center mx-auto mb-6 shadow-sm border border-[#d2e7d9]">
          🌱
        </div>

        <span className="text-xs font-extrabold uppercase tracking-widest text-[#278C57] bg-[#edf7f1] border border-[#cbe5d5] px-3.5 py-1.5 rounded-full inline-block mb-4">
          GALAT 404 · HALAMAN TIDAK DITEMUKAN
        </span>

        <h1 className="font-[family-name:var(--font-plus-jakarta)] font-extrabold text-3xl md:text-4xl text-[#153A5B] tracking-tight mb-4">
          Sepertinya Anda Berada di Ruang yang Berbeda.
        </h1>

        <p className="text-[#647a7c] text-base leading-relaxed mb-8">
          Tautan yang Anda tuju mungkin sudah dipindahkan, salah ketik, atau belum tersedia. 
          Mari kembali ke beranda untuk menjelajahi platform riset dan asesmen kreativitas guru.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-white text-[#153A5B] border border-[#d2e3d9] font-extrabold px-6 py-3.5 rounded-xl hover:bg-[#f6faf8] hover:border-[#278C57] transition-all text-sm shadow-xs"
          >
            ← Kembali ke Beranda
          </Link>
          <Link
            href="/isi"
            className="inline-flex items-center gap-2 bg-[#278C57] text-white font-extrabold px-6 py-3.5 rounded-xl hover:bg-[#207a4a] transition-all text-sm shadow-[0_6px_16px_#278c5733]"
          >
            Mulai Kuesioner (±10 Menit) ↗
          </Link>
        </div>
      </main>

      <footer className="text-center text-xs text-[#8c9f9e] py-6 border-t border-[#e5efe8]">
        © 2026 CFTInd · Menumbuhkan Kreativitas Bersama Guru
      </footer>
    </div>
  );
}
