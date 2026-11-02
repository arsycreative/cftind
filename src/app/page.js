import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DimensionsShowcase from "@/components/DimensionsShowcase";
import InteractiveReflection from "@/components/InteractiveReflection";

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
      {/* Background circles */}
      <div className="absolute w-[440px] h-[440px] rounded-full bg-[#e7f2e6] top-[3%] right-[-7%]" />
      <div className="absolute rounded-full bg-[#fcecc3] w-[140px] h-[140px] bottom-0 left-[2%]" />

      {/* Float card 1 */}
      <div className="animate-float absolute z-10 bg-white p-[14px_18px] rounded-2xl shadow-[0_12px_30px_#12385115] flex gap-3 items-center text-xs font-extrabold left-[-14px] top-[18%] border border-[#e8f1ec]">
        <span className="w-10 h-10 bg-[#e9f7ed] rounded-xl grid place-items-center text-green text-lg">✦</span>
        <span>
          Ide baru berkembang<br />
          <small className="font-medium text-[#849394]">melalui lingkungan yang aman</small>
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
      <div className="animate-float absolute z-10 bg-white p-[14px_18px] rounded-2xl shadow-[0_12px_30px_#12385115] flex gap-3 items-center text-xs font-extrabold right-[-4px] bottom-[12%] border border-[#e8f1ec]" style={{ animationDelay: "1.8s" }}>
        <span className="w-10 h-10 bg-[#e9f7ed] rounded-xl grid place-items-center text-lg">🌱</span>
        <span>
          Setiap guru berperan<br />
          <small className="font-medium text-[#849394]">menyemai potensi anak</small>
        </span>
      </div>
    </div>
  );
}

// FAQ Item Accordion
function FaqItem({ q, a, id }) {
  return (
    <details className="border-b border-[#E4EBE7] py-5 group" id={id}>
      <summary className="cursor-pointer font-extrabold text-navy2 select-none list-none flex justify-between items-center gap-4 text-base md:text-lg">
        {q}
        <span className="text-green shrink-0 transition-transform duration-200 group-open:rotate-180 text-xl">▾</span>
      </summary>
      <p className="text-[#647a7c] leading-[1.8] mt-3 text-sm md:text-base">{a}</p>
    </details>
  );
}

