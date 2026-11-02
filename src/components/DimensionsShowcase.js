"use client";

import { useState } from "react";

const DIMENSIONS_DATA = [
  {
    id: "independence",
    name: "Kemandirian",
    english: "Independence",
    icon: "🧭",
    tag: "Otonomi Belajar",
    desc: "Memberikan keleluasaan kepada peserta didik untuk mengeksplorasi konsep dan belajar secara mandiri setelah memahami pengetahuan dasar.",
    classroom: "Guru mengajukan pertanyaan terbuka yang memantik rasa ingin tahu, lalu memberi waktu bagi siswa menemukan jawabannya sendiri tanpa langsung mendiktekan solusi.",
    sampleItem: "Saya mengajarkan hal-hal dasar kepada murid, kemudian memberi ruang bagi mereka untuk belajar secara mandiri.",
    color: "#278C57",
    bgSoft: "#edf7f1",
  },
  {
    id: "integration",
    name: "Integrasi & Kolaborasi",
    english: "Integration",
    icon: "🤝",
    tag: "Dialog Inklusif",
    desc: "Menciptakan ruang kelas kolaboratif di mana murid saling berbagi gagasan, berdiskusi secara setara, dan memadukan beragam perspektif.",
    classroom: "Membiasakan sesi bertukar ide, kerja kelompok terstruktur, dan mendorong murid menyumbangkan pemikiran dalam rancangan kegiatan kelas.",
    sampleItem: "Di kelas saya, murid memiliki kesempatan untuk berbagi ide dan pandangan mereka secara terbuka.",
    color: "#153A5B",
    bgSoft: "#ebf2f7",
  },
  {
    id: "motivation",
    name: "Fondasi & Kedalaman",
    english: "Motivation",
    icon: "📚",
    tag: "Penguasaan Esensial",
    desc: "Menekankan penguasaan pengetahuan dan keterampilan pokok secara mendalam dan bermakna, alih-alih sekadar mengejar ketuntasan materi kurikulum.",
    classroom: "Tidak terburu-buru berpindah bab jika murid belum memahami prinsip mendasar; memastikan pondasi konseptual murid kuat agar siap berkreasi.",
    sampleItem: "Menuntaskan seluruh materi pembelajaran tidak lebih penting daripada memastikan murid mempelajari hal-hal dasar dengan baik.",
    color: "#B45309",
    bgSoft: "#fef3c7",
  },
  {
    id: "judgement",
    name: "Penundaan Penilaian",
    english: "Judgement",
    icon: "⏳",
    tag: "Ruang Eksplorasi",
    desc: "Menahan kritik, vonis, atau evaluasi dini agar gagasan awal murid yang masih mentah memiliki ruang untuk diuji dan berkembang.",
    classroom: "Ketika murid mengajukan ide yang belum sempurna, guru tidak langsung berkata 'salah', melainkan bertanya: 'Menarik! Kira-kira bagaimana jika kita coba langkah berikutnya?'.",
    sampleItem: "Ketika murid mengusulkan sesuatu, saya mengajukan pertanyaan lanjutan agar mereka berpikir lebih jauh sebelum saya menilai.",
    color: "#7C3AED",
    bgSoft: "#f5f3ff",
  },
  {
    id: "flexibility",
    name: "Kelenturan Berpikir",
    english: "Flexibility",
    icon: "🔀",
    tag: "Berpikir Divergen",
    desc: "Mendorong cara berpikir beragam, menerima pendekatan alternatif, dan mengizinkan siswa menyimpang dari satu contoh baku yang diberikan.",
    classroom: "Menghargai cara-cara berbeda dalam menyelesaikan persoalan matematika atau proyek sains, asalkan memiliki penalaran logis yang dapat dipertanggungjawabkan.",
    sampleItem: "Saya mengizinkan murid mencoba cara yang berbeda dari arahan baku yang biasanya diberikan kepada mereka.",
    color: "#059669",
    bgSoft: "#ecfdf5",
  },
  {
    id: "evaluation",
    name: "Evaluasi Diri Reflektif",
    english: "Evaluation",
    icon: "🪞",
    tag: "Metakognisi",
    desc: "Membimbing peserta didik untuk terbiasa memeriksa, menilai, dan merefleksikan hasil karya mereka sendiri sebelum meminta koreksi guru.",
    classroom: "Menyediakan rubrik penilaian diri sederhana dan memberi waktu bagi siswa untuk saling mereviu pekerjaan bersama teman sebaya (peer review).",
    sampleItem: "Di kelas saya, murid memiliki kesempatan untuk menilai sendiri apakah yang mereka lakukan sudah tepat atau belum.",
    color: "#2563EB",
    bgSoft: "#eff6ff",
  },
  {
    id: "question",
    name: "Respek Pertanyaan",
    english: "Question",
    icon: "💡",
    tag: "Keberanian Bertanya",
    desc: "Mendengarkan dengan sabar pertanyaan 'aneh', spontan, dan usulan tak terduga dari murid serta menindaklanjutinya secara serius.",
    classroom: "Tidak menertawakan pertanyaan out-of-the-box siswa; justru mengangkatnya menjadi topik eksplorasi sains atau penyelidikan bersama.",
    sampleItem: "Saya mendengarkan dengan sabar ketika murid mengajukan pertanyaan yang mungkin terdengar tidak biasa.",
    color: "#D97706",
    bgSoft: "#fffbeb",
  },
  {
    id: "opportunities",
    name: "Peluang Aplikasi",
    english: "Opportunities",
    icon: "🚀",
    tag: "Konteks Nyata",
    desc: "Memberi kesempatan kepada peserta didik untuk menerapkan pemahamannya ke dalam konteks baru, situasi nyata, dan kegunaan yang berbeda.",
    classroom: "Mengaitkan materi pelajaran dengan isu lingkungan sekitar atau proyek berbasis komunitas, serta memberi kebebasan bentuk karya akhir.",
    sampleItem: "Saya mendorong murid menggunakan apa yang telah mereka pelajari di kelas untuk mencoba berbagai kegiatan baru.",
    color: "#0891B2",
    bgSoft: "#ecfeff",
  },
  {
    id: "frustration",
    name: "Dukungan Resiliensi",
    english: "Frustration",
    icon: "🌱",
    tag: "Zona Aman Emosi",
    desc: "Mendampingi emosi murid saat mengalami kebuntuan atau kegagalan, dan memandu mereka memandang kesalahan sebagai pupuk pembelajaran.",
    classroom: "Menyediakan waktu konsultasi ketika murid merasa cemas atau frustrasi dengan tugas sulit, serta memulihkan kepercayaan dirinya untuk mencoba lagi.",
    sampleItem: "Saya mendorong murid yang mengalami kegagalan untuk memandang hal itu sebagai proses belajar dan mencari solusi lain.",
    color: "#BE123C",
    bgSoft: "#fff1f2",
  },
];

