import Link from "next/link";
import CFTIndLogo from "./CFTIndLogo";

export default function Footer() {
  return (
    <footer className="bg-[#0b2840] text-[#c7d3d6]">
      <div className="max-w-[1180px] mx-auto px-7 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-10 md:gap-14">
          {/* Brand */}
          <div>
            <Link href="/" aria-label="CFTInd beranda">
              <CFTIndLogo className="text-white [&_.text-navy]:text-white [&_.text-green]:!text-green" />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-[#adc0c7]">
              Menumbuhkan Kreativitas Bersama Guru.
              <br />
              Platform riset dan asesmen perilaku guru dalam mendukung kreativitas peserta didik.
            </p>
          </div>

          {/* Jelajahi */}
          <div>
            <h4 className="text-white font-bold mb-3 text-sm">Jelajahi</h4>
            <div className="flex flex-col gap-2 text-sm text-[#adc0c7]">
              <a href="/#tentang" className="hover:text-green transition-colors">Tentang CFTInd</a>
              <a href="/#layanan" className="hover:text-green transition-colors">Layanan</a>
              <a href="/#filosofi" className="hover:text-green transition-colors">Filosofi Brand</a>
              <a href="/#faq" className="hover:text-green transition-colors">FAQ</a>
            </div>
          </div>

          {/* Informasi */}
          <div>
            <h4 className="text-white font-bold mb-3 text-sm">Informasi</h4>
            <div className="flex flex-col gap-2 text-sm text-[#adc0c7]">
              <Link href="/kebijakan-privasi" className="hover:text-green transition-colors">
                Kebijakan Privasi
              </Link>
              <Link href="/kontak" className="hover:text-green transition-colors">
                Kontak Peneliti
              </Link>
            </div>
            <div className="mt-4 text-xs text-[#9bb3bd] leading-relaxed">
              Platform riset pendidikan<br />
              Instrumen belum tervalidasi sepenuhnya
            </div>
          </div>
        </div>

        <div className="border-t border-[#335067] mt-10 pt-5">
          <p className="text-xs text-[#9bb3bd] leading-relaxed">
            © 2026 CFTInd · Platform riset dan asesmen perilaku guru.
            Adaptasi dan digitalisasi instrumen CFTIndex memerlukan izin dan atribusi yang sesuai dari peneliti aslinya.
          </p>
        </div>
      </div>
    </footer>
  );
}