const FAQS = [
  {
    q: "Apa itu instrumen CFTIndex dan apa tujuannya di Indonesia?",
    a: "Creativity Fostering Teacher Behaviour Index (CFTIndex) adalah instrumen pengukuran perilaku pedagogis guru yang dikembangkan oleh Prof. Kay Soh (2000, 2015) berdasarkan 9 prinsip psikologi kreativitas Arthur Cropley. Di Indonesia, instrumen ini diadaptasi untuk membantu memetakan praktik pengajaran yang memberi ruang bagi tumbuhnya pemikiran kreatif murid di berbagai jenjang sekolah.",
  },
  {
    q: "Apakah instrumen ini menampilkan skor kepribadian atau rapor guru?",
    a: "Tidak. Sesuai prinsip etika psikometrik, selama proses pengujian validitas adaptasi Indonesia berlangsung, platform ini tidak menampilkan skor individual atau kategori predikat guru. Pengisian murni bertujuan untuk riset dan refleksi pedagogis, tanpa konsekuensi evaluasi kinerja formal.",
  },
  {
    q: "Berapa lama waktu yang dibutuhkan untuk mengisi instrumen lengkap?",
    a: "Kuesioner terdiri dari 45 butir pernyataan yang dibagi ke dalam 9 layar (5 butir per layar). Rata-rata guru menyelesaikannya dalam waktu ±10 menit. Sistem kami dilengkapi penyimpanan otomatis (autosave) per layar, sehingga Anda tidak perlu khawatir kehilangan data jika koneksi internet terputus.",
  },
  {
    q: "Apakah data sekolah dan identitas pribadi saya aman dan terjamin rahasia?",
    a: "Sangat aman. Platform CFTInd mematuhi prinsip UU Pelindungan Data Pribadi (UU No. 27/2022). Kami tidak mengumpulkan Nama lengkap, NIK, alamat rumah, maupun nomor telepon. Semua data demografis disimpan secara anonim dan alamat IP di-hash satu arah (SHA-256) semata-mata untuk mencegah spam bot.",
  },
  {
    q: "Apakah semua guru dari jenjang PAUD hingga SMA/SMK dapat berpartisipasi?",
    a: "Ya! Instrumen ini dirancang secara inklusif lintas jenjang, mulai dari PAUD/TK, SD/MI, SMP/MTs, SMA/MA, SMK/MAK, hingga SLB/Pendidikan Khusus. Partisipasi guru dari berbagai wilayah dan jenjang sangat berharga untuk membangun norma pengukuran nasional yang adil.",
  },
  {
    q: "Bisakah saya meminta data saya dihapus setelah selesai mengisi?",
    a: "Tentu. Setiap responden memiliki hak penarikan persetujuan. Anda cukup mencatat ID Sesi pengisian Anda dan menghubungi tim peneliti melalui halaman kontak. Sistem admin kami mendukung fitur penghapusan data (soft-delete) sesuai standar etika riset.",
  },
];

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="home">
        {/* ── 1. HERO SECTION ── */}
        <section
          className="overflow-hidden relative"
          style={{ background: "linear-gradient(125deg,#f7fbf8,#fffaf0 72%,#f9fcfa)" }}
        >
          <div className="max-w-[1180px] mx-auto px-7 grid grid-cols-1 md:grid-cols-[1.08fr_.92fr] min-h-[620px] items-center gap-11 pt-12 pb-16 md:py-16">
            {/* Left Content */}
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 text-xs tracking-[0.45px] font-extrabold text-green border border-[#cde5d4] bg-[#f0f9f2] px-3.5 py-2 rounded-full">
                <span className="w-2 h-2 bg-green rounded-full animate-pulse-dot" />
                PLATFORM ASESMEN &amp; RISET KREATIVITAS GURU INDONESIA
              </div>

              <h1
                className="font-[family-name:var(--font-plus-jakarta)] font-extrabold text-navy leading-[1.17] tracking-tight mt-5 mb-4"
                style={{ fontSize: "clamp(38px, 4.2vw, 58px)", letterSpacing: "-2.2px" }}
              >
                Menumbuhkan <span className="text-green">Kreativitas</span> Bersama Guru.
              </h1>

              <p className="text-base md:text-lg leading-[1.78] text-[#556b6f] max-w-[560px]">
                Kenali 9 dimensi perilaku mengajar yang membuka potensi kreatif peserta didik.
                CFTInd hadir sebagai ruang riset terstandar, refleksi profesional, dan penguatan budaya belajar bagi pendidik di seluruh Nusantara.
              </p>

              {/* Action Buttons */}
              <div className="flex gap-3 flex-wrap mt-8">
                <Link
                  href="/isi"
                  id="cta-hero-mulai"
                  className="inline-flex items-center gap-2.5 bg-green text-white font-extrabold px-6 py-4 rounded-[14px] shadow-[0_8px_20px_#278c5733] hover:-translate-y-0.5 hover:bg-green-light transition-all duration-200 text-sm md:text-base"
                >
                  Mulai Kuesioner (±10 Menit) <span aria-hidden>↗</span>
                </Link>
                <a
                  href="#dimensi"
                  className="inline-flex items-center gap-2 bg-white text-navy font-extrabold px-6 py-4 rounded-[14px] border border-[#d8e4dd] hover:-translate-y-0.5 hover:border-green hover:bg-[#fafcfb] transition-all duration-200 text-sm md:text-base"
                >
                  Jelajahi 9 Dimensi <span aria-hidden>↓</span>
                </a>
              </div>

              {/* Reassurance Checklist */}
              <div className="flex gap-5 flex-wrap mt-8 text-xs md:text-sm font-bold text-[#637b79]">
                <span className="flex items-center gap-2"><b className="text-green">✓</b> Berbasis Kajian Ilmiah</span>
                <span className="flex items-center gap-2"><b className="text-green">✓</b> 100% Anonim &amp; Terlindungi</span>
                <span className="flex items-center gap-2"><b className="text-green">✓</b> Lintas Jenjang Pendidikan</span>
              </div>
            </div>

            {/* Right Illustration */}
            <div className="hidden md:block animate-fade-in-up delay-200">
              <HeroIllustration />
            </div>
          </div>

          {/* Key Metric Ticker Bar */}
          <div className="border-t border-[#e5eee8] bg-white/70 backdrop-blur-sm py-5">
            <div className="max-w-[1180px] mx-auto px-7 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl md:text-3xl font-extrabold text-navy font-[family-name:var(--font-plus-jakarta)]">45 Butir</div>
                <div className="text-xs font-semibold text-[#738588] mt-0.5">Pernyataan Terstandar</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-extrabold text-green font-[family-name:var(--font-plus-jakarta)]">9 Dimensi</div>
                <div className="text-xs font-semibold text-[#738588] mt-0.5">Perilaku Guru Pemupuk Kreativitas</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-extrabold text-navy font-[family-name:var(--font-plus-jakarta)]">±10 Menit</div>
                <div className="text-xs font-semibold text-[#738588] mt-0.5">Pengisian Bertahap &amp; Autosave</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-extrabold text-[#D97706] font-[family-name:var(--font-plus-jakarta)]">UU PDP No. 27</div>
                <div className="text-xs font-semibold text-[#738588] mt-0.5">Jaminan Kerahasiaan Data Riset</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. PILAR URGENSI: MENGAPA PERILAKU GURU MENENTUKAN KREATIVITAS? ── */}
        <section className="py-20 md:py-24 bg-[#FCFBF6]" id="tentang">
          <div className="max-w-[1180px] mx-auto px-7">
            <div className="text-center max-w-[760px] mx-auto mb-14">
              <span className="uppercase text-green text-xs font-extrabold tracking-[2px]">
                LATAR BELAKANG &amp; URGENSI
              </span>
              <h2 className="font-[family-name:var(--font-plus-jakarta)] font-extrabold text-3xl md:text-4xl tracking-tight text-navy mt-3 mb-4">
                Kreativitas Murid Tumbuh dari Sikap Guru di Ruang Kelas
              </h2>
              <p className="text-[#647a7c] text-base leading-relaxed">
                Kreativitas bukan bakat bawaan segelintir anak semata, melainkan potensi yang mekar ketika lingkungan kelas memberikan rasa aman psikologis dan keleluasaan untuk mencoba gagasan baru.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: "🛡️",
                  title: "Zona Aman Psikologis",
                  subtitle: "Bebas dari ketakutan dihakimi",
                  desc: "Anak tidak akan berani memunculkan ide unik jika kesalahan langsung divonis salah. Perilaku guru yang menunda penilaian dini menciptakan ruang aman bagi eksperimen ide.",
                  badge: "Iklim Kelas",
                },
                {
                  icon: "🎯",
                  title: "Selaras Kurikulum Merdeka",
                  subtitle: "Berpikir Tingkat Tinggi (HOTS)",
                  desc: "Guru berperan sebagai fasilitator yang mengajukan pertanyaan terbuka dan membimbing pemecahan masalah mandiri, bukan sekadar mendiktekan satu jawaban baku.",
                  badge: "Pedagogi Modern",
                },
                {
                  icon: "🪞",
                  title: "Cermin Refleksi Profesional",
                  subtitle: "Tanpa vonis kompetensi",
                  desc: "Instrumen ini bukan ujian kelayakan guru. Ini adalah cermin reflektif untuk menyadari kebiasaan mengajar yang tanpa sadar telah mendukung atau membatasi daya cipta siswa.",
                  badge: "Pengembangan Diri",
                },
              ].map((card) => (
                <article
                  key={card.title}
                  className="bg-white border border-[#E4EBE7] p-8 rounded-3xl shadow-[0_8px_24px_#193e5b06] hover:shadow-[0_16px_40px_#193e5b10] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-center mb-5">
                      <span className="text-3xl bg-[#ebf5ef] w-14 h-14 rounded-2xl grid place-items-center">
                        {card.icon}
                      </span>
                      <span className="text-[11px] font-extrabold text-green bg-[#f0f9f2] px-3 py-1 rounded-full border border-[#cde5d4]">
                        {card.badge}
                      </span>
                    </div>
                    <h3 className="font-[family-name:var(--font-plus-jakarta)] font-extrabold text-xl text-navy mb-1">
                      {card.title}
                    </h3>
                    <div className="text-xs font-bold text-[#8ba0a3] mb-3">{card.subtitle}</div>
                    <p className="text-sm leading-relaxed text-[#647a7c]">{card.desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── 3. 9 DIMENSI CFTINDEX SHOWCASE (KOMPONEN UTAMA) ── */}
        <DimensionsShowcase />

        {/* ── 4. SIMULASI REFLEKSI INTERAKTIF ── */}
        <InteractiveReflection />

        {/* ── 5. ALUR PENGISIAN 4 TAHAP YANG RAMAH GURU ── */}
        <section className="py-20 md:py-24 bg-white" id="alur">
          <div className="max-w-[1180px] mx-auto px-7">
            <div className="text-center max-w-[720px] mx-auto mb-14">
              <span className="uppercase text-green text-xs font-extrabold tracking-[2px]">
                PENGALAMAN PENGISIAN
              </span>
              <h2 className="font-[family-name:var(--font-plus-jakarta)] font-extrabold text-3xl md:text-4xl tracking-tight text-navy mt-3 mb-4">
                Empat Langkah Sederhana Menuju Riset yang Bermakna
              </h2>
              <p className="text-[#647a7c] text-base leading-relaxed">
                Dirancang mobile-first, ringan dibuka dari ponsel pintar guru di seluruh pelosok, serta tahan terhadap gangguan koneksi internet.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  step: "01",
                  title: "Informed Consent",
                  desc: "Pahami naskah etika penelitian, estimasi waktu, jaminan kerahasiaan, dan berikan persetujuan secara transparan.",
                  icon: "📋",
                },
                {
                  step: "02",
                  title: "Profil Tanpa PII",
                  desc: "Pilih jenjang sekolah, pengalaman mengajar, dan provinsi. Tanpa meminta Nama, NIK, atau nomor kontak pribadi.",
                  icon: "🏫",
                },
                {
                  step: "03",
                  title: "Kuesioner 9 Layar",
                  desc: "Isi 45 butir (5 butir/layar) dengan skala Likert 1–5. Setiap layar tersimpan otomatis (autosave) ke sistem.",
                  icon: "✍️",
                },
                {
                  step: "04",
                  title: "Tinjau & Kirim",
                  desc: "Periksa kembali kelengkapan jawaban dalam satu klik sebelum pengiriman final ke database riset nasional.",
                  icon: "🚀",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="bg-[#f8faf9] border border-[#dcebe0] rounded-2xl p-6 relative flex flex-col justify-between hover:bg-white hover:shadow-md transition-all duration-200"
                >
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-2xl">{item.icon}</span>
                      <span className="text-xs font-extrabold text-green bg-[#e8f6ed] px-2.5 py-1 rounded-full">
                        Tahap {item.step}
                      </span>
                    </div>
                    <h3 className="font-[family-name:var(--font-plus-jakarta)] font-extrabold text-lg text-navy mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs md:text-sm text-[#647a7c] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick CTA */}
            <div className="text-center mt-12">
              <Link
                href="/isi"
                className="inline-flex items-center gap-2 bg-navy text-white font-extrabold px-7 py-3.5 rounded-xl hover:bg-navy-light transition-all shadow-md text-sm"
              >
                Mulai Mengisi Kuesioner Sekarang ↗
              </Link>
            </div>
          </div>
        </section>

        {/* ── 6. DUA JALUR: RUANG PENELITIAN & ASESMEN MANDIRI ── */}
        <section className="py-20 md:py-24 bg-[#f5f9f6]" id="layanan">
          <div className="max-w-[1180px] mx-auto px-7">
            <div className="text-center mb-12">
              <span className="uppercase text-green text-xs font-extrabold tracking-[2px]">JALUR PENGGUNAAN</span>
              <h2 className="font-[family-name:var(--font-plus-jakarta)] font-extrabold text-3xl md:text-4xl tracking-tight mt-3 mb-3 text-navy">
                Satu Platform, Dua Tujuan Strategis
              </h2>
              <p className="text-[#718184] leading-relaxed mx-auto max-w-[640px]">
                Alur riset publik dan asesmen mandiri dirancang terpisah agar tata kelola etika data dan tujuan penggunaan tetap transparan.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Research route */}
              <article className="bg-white border border-[#dcebe0] rounded-[28px] overflow-hidden flex flex-col border-t-[6px] border-t-navy hover:shadow-[0_16px_50px_#153a5b0d] transition-shadow duration-300">
                <div className="p-8 md:p-10 pb-4">
                  <div className="flex justify-between items-center mb-3">
                    <span className="bg-[#e8f6ed] text-[#227c4c] text-xs font-extrabold px-3 py-1.5 rounded-full">
                      UNTUK PENELITI &amp; RESPONDEN GURU
                    </span>
                    <span className="text-xs font-bold text-green">● Sedang Berjalan</span>
                  </div>
                  <h3 className="font-[family-name:var(--font-plus-jakarta)] font-extrabold text-2xl tracking-tight text-navy mb-2">
                    Ruang Penelitian &amp; Pemetaan
                  </h3>
                  <p className="text-[#647a7c] text-sm md:text-base leading-relaxed mb-4">
                    Berpartisipasi dalam riset empiris pemetaan nasional perilaku guru dalam menumbuhkan kreativitas peserta didik di Indonesia.
                  </p>
                  <ul className="space-y-2 text-[#466366] text-sm">
                    <li className="flex items-center gap-2"><span className="text-green font-bold">✓</span> Naskah persetujuan etik (Informed Consent v1.0)</li>
                    <li className="flex items-center gap-2"><span className="text-green font-bold">✓</span> Pengisian anonim tanpa identitas pribadi sensitif</li>
                    <li className="flex items-center gap-2"><span className="text-green font-bold">✓</span> Rekap data tersanitasi untuk SPSS, R, dan JASP</li>
                    <li className="flex items-center gap-2"><span className="text-green font-bold">✓</span> Berkontribusi pada bukti validitas instrumen adaptasi</li>
                  </ul>
                </div>
                <div className="mt-auto p-8 md:p-10 pt-6 border-t border-[#f0f4f2]">
                  <Link
                    href="/isi"
                    id="cta-ruang-penelitian"
                    className="inline-flex items-center gap-2 bg-navy text-white font-extrabold px-6 py-3.5 rounded-[13px] hover:bg-navy-light transition-all text-sm w-full sm:w-auto justify-center"
                  >
                    Buka Ruang Penelitian ↗
                  </Link>
                </div>
              </article>

              {/* Assessment route */}
              <article className="bg-white border border-[#dcebe0] rounded-[28px] overflow-hidden flex flex-col border-t-[6px] border-t-green hover:shadow-[0_16px_50px_#278c5710] transition-shadow duration-300">
                <div className="p-8 md:p-10 pb-4">
                  <div className="flex justify-between items-center mb-3">
                    <span className="bg-[#fef9ec] text-[#b45309] text-xs font-extrabold px-3 py-1.5 rounded-full">
                      PENGEMBANGAN GURU MANDIRI
                    </span>
                    <span className="text-xs font-semibold text-[#8ba0a3]">Fase Berikutnya</span>
                  </div>
                  <h3 className="font-[family-name:var(--font-plus-jakarta)] font-extrabold text-2xl tracking-tight text-navy mb-2">
                    Refleksi &amp; Asesmen Mandiri Guru
                  </h3>
                  <p className="text-[#647a7c] text-sm md:text-base leading-relaxed mb-4">
                    Kenali kekuatan pedagogis Anda secara mandiri untuk membuka ruang eksplorasi, keberanian bertanya, dan resiliensi murid.
                  </p>
                  <ul className="space-y-2 text-[#466366] text-sm">
                    <li className="flex items-center gap-2"><span className="text-green font-bold">✓</span> Diagnostik mandiri tanpa penghakiman nilai</li>
                    <li className="flex items-center gap-2"><span className="text-green font-bold">✓</span> Rekomendasi strategi pengajaran per dimensi</li>
                    <li className="flex items-center gap-2"><span className="text-green font-bold">✓</span> Diluncurkan resmi setelah instrumen tervalidasi penuh</li>
                    <li className="flex items-center gap-2"><span className="text-green font-bold">✓</span> Rencana aksi pembelajaran berbasis diferensiasi</li>
                  </ul>
                </div>
                <div className="mt-auto p-8 md:p-10 pt-6 border-t border-[#f0f4f2]">
                  <div className="inline-flex items-center gap-2 bg-[#f3f5f4] text-[#7d9396] font-bold px-6 py-3.5 rounded-[13px] text-sm cursor-not-allowed">
                    Segera Hadir Pasca Validasi ⏳
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* ── 7. STANDAR KEAMANAN & KEPATUHAN UU PDP ── */}
        <section className="py-20 md:py-24 bg-[#0E2B46] text-white relative">
          <div className="max-w-[1180px] mx-auto px-7">
            <div className="text-center max-w-[700px] mx-auto mb-14">
              <span className="uppercase text-yellow text-xs font-extrabold tracking-[2px] bg-white/10 px-3.5 py-1.5 rounded-full border border-white/20">
                KEAMANAN DATA &amp; ETIKA ILMIAH
              </span>
              <h2 className="font-[family-name:var(--font-plus-jakarta)] font-extrabold text-3xl md:text-4xl tracking-tight text-white mt-4 mb-4">
                Privasi Anda Dijaga dengan Standar Hukum Tertinggi
              </h2>
              <p className="text-[#bcd2da] text-base leading-relaxed">
                Kami menjunjung tinggi prinsip Undang-Undang Pelindungan Data Pribadi (UU No. 27/2022). Partisipasi Anda aman, rahasia, dan bertanggung jawab.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Nir-Identitas Sensitif",
                  desc: "Tidak pernah meminta Nama, NIK, nomor telepon, maupun alamat rumah. Profil hanya berupa jenjang dan provinsi.",
                  badge: "Minimisasi Data",
                  icon: "🔒",
                },
                {
                  title: "Hash Anonimitas IP",
                  desc: "Alamat IP diacak menggunakan algoritma satu arah SHA-256 untuk proteksi bot tanpa pernah menyimpan IP mentah.",
                  badge: "UU PDP 27/2022",
                  icon: "🛡️",
                },
                {
                  title: "Hak Penarikan Data",
                  desc: "Responden berhak meminta datanya dihapus kapan saja dengan menyebutkan ID Sesi pengisian melalui kontak peneliti.",
                  badge: "Hak Subjek Data",
                  icon: "🗑️",
                },
                {
                  title: "Transmisi Terenkripsi",
                  desc: "Seluruh komunikasi data diamankan protokol SSL/TLS modern dengan proteksi SQL Injection & RLS Supabase.",
                  badge: "Enkripsi Penuh",
                  icon: "⚡",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-white/5 border border-white/15 rounded-2xl p-6 backdrop-blur-sm flex flex-col justify-between"
                >
                  <div>
                    <span className="text-2xl mb-3 block">{item.icon}</span>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-yellow mb-2 block">
                      {item.badge}
                    </span>
                    <h3 className="font-[family-name:var(--font-plus-jakarta)] font-extrabold text-lg text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs md:text-sm text-[#bcd2da] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 8. FILOSOFI BRAND & SIMBOLISME LOGO ── */}
        <section className="py-20 md:py-24 bg-white" id="filosofi">
          <div className="max-w-[1180px] mx-auto px-7 grid grid-cols-1 md:grid-cols-[.85fr_1.15fr] gap-12 md:gap-16 items-center">
            <div className="bg-[#eaf4ed] min-h-[380px] rounded-[36px] grid place-items-center order-2 md:order-1 p-8 shadow-inner">
              <PencilIllustration />
            </div>

            <div className="order-1 md:order-2">
              <span className="uppercase text-green text-xs font-extrabold tracking-[2px] bg-[#f0f9f2] px-3.5 py-1.5 rounded-full border border-[#cde5d4]">
                FILOSOFI LOGO &amp; IDENTITAS
              </span>
              <h2 className="font-[family-name:var(--font-plus-jakarta)] font-extrabold text-3xl md:text-4xl tracking-tight text-navy mt-4 mb-4">
                Setiap Ide Layak Mendapat Ruang untuk Tumbuh.
              </h2>
              <div className="border-l-4 border-yellow pl-5 text-xl font-extrabold text-navy mb-6">
                &ldquo;Menumbuhkan Kreativitas Bersama Guru&rdquo;
              </div>

              <div className="space-y-4 text-[#55696d] leading-relaxed text-sm md:text-base">
                <p>
                  <strong>Pensil Biru Dongker</strong> melambangkan pendidikan, integritas akademik, disiplin ilmu, serta dedikasi pendidik dalam membangun fondasi belajar peserta didik.
                </p>
                <p>
                  <strong>Tunas Daun Kuning</strong> di sisi kiri menjadi simbol dari percikan ide awal, keberanian mengeksplorasi rasa ingin tahu, dan kebebasan berpikir yang tidak dibatasi oleh dogma kaku.
                </p>
                <p>
                  <strong>Tunas Daun Hijau Mekar</strong> di sisi kanan melambangkan pertumbuhan berkelanjutan—bagaimana gagasan kreatif murid dapat berkembang menjadi karya bermakna jika disiram dengan iklim kelas yang apresiatif.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 9. FAQ KOMPREHENSIF ── */}
        <section className="py-20 md:py-24 bg-[#FCFBF6] border-t border-[#E4EBE7]" id="faq">
          <div className="max-w-[1180px] mx-auto px-7">
            <div className="text-center max-w-[680px] mx-auto mb-12">
              <span className="uppercase text-green text-xs font-extrabold tracking-[2px]">
                PUSAT BANTUAN &amp; PERTANYAAN
              </span>
              <h2 className="font-[family-name:var(--font-plus-jakarta)] font-extrabold text-3xl md:text-4xl tracking-tight text-navy mt-3">
                Pertanyaan yang Sering Diajukan
              </h2>
              <p className="text-[#718184] text-sm md:text-base mt-2">
                Temukan jawaban lengkap seputar tujuan riset, privasi data, dan teknis pengisian.
              </p>
            </div>

            <div className="max-w-[840px] mx-auto bg-white border border-[#E4EBE7] rounded-3xl p-6 md:p-10 shadow-sm">
              {FAQS.map((f, i) => (
                <FaqItem key={f.q} id={`faq-${i}`} q={f.q} a={f.a} />
              ))}
            </div>
          </div>
        </section>

        {/* ── 10. BANNER CTA BESAR ── */}
        <section className="bg-gradient-to-r from-navy to-navy2 py-20 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(39,140,87,0.2),transparent_70%)] pointer-events-none" />
          <div className="max-w-[800px] mx-auto px-7 relative z-10">
            <span className="text-xs font-extrabold uppercase tracking-widest text-yellow bg-white/10 px-4 py-1.5 rounded-full border border-white/20 inline-block mb-4">
              MARI MENYEMAI POTENSI
            </span>
            <h2 className="font-[family-name:var(--font-plus-jakarta)] font-extrabold text-3xl md:text-5xl mb-4 leading-tight">
              Setiap Ruang Kelas Menyimpan Potensi Kreativitas.
            </h2>
            <p className="text-[#bdd3d4] text-base md:text-lg mb-8 max-w-[620px] mx-auto leading-relaxed">
              Jadilah bagian dari riset pemetaan perilaku guru Indonesia dan kenali praktik pedagogis yang membantu daya cipta anak bangsa bertumbuh.
            </p>
            <Link
              href="/isi"
              id="cta-banner"
              className="inline-flex items-center gap-2 bg-yellow text-[#153a5b] font-extrabold text-base px-8 py-4 rounded-[14px] hover:-translate-y-0.5 hover:bg-[#fed368] transition-all duration-200 shadow-[0_10px_25px_#f8be3d44]"
            >
              Mulai Mengisi Sekarang (±10 Menit) ↗
            </Link>
            <div className="mt-5 text-xs text-[#8ca3ac]">
              Tanpa pendaftaran akun · Gratis &amp; Sukarela · Respons 100% Anonim
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
