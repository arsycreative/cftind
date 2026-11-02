"use client";

import { useState } from "react";
import Link from "next/link";

const SAMPLE_QUESTIONS = [
  {
    id: 1,
    dimension: "Kemandirian (Independence)",
    text: "Saya memberikan pertanyaan terbuka kepada murid saya agar mereka menemukan jawabannya sendiri.",
    hint: "Refleksikan kebiasaan Anda ketika murid meminta bantuan untuk menyelesaikan persoalan.",
  },
  {
    id: 2,
    dimension: "Penundaan Penilaian (Judgement)",
    text: "Ketika murid memiliki ide yang belum matang, saya mengajaknya mengeksplorasi lebih jauh sebelum memberikan penilaian.",
    hint: "Refleksikan bagaimana reaksi pertama Anda saat mendengar ide yang terdengar berbeda atau tidak biasa.",
  },
  {
    id: 3,
    dimension: "Dukungan Resiliensi (Frustration)",
    text: "Saya membantu murid memandang kegagalan dan kesalahan sebagai bagian alami dari proses belajar.",
    hint: "Refleksikan suasana psikologis di kelas saat ada karya atau tugas murid yang belum berhasil.",
  },
];

const SCALE_OPTIONS = [
  { val: 1, label: "Sangat Tidak Setuju" },
  { val: 2, label: "Tidak Setuju" },
  { val: 3, label: "Ragu-ragu / Kadang-kadang" },
  { val: 4, label: "Setuju" },
  { val: 5, label: "Sangat Setuju" },
];

