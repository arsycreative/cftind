import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CFTIndLogo from "@/components/CFTIndLogo";

// Pencil logo SVG for philosophy section
function PencilIllustration() {
  return (
    <svg viewBox="0 0 270 330" aria-label="Pensil bertunas CFTInd" className="w-[65%] max-h-[300px]">
      <path d="M119 128C35 113 25 56 40 22c70 4 95 56 79 106Z" fill="#F8BE3D" />
      <path d="M148 125C147 53 186 15 249 10c0 76-32 110-101 115Z" fill="#278C57" />
      <path d="M113 133h43v133h-43Z" fill="#153A5B" />
      <path d="m113 266 21 60 22-60Z" fill="#F6CFA8" />
      <path d="m126 304 8 22 9-22Z" fill="#153A5B" />
      <path d="M134 133v133" stroke="white" strokeWidth="6" />
    </svg>
  );
}

// Hero illustration
function HeroIllustration() {
  return (
    <div className="relative min-h-[490px] grid place-items-center">
      {/* Background circle */}
      <div className="absolute w-[440px] h-[440px] rounded-full bg-[#e7f2e6] top-[3%] right-[-7%]" />
      <div className="absolute rounded-full bg-[#fcecc3] w-[140px] h-[140px] bottom-0 left-[2%]" />

      {/* Float card 1 */}
      <div className="animate-float absolute z-10 bg-white p-[14px_17px] rounded-2xl shadow-[0_12px_30px_#12385115] flex gap-2.5 items-center text-xs font-extrabold left-[-14px] top-[20%]">
        <span className="w-9 h-9 bg-[#e9f7ed] rounded-[11px] grid place-items-center text-green text-lg">✦</span>
        <span>
          Ide baru berkembang<br />
          <small className="font-medium text-[#849394]">melalui pembelajaran</small>
        </span>
      </div>

      {/* Main SVG illustration */}
      <svg
        viewBox="0 0 540 500"
        role="img"
        aria-label="Ilustrasi guru dan murid dengan buku, tumbuhan, dan ide kreatif"
        className="w-full max-w-[515px] relative"
        style={{ filter: "drop-shadow(0 16px 25px #153a5b15)" }}
      >
        <ellipse cx="270" cy="425" rx="188" ry="25" fill="#cedfda" opacity=".6"/>
        <path d="M125 345Q190 294 270 340Q350 290 418 345V410Q344 374 270 418Q197 371 125 410Z" fill="#1b5178"/>
        <path d="M270 343Q192 295 125 346V399Q203 362 270 410Z" fill="#fffdf2"/>
        <path d="M270 343Q352 295 418 346V399Q343 362 270 410Z" fill="#f9f6df"/>
        <path d="M270 346V414" stroke="#88b5a4" strokeWidth="5"/>
        <path d="M163 360Q208 338 253 365M170 382Q216 357 253 382M290 364Q335 342 383 360M290 385Q342 364 383 382" stroke="#d9ded3" strokeWidth="5" fill="none" strokeLinecap="round"/>
        <path d="M261 310C234 262 225 224 246 187M262 312c18-75 45-111 74-132" stroke="#2d9460" strokeWidth="11" strokeLinecap="round" fill="none"/>
        <path d="M242 227C193 232 176 193 182 155c40 2 68 25 60 72Z" fill="#79b96c"/>
        <path d="M273 251C314 248 346 222 346 181c-43-1-76 31-73 70Z" fill="#218d59"/>
        <path d="M247 178C226 148 236 109 266 95c18 30 14 59-19 83Z" fill="#f5c449"/>
        <circle cx="369" cy="115" r="56" fill="#fff2d2"/>
        <path d="M368 72c-20 0-35 14-35 34 0 14 7 23 15 31h40c9-8 16-18 16-31 0-20-16-34-36-34Z" fill="#f7c54a"/>
        <path d="M351 145h35m-31 10h28m-23 10h17" stroke="#dba52d" strokeWidth="7" strokeLinecap="round"/>
        <path d="m358 119 10-15 10 15" stroke="#fff" strokeWidth="5" fill="none"/>
        <path d="M114 143l7 18 18 7-18 7-7 18-7-18-18-7 18-7Z" fill="#e9b744"/>
        <circle cx="432" cy="244" r="8" fill="#67bda4"/>
        <circle cx="95" cy="257" r="6" fill="#d3dc6b"/>
        <path d="M418 295l5 11 12 4-12 4-5 12-5-12-11-4 11-4Z" fill="#78b598"/>
      </svg>

      {/* Float card 2 */}
      <div className="animate-float absolute z-10 bg-white p-[14px_17px] rounded-2xl shadow-[0_12px_30px_#12385115] flex gap-2.5 items-center text-xs font-extrabold right-[-2px] bottom-[10%]" style={{ animationDelay: "1.5s" }}>
        <span className="w-9 h-9 bg-[#e9f7ed] rounded-[11px] grid place-items-center text-lg">🌱</span>
        <span>
          Setiap guru berperan<br />
          <small className="font-medium text-[#849394]">menyemai kreativitas</small>
        </span>
      </div>
    </div>
  );
}