export default function DimensionsShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = DIMENSIONS_DATA[activeIndex];

  return (
    <section className="py-20 md:py-24 bg-white border-y border-[#E4EBE7]" id="dimensi">
      <div className="max-w-[1180px] mx-auto px-7">
        {/* Section Header */}
        <div className="text-center max-w-[760px] mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 uppercase text-green text-xs font-extrabold tracking-[2px] bg-[#f0f9f2] px-3.5 py-1.5 rounded-full border border-[#cde5d4]">
            KERANGKA PEDAGOGIS CFTINDEX
          </span>
          <h2 className="font-[family-name:var(--font-plus-jakarta)] font-extrabold text-3xl md:text-4xl tracking-tight text-navy mt-4 mb-4">
            9 Dimensi Perilaku Guru Pemupuk Kreativitas
          </h2>
          <p className="text-[#647a7c] text-base leading-relaxed">
            Dikembangkan dari teori kreativitas Arthur Cropley (1997) dan diformulasikan oleh Kay Soh (2000, 2015). 
            Setiap dimensi memetakan kebiasaan mengajar nyata yang terbukti secara empiris memberi ruang bagi lahirnya gagasan orisinal murid.
          </p>
        </div>

        {/* Dimension Pill Selector */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar scroll-smooth">
          {DIMENSIONS_DATA.map((dim, idx) => {
            const isCurrent = idx === activeIndex;
            return (
              <button
                key={dim.id}
                onClick={() => setActiveIndex(idx)}
                className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs md:text-sm font-bold transition-all duration-200 border ${
                  isCurrent
                    ? "bg-navy text-white border-navy shadow-[0_6px_16px_#153a5b22] scale-[1.02]"
                    : "bg-[#f8faf9] text-[#55696d] border-[#e2ece6] hover:border-green hover:bg-white"
                }`}
                aria-pressed={isCurrent}
              >
                <span>{dim.icon}</span>
                <span>{dim.name}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${
                  isCurrent ? "bg-white/20 text-white" : "bg-[#e8f1ec] text-[#3c5458]"
                }`}>
                  {idx + 1}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Dimension Spotlight Card */}
        <div className="bg-[#FAFBF9] border border-[#dcebe0] rounded-3xl p-7 md:p-10 shadow-[0_16px_45px_#153a5b0a] transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 md:gap-12 items-center">
            {/* Left Description */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl p-3 rounded-2xl" style={{ backgroundColor: active.bgSoft }}>
                  {active.icon}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#849394] tracking-wider uppercase">
                      Dimensi {activeIndex + 1} dari 9 · {active.english}
                    </span>
                    <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full" style={{ backgroundColor: active.bgSoft, color: active.color }}>
                      {active.tag}
                    </span>
                  </div>
                  <h3 className="font-[family-name:var(--font-plus-jakarta)] font-extrabold text-2xl md:text-3xl text-navy">
                    {active.name}
                  </h3>
                </div>
              </div>

              <p className="text-[#495e63] text-base md:text-lg leading-relaxed mt-4 mb-6">
                {active.desc}
              </p>

              <div className="bg-white border border-[#e4eee7] rounded-2xl p-5 mb-5 shadow-sm">
                <div className="flex items-start gap-3">
                  <span className="text-green text-lg font-bold shrink-0 mt-0.5">💡</span>
                  <div>
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-navy mb-1">
                      Penerapan Nyata di Ruang Kelas:
                    </h4>
                    <p className="text-sm text-[#5f7377] leading-relaxed">
                      {active.classroom}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs font-semibold text-[#74878a]">
                <span>✓ Terdiri dari 5 butir pernyataan spesifik</span>
                <span>✓ Skala Likert frekuensi 1–5</span>
              </div>
            </div>

            {/* Right Interactive Example Card */}
            <div className="bg-white border-2 border-dashed border-[#cbe0d2] rounded-2xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#eef7f1] text-green text-[11px] font-extrabold px-3 py-1 rounded-bl-xl border-l border-b border-[#cbe0d2]">
                CONTOH BUTIR ASESMEN
              </div>

              <div>
                <span className="text-xs font-extrabold text-green uppercase tracking-wider block mb-2">
                  Cuplikan Instrumen
                </span>
                <blockquote className="font-[family-name:var(--font-plus-jakarta)] font-bold text-lg md:text-xl text-navy leading-snug mb-5">
                  &ldquo;{active.sampleItem}&rdquo;
                </blockquote>
                <p className="text-xs text-[#718588] leading-relaxed mb-6">
                  Guru merefleksikan seberapa sering perilaku ini dipraktikkan dalam keseharian mengajar: dari <em>1 (Sangat Tidak Setuju / Tidak Pernah)</em> hingga <em>5 (Sangat Setuju / Selalu)</em>.
                </p>
              </div>

              {/* Sample Likert Pills */}
              <div className="grid grid-cols-5 gap-1.5 text-center pt-4 border-t border-[#edf3ef]">
                {["1", "2", "3", "4", "5"].map((num) => (
                  <div
                    key={num}
                    className="p-2 rounded-xl bg-[#f7fbf8] border border-[#dbe6df] text-xs font-bold text-navy"
                  >
                    <div className="text-[13px] font-extrabold text-green">{num}</div>
                    <div className="text-[9px] text-[#869799] mt-0.5 hidden sm:block">
                      {num === "1" ? "Rendah" : num === "5" ? "Tinggi" : "Netral"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 9 Dimensi Summary Grid Footer */}
        <div className="grid grid-cols-3 md:grid-cols-9 gap-2 mt-6">
          {DIMENSIONS_DATA.map((item, i) => (
            <button
              key={item.id}
              onClick={() => setActiveIndex(i)}
              className={`p-3 rounded-2xl border text-center transition-all ${
                i === activeIndex
                  ? "bg-navy text-white border-navy"
                  : "bg-white text-[#5c6e73] border-[#e2ebe5] hover:border-green hover:bg-[#f6fbf8]"
              }`}
            >
              <div className="text-lg mb-1">{item.icon}</div>
              <div className="text-[11px] font-extrabold truncate">{item.name}</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