export default function InteractiveReflection() {
  const [currentStep, setCurrentStep] = useState(0); // 0, 1, 2 = questions, 3 = completion
  const [answers, setAnswers] = useState({});

  const handleSelect = (qIndex, val) => {
    setAnswers((prev) => ({ ...prev, [qIndex]: val }));
  };

  const handleNext = () => {
    if (!answers[currentStep]) return;
    if (currentStep < SAMPLE_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(3); // summary
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentStep(0);
  };

  const isDone = currentStep === 3;
  const currentQ = SAMPLE_QUESTIONS[currentStep];

  return (
    <section className="py-20 md:py-24 bg-[#f6faf7] relative overflow-hidden" id="simulasi">
      {/* Decorative background circle */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#e3f2e8] opacity-50 blur-2xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#fdeecf] opacity-50 blur-2xl pointer-events-none" />

      <div className="max-w-[920px] mx-auto px-7 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 uppercase text-green text-xs font-extrabold tracking-[2px] bg-white px-3.5 py-1.5 rounded-full border border-[#cde5d4] shadow-sm">
            ✦ SIMULASI REFLEKSI INTERAKTIF
          </span>
          <h2 className="font-[family-name:var(--font-plus-jakarta)] font-extrabold text-3xl md:text-4xl tracking-tight text-navy mt-4 mb-3">
            Rasakan Pengalaman Pengisian CFTInd
          </h2>
          <p className="text-[#647a7c] text-base max-w-[620px] mx-auto leading-relaxed">
            Cobalah 3 butir pernyataan ilustratif berikut untuk merasakan langsung bagaimana instrumen ini memandu refleksi profesional Anda.
          </p>
        </div>

        {/* Reflection Box Container */}
        <div className="bg-white border border-[#dcebe0] rounded-[28px] p-7 md:p-10 shadow-[0_20px_50px_#153a5b0c]">
          {!isDone ? (
            <div>
              {/* Header inside widget */}
              <div className="flex flex-wrap justify-between items-center gap-3 pb-4 border-b border-[#eef3f0]">
                <div className="flex items-center gap-2 text-xs font-bold text-[#718588]">
                  <span className="w-6 h-6 rounded-full bg-[#e8f6ed] text-green grid place-items-center font-extrabold text-[11px]">
                    {currentStep + 1}
                  </span>
                  <span>Butir Refleksi {currentStep + 1} dari {SAMPLE_QUESTIONS.length}</span>
                </div>
                <span className="text-xs font-extrabold text-green bg-[#f0f9f2] px-3 py-1 rounded-full border border-[#cde5d4]">
                  {currentQ.dimension}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1.5 bg-[#edf3ef] rounded-full my-6 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green to-yellow transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / SAMPLE_QUESTIONS.length) * 100}%` }}
                />
              </div>

              {/* Statement Prompt */}
              <div className="my-6">
                <blockquote className="font-[family-name:var(--font-plus-jakarta)] font-bold text-xl md:text-2xl text-navy leading-relaxed">
                  &ldquo;{currentQ.text}&rdquo;
                </blockquote>
                <p className="text-xs text-[#7d9093] mt-2 italic">
                  💡 {currentQ.hint}
                </p>
              </div>

              {/* Scale Choices (Likert 1-5) */}
              <div className="space-y-2.5 my-7" role="radiogroup" aria-label="Pilihan skala Likert">
                {SCALE_OPTIONS.map((opt) => {
                  const isSelected = answers[currentStep] === opt.val;
                  return (
                    <button
                      key={opt.val}
                      type="button"
                      onClick={() => handleSelect(currentStep, opt.val)}
                      className={`w-full flex items-center justify-between p-3.5 md:p-4 rounded-xl border text-left transition-all duration-150 ${
                        isSelected
                          ? "bg-[#eef8f2] border-green text-navy font-bold shadow-sm"
                          : "bg-white border-[#dce8e0] text-[#4b5f63] hover:border-green/60 hover:bg-[#fafdfb]"
                      }`}
                      aria-checked={isSelected}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-6 h-6 rounded-full border grid place-items-center text-xs font-bold transition-colors ${
                            isSelected
                              ? "bg-green border-green text-white"
                              : "border-[#b5c7bd] text-[#718588]"
                          }`}
                        >
                          {isSelected ? "✓" : opt.val}
                        </span>
                        <span className="text-sm md:text-base">{opt.label}</span>
                      </div>
                      <span className="text-xs font-extrabold text-[#788e91]">
                        Skor: {opt.val}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between pt-5 border-t border-[#edf3ef]">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={currentStep === 0}
                  className="px-5 py-2.5 rounded-xl border border-[#d6e3dc] text-sm font-bold text-[#576b6e] hover:bg-[#f6f8f7] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  ← Sebelumnya
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!answers[currentStep]}
                  className="inline-flex items-center gap-2 bg-green text-white text-sm font-extrabold px-6 py-2.5 rounded-xl hover:bg-green-light disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-[0_4px_12px_#278c5722]"
                >
                  {currentStep === SAMPLE_QUESTIONS.length - 1 ? "Lihat Refleksi Selesai ✓" : "Berikutnya →"}
                </button>
              </div>
            </div>
          ) : (
            /* Completion Card */
            <div className="text-center py-6 animate-fade-in-up">
              <div className="w-16 h-16 rounded-full bg-[#e8f6ed] text-green text-3xl grid place-items-center mx-auto mb-4">
                🌱
              </div>
              <h3 className="font-[family-name:var(--font-plus-jakarta)] font-extrabold text-2xl md:text-3xl text-navy mb-2">
                Terima Kasih Telah Merefleksikan!
              </h3>
              <p className="text-[#647a7c] text-sm md:text-base max-w-[580px] mx-auto leading-relaxed mb-6">
                Ketiga butir tadi menggambarkan bagaimana hal-hal sederhana—seperti menahan kritik dini atau memberi pertanyaan terbuka—menjadi pupuk utama bagi kreativitas peserta didik.
              </p>

              {/* Summary Badges */}
              <div className="bg-[#f7fbf8] border border-[#dbe6df] rounded-2xl p-5 max-w-[500px] mx-auto text-left mb-8">
                <div className="text-xs font-extrabold uppercase tracking-wider text-green mb-3">
                  Ringkasan Jawaban Simulasi Anda:
                </div>
                <div className="space-y-2 text-xs text-[#52666a]">
                  {SAMPLE_QUESTIONS.map((q, idx) => (
                    <div key={q.id} className="flex justify-between items-center py-1 border-b border-[#edf3ef] last:border-b-0">
                      <span className="truncate pr-4">{idx + 1}. {q.dimension}</span>
                      <span className="font-extrabold text-navy shrink-0">
                        Skor: {answers[idx] || "-"} / 5
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-[#7c9093] mt-3 leading-relaxed">
                  *Simulasi ini hanya demonstrasi antarmuka dan tidak disimpan ke database riset.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-5 py-3 rounded-xl border border-[#d8e4dd] text-sm font-bold text-navy hover:bg-[#f6faf8] transition-all"
                >
                  ↺ Coba Lagi
                </button>

                <Link
                  href="/isi"
                  className="inline-flex items-center gap-2 bg-green text-white font-extrabold px-6 py-3 rounded-xl hover:bg-green-light shadow-[0_8px_20px_#278c5733] hover:-translate-y-0.5 transition-all text-sm"
                >
                  Mulai Kuesioner Resmi (45 Butir) ↗
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