// FAQ Item
function FaqItem({ q, a }) {
  return (
    <details className="border-b border-[#E4EBE7] py-5 group">
      <summary className="cursor-pointer font-extrabold text-navy2 select-none list-none flex justify-between items-center gap-4">
        {q}
        <span className="text-green shrink-0 transition-transform duration-200 group-open:rotate-180">▾</span>
      </summary>
      <p className="text-[#6f8183] leading-[1.7] mt-3 text-sm">{a}</p>
    </details>
  );
}

const faqs = [
  {
    q: "Apakah CFTInd sudah menjadi alat tes psikologi yang tervalidasi?",
    a: "Adaptasi Indonesia instrumen ini memerlukan izin penggunaan dan bukti validitas, reliabilitas, serta dasar interpretasi sebelum hasil asesmen individual digunakan secara resmi. Pengisian saat ini dalam rangka pengumpulan data penelitian.",
  },
  {
    q: "Apakah semua jenjang pendidikan dapat menggunakannya?",
    a: "Desain platform dibuat lintas jenjang. Penggunaan instrumen pada kelompok PAUD, SD, SMP, SMA, SMK, dan pendidikan khusus harus mempertimbangkan relevansi butir serta bukti kesetaraan pengukuran.",
  },
  {
    q: "Apakah data saya aman dan terjaga privasinya?",
    a: "Ya. Kami tidak mengumpulkan nama, NIK, atau nomor telepon. Data yang dikumpulkan hanya profil demografis tanpa identitas langsung dan jawaban instrumen. Semua data disimpan dengan aman dan hanya digunakan untuk tujuan penelitian yang disebutkan dalam naskah persetujuan.",
  },
  {
    q: "Apa hubungan CFTInd dengan CFTIndex?",
    a: "CFTInd adalah nama platform. Creativity Fostering Teacher Behaviour Index (CFTIndex) merupakan instrumen yang dikembangkan oleh peneliti aslinya; adaptasi dan digitalisasinya memerlukan izin dan atribusi yang sesuai.",
  },
  {
    q: "Berapa lama waktu yang dibutuhkan untuk mengisi?",
    a: "Pengisian instrumen (45 butir) membutuhkan waktu sekitar ±10 menit. Anda tidak perlu menyelesaikannya sekaligus—jawaban otomatis tersimpan per bagian.",
  },
];

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="home">
        {/* ── HERO ── */}
        <section
          className="overflow-hidden"
          style={{ background: "linear-gradient(125deg,#f7fbf8,#fffaf0 72%,#f9fcfa)" }}
        >
          <div className="max-w-[1180px] mx-auto px-7 grid grid-cols-1 md:grid-cols-[1.08fr_.92fr] min-h-[590px] items-center gap-11 py-16 md:pt-12 md:pb-16">
            {/* Left */}
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 text-xs tracking-[0.45px] font-extrabold text-green border border-[#cde5d4] bg-[#f0f9f2] px-3.5 py-2.5 rounded-full">
                <span className="w-[7px] h-[7px] bg-green rounded-full animate-pulse-dot" />
                PLATFORM ASESMEN &amp; RISET KREATIVITAS GURU
              </div>
              <h1
                className="font-[family-name:var(--font-plus-jakarta)] font-extrabold text-navy leading-[1.17] tracking-tight mt-5 mb-4"
                style={{ fontSize: "clamp(42px, 4.1vw, 60px)", letterSpacing: "-2.5px" }}
              >
                Menumbuhkan <span className="text-green">Kreativitas</span> Bersama Guru.
              </h1>
              <p className="text-lg leading-[1.78] text-[#5f7377] max-w-[540px]">
                Kenali praktik mengajar yang mendukung tumbuhnya kreativitas peserta didik.
                CFTInd hadir sebagai ruang riset, asesmen, dan refleksi profesional bagi guru Indonesia.
              </p>

              <div className="flex gap-3 flex-wrap mt-8">
                <Link
                  href="/isi"
                  id="cta-hero-mulai"
                  className="inline-flex items-center gap-2 bg-green text-white font-extrabold px-6 py-4 rounded-[13px] shadow-[0_8px_20px_#278c5722] hover:-translate-y-0.5 hover:bg-green-light transition-all duration-200"
                >
                  Mulai Eksplorasi <span aria-hidden>↗</span>
                </Link>
                <a
                  href="#tentang"
                  className="inline-flex items-center gap-2 bg-white text-navy font-extrabold px-6 py-4 rounded-[13px] border border-[#d8e4dd] hover:-translate-y-0.5 hover:border-green transition-all duration-200"
                >
                  Kenali CFTInd <span aria-hidden>↓</span>
                </a>
              </div>

              <div className="flex gap-6 flex-wrap mt-10 text-[13px] font-bold text-[#637b79]">
                <span className="flex items-center gap-2"><b className="text-green">✓</b> Berbasis kajian ilmiah</span>
                <span className="flex items-center gap-2"><b className="text-green">✓</b> Ramah untuk guru</span>
                <span className="flex items-center gap-2"><b className="text-green">✓</b> Lintas jenjang pendidikan</span>
              </div>
            </div>

            {/* Right */}
            <div className="hidden md:block animate-fade-in-up delay-200">
              <HeroIllustration />
            </div>
          </div>
        </section>

        {/* ── TENTANG / FITUR ── */}
        <section className="py-20 md:py-24" id="tentang">
          <div className="max-w-[1180px] mx-auto px-7">
            <div className="text-center mb-10">
              <span className="uppercase text-green text-xs font-extrabold tracking-[2px]">KENALI CFTIND</span>
              <h2 className="font-[family-name:var(--font-plus-jakarta)] font-extrabold text-4xl tracking-tight mt-3 mb-3">Untuk guru, bersama guru.</h2>
              <p className="text-[#718184] leading-[1.65] mx-auto max-w-[610px]">
                Kami memadukan pendekatan ilmiah dan pengalaman digital yang sederhana untuk membantu memahami perilaku mengajar yang menumbuhkan kreativitas.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                {
                  icon: "◎",
                  title: "Asesmen Reflektif",
                  desc: "Membantu guru mengenali praktik pembelajaran yang mendukung kreativitas, dengan interpretasi sesuai bukti validasi yang tersedia.",
                  link: "#layanan",
                  linkLabel: "Jelajahi layanan ↗",
                },
                {
                  icon: "▤",
                  title: "Riset Berbasis Data",
                  desc: "Mendukung pengumpulan data penelitian yang terstruktur, persetujuan partisipasi, dan pengelolaan respons secara bertanggung jawab.",
                  link: "#layanan",
                  linkLabel: "Jelajahi penelitian ↗",
                },
                {
                  icon: "✳",
                  title: "Pertumbuhan Bersama",
                  desc: "Mendorong refleksi dan percakapan profesional mengenai lingkungan belajar yang memberi ruang bagi ide kreatif siswa.",
                  link: "#filosofi",
                  linkLabel: "Lihat filosofi ↗",
                },
              ].map((card) => (
                <article
                  key={card.title}
                  className="bg-white border border-[#E4EBE7] p-7 rounded-3xl shadow-[0_10px_27px_#193e5b06] hover:shadow-[0_14px_40px_#193e5b10] hover:-translate-y-1 transition-all duration-300"
                >
                  <span className="text-2xl bg-[#ebf5ef] w-14 h-14 rounded-2xl grid place-items-center">{card.icon}</span>
                  <h3 className="font-[family-name:var(--font-plus-jakarta)] font-extrabold text-[19px] mt-6 mb-2.5">{card.title}</h3>
                  <p className="text-sm leading-[1.75] text-[#718184]">{card.desc}</p>
                  <a href={card.link} className="text-green text-sm font-extrabold mt-4 inline-block hover:underline">
                    {card.linkLabel}
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── JALUR CFTIND ── */}
        <section className="py-20 md:py-24 bg-[#f5f9f6]" id="layanan">
          <div className="max-w-[1180px] mx-auto px-7">
            <div className="text-center mb-10">
              <span className="uppercase text-green text-xs font-extrabold tracking-[2px]">JALUR CFTIND</span>
              <h2 className="font-[family-name:var(--font-plus-jakarta)] font-extrabold text-4xl tracking-tight mt-3 mb-3">Satu platform, dua tujuan.</h2>
              <p className="text-[#718184] leading-[1.65] mx-auto max-w-[610px]">
                Pilih kebutuhan Anda. Alur penelitian dan asesmen mandiri dirancang terpisah agar tujuan penggunaan serta persetujuan data tetap jelas.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Research route */}
              <article className="bg-white border border-[#dcebe0] rounded-[26px] overflow-hidden flex flex-col border-t-[5px] border-t-navy hover:shadow-[0_16px_50px_#153a5b0d] transition-shadow duration-300">
                <div className="p-9 pb-4">
                  <span className="bg-[#e8f6ed] text-[#227c4c] text-xs font-extrabold px-3 py-2 rounded-full">UNTUK PENELITI &amp; RESPONDEN</span>
                  <h3 className="font-[family-name:var(--font-plus-jakarta)] font-extrabold text-[26px] tracking-tight mt-4 mb-2">Ruang Penelitian</h3>
                  <p className="text-[#647a7c] text-[15px] leading-[1.7]">
                    Berpartisipasi dalam studi yang memetakan perilaku guru dalam menumbuhkan kreativitas siswa.
                  </p>
                  <ul className="mt-2 pl-5 text-[#466366] text-sm leading-[2.2]">
                    <li>Informasi dan persetujuan penelitian</li>
                    <li>Profil responden yang relevan</li>
                    <li>Kuesioner digital yang mudah diakses</li>
                    <li>Pengelolaan data sesuai protokol studi</li>
                  </ul>
                </div>
                <div className="mt-auto p-9 pt-6">
                  <Link
                    href="/isi"
                    id="cta-ruang-penelitian"
                    className="inline-flex items-center gap-2 bg-white text-navy font-extrabold px-5 py-3.5 rounded-[13px] border border-[#d8e4dd] hover:border-green hover:-translate-y-0.5 transition-all duration-200 text-sm"
                  >
                    Mulai Berpartisipasi ↗
                  </Link>
                </div>
              </article>

              {/* Assessment route */}
              <article className="bg-white border border-[#dcebe0] rounded-[26px] overflow-hidden flex flex-col border-t-[5px] border-t-green hover:shadow-[0_16px_50px_#278c5710] transition-shadow duration-300">
                <div className="p-9 pb-4">
                  <span className="bg-[#e8f6ed] text-[#227c4c] text-xs font-extrabold px-3 py-2 rounded-full">UNTUK GURU</span>
                  <h3 className="font-[family-name:var(--font-plus-jakarta)] font-extrabold text-[26px] tracking-tight mt-4 mb-2">Refleksi &amp; Asesmen Guru</h3>
                  <p className="text-[#647a7c] text-[15px] leading-[1.7]">
                    Kenali kebiasaan mengajar yang memberi ruang pada eksplorasi, ide baru, dan kreativitas peserta didik.
                  </p>
                  <ul className="mt-2 pl-5 text-[#466366] text-sm leading-[2.2]">
                    <li>Pengisian asesmen mandiri</li>
                    <li>Refleksi praktik pembelajaran</li>
                    <li>Hasil personal setelah instrumen tervalidasi</li>
                    <li>Arah pengembangan profesional</li>
                  </ul>
                </div>
                <div className="mt-auto p-9 pt-6">
                  <div className="inline-flex items-center gap-2 bg-[#f3f5f4] text-[#8a9c9f] font-extrabold px-5 py-3.5 rounded-[13px] text-sm cursor-not-allowed" title="Segera hadir setelah instrumen tervalidasi">
                    Segera Hadir ⏳
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* ── FILOSOFI ── */}
        <section className="py-20 md:py-24" id="filosofi">
          <div className="max-w-[1180px] mx-auto px-7 grid grid-cols-1 md:grid-cols-[.8fr_1.2fr] gap-16 md:gap-20 items-center">
            <div className="bg-[#eaf4ed] min-h-[365px] rounded-[35px] grid place-items-center order-2 md:order-1">
              <PencilIllustration />
            </div>
            <div className="order-1 md:order-2">
              <span className="uppercase text-green text-xs font-extrabold tracking-[2px]">FILOSOFI KAMI</span>
              <h2 className="font-[family-name:var(--font-plus-jakarta)] font-extrabold text-[35px] tracking-tight mt-3 mb-4">
                Setiap ide layak mendapat ruang untuk tumbuh.
              </h2>
              <p className="border-l-4 border-yellow pl-5 text-xl font-extrabold text-navy mb-6">
                Menumbuhkan Kreativitas Bersama Guru
              </p>
              <p className="text-[#637a7b] leading-[1.9] mb-4">
                Pensil pada logo melambangkan pendidikan, pengetahuan, dan refleksi. Daun kuning menjadi simbol awal ide dan keberanian bereksplorasi, sedangkan daun hijau menggambarkan pertumbuhan potensi kreatif.
              </p>
              <p className="text-[#637a7b] leading-[1.9]">
                Melalui CFTInd, guru ditempatkan sebagai mitra penting dalam menciptakan pembelajaran yang membuka kesempatan bagi kreativitas peserta didik untuk berkembang.
              </p>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="pb-20 md:pb-24" id="faq">
          <div className="max-w-[1180px] mx-auto px-7">
            <div className="text-center mb-10">
              <span className="uppercase text-green text-xs font-extrabold tracking-[2px]">PERTANYAAN UMUM</span>
              <h2 className="font-[family-name:var(--font-plus-jakarta)] font-extrabold text-4xl tracking-tight mt-3">Hal yang perlu diketahui</h2>
            </div>
            <div className="max-w-[800px] mx-auto">
              {faqs.map((f) => (
                <FaqItem key={f.q} q={f.q} a={f.a} />
              ))}
            </div>
          </div>
        </section>

        {/* ── BANNER CTA ── */}
        <section className="bg-navy py-16 text-center text-white">
          <div className="max-w-[1180px] mx-auto px-7">
            <h2 className="font-[family-name:var(--font-plus-jakarta)] font-extrabold text-3xl md:text-4xl mb-3">
              Setiap ruang kelas menyimpan potensi kreativitas.
            </h2>
            <p className="text-[#bdd3d4] mb-8">Mari mengenali praktik yang membantu potensi itu bertumbuh.</p>
            <Link
              href="/isi"
              id="cta-banner"
              className="inline-flex items-center gap-2 bg-yellow text-[#203c52] font-extrabold px-7 py-4 rounded-[13px] hover:-translate-y-0.5 hover:opacity-90 transition-all duration-200"
            >
              Jelajahi CFTInd ↗
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
