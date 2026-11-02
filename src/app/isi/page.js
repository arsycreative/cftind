"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import CFTIndLogo from "@/components/CFTIndLogo";
import Turnstile from "@/components/Turnstile";
import { BUTIR, SKALA } from "@/lib/items";

// Split into 9 pages of 5 items each
const PAGES = Array.from({ length: 9 }, (_, i) => BUTIR.slice(i * 5, i * 5 + 5));

const JENJANG = [
  "PAUD / TK / RA",
  "SD / MI",
  "SMP / MTs",
  "SMA / MA",
  "SMK / MAK",
  "SLB / Pendidikan Khusus",
  "Lainnya",
];
const LAMA_MENGAJAR = ["< 5 tahun", "5–10 tahun", "11–20 tahun", "> 20 tahun"];
const JENIS_KELAMIN = ["Laki-laki", "Perempuan", "Memilih tidak menjawab"];
const RENTANG_USIA = ["< 25 tahun", "25–34 tahun", "35–44 tahun", "45–54 tahun", "≥ 55 tahun"];
const PENDIDIKAN = ["D3 atau setara", "S1 / D4", "S2", "S3"];
const STATUS_SEKOLAH = ["Negeri", "Swasta"];
const PROVINSI = [
  "Aceh","Sumatera Utara","Sumatera Barat","Riau","Kepulauan Riau","Jambi","Sumatera Selatan",
  "Kepulauan Bangka Belitung","Bengkulu","Lampung","DKI Jakarta","Banten","Jawa Barat",
  "Jawa Tengah","DI Yogyakarta","Jawa Timur","Bali","Nusa Tenggara Barat","Nusa Tenggara Timur",
  "Kalimantan Barat","Kalimantan Tengah","Kalimantan Selatan","Kalimantan Timur","Kalimantan Utara",
  "Sulawesi Utara","Gorontalo","Sulawesi Tengah","Sulawesi Barat","Sulawesi Selatan","Sulawesi Tenggara",
  "Maluku","Maluku Utara","Papua","Papua Barat","Papua Barat Daya","Papua Selatan","Papua Tengah","Papua Pegunungan",
];

// ── Stages ──
const STAGE = {
  PENGANTAR: "pengantar",
  CONSENT: "consent",
  PROFIL: "profil",
  PETUNJUK: "petunjuk",
  KUESIONER: "kuesioner",
  TINJAUAN: "tinjauan",
  SELESAI: "selesai",
  DITOLAK: "ditolak",
};

// ── Flow header (top bar for questionnaire) ──
function FlowHeader({ stage, page }) {
  const stageName = {
    [STAGE.PENGANTAR]: "Pengantar",
    [STAGE.CONSENT]: "Persetujuan",
    [STAGE.PROFIL]: "Profil",
    [STAGE.PETUNJUK]: "Petunjuk",
    [STAGE.KUESIONER]: `Bagian ${page + 1} dari 9`,
    [STAGE.TINJAUAN]: "Tinjau & Kirim",
    [STAGE.SELESAI]: "Selesai",
    [STAGE.DITOLAK]: "Selesai",
  }[stage] || "";

  return (
    <header className="h-14 bg-navy flex items-center justify-between px-5 shrink-0 shadow-sm sticky top-0 z-20">
      <Link
        href="/"
        className="text-white/80 text-sm font-semibold flex items-center gap-1.5 hover:text-white transition-colors"
      >
        ← Beranda
      </Link>
      <div className="text-white text-sm font-bold tracking-wide">
        CFTInd · {stageName}
      </div>
      <div className="w-20" />
    </header>
  );
}

// ── Select field ──
function SelectField({ id, label, value, onChange, options, required, hint }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-bold text-navy2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-[#ccd9d4] bg-white text-navy2 rounded-xl px-4 py-3.5 min-h-[48px] focus:outline-none focus:ring-2 focus:ring-green/50 focus:border-green transition"
      >
        <option value="">Pilih…</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
      {hint && <p className="text-xs text-muted">{hint}</p>}
    </div>
  );
}

// ── Main component ──
export default function IsiPage() {
  const [stage, setStage] = useState(STAGE.PENGANTAR);
  const [page, setPage] = useState(0); // 0-8 for questionnaire pages
  const [sessionId, setSessionId] = useState("");
  const [answers, setAnswers] = useState({}); // { "B01": 3, ... }
  const [profil, setProfil] = useState({
    jenjang: "", lama: "", jenis_kelamin: "", usia: "",
    pendidikan: "", status: "", provinsi: "", mapel: "", email: "",
  });
  const [consentChecked, setConsentChecked] = useState(false);
  const [profilErrors, setProfilErrors] = useState({});
  const [highlightEmpty, setHighlightEmpty] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [syncError, setSyncError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");

  // Restore progress from sessionStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = sessionStorage.getItem("cftind_progress");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.session_id) setSessionId(data.session_id);
        if (data.answers) setAnswers(data.answers);
        if (data.profil) setProfil(data.profil);
        if (data.stage && data.stage !== STAGE.PENGANTAR && data.stage !== STAGE.SELESAI) {
          setStage(data.stage);
          if (data.page !== undefined) setPage(data.page);
        }
        if (data.stage === STAGE.SELESAI) setStage(STAGE.SELESAI);
      } catch {}
    }
  }, []);

  const saveProgress = useCallback((newStage, newPage, newAnswers, newProfil, newSessionId) => {
    if (typeof window === "undefined") return;
    sessionStorage.setItem("cftind_progress", JSON.stringify({
      stage: newStage,
      page: newPage,
      answers: newAnswers,
      profil: newProfil,
      session_id: newSessionId || sessionId,
    }));
  }, [sessionId]);

  const currentButir = PAGES[page]; // array of 5 butir for current page
  const answeredOnPage = currentButir
    ? currentButir.filter((b) => answers[b.kode] !== undefined).length
    : 0;
  const totalAnswered = Object.keys(answers).length;

  // Validate profil
  const validateProfil = () => {
    const errors = {};
    if (!profil.jenjang) errors.jenjang = "Wajib diisi";
    if (!profil.lama) errors.lama = "Wajib diisi";
    if (!profil.status) errors.status = "Wajib diisi";
    if (!profil.provinsi) errors.provinsi = "Wajib diisi";
    return errors;
  };

  // Navigation helper
  const goto = (newStage, newPage = page) => {
    setStage(newStage);
    setPage(newPage);
    saveProgress(newStage, newPage, answers, profil, sessionId);
    if (typeof window !== "undefined") window.scrollTo(0, 0);
  };

  // ── STAGE: PENGANTAR ──
  if (stage === STAGE.PENGANTAR) {
    return (
      <div className="min-h-screen flex flex-col bg-[#f4f7f5]">
        <FlowHeader stage={stage} page={page} />
        <main className="flex-1 max-w-[760px] w-full mx-auto px-5 py-10">
          <div className="bg-white rounded-2xl border border-[#e2eae6] p-8 md:p-10 shadow-[0_16px_50px_#163a4f08]">
            <span className="uppercase text-green text-xs font-extrabold tracking-widest">Tahap 1 dari 4</span>
            <h1 className="font-[family-name:var(--font-plus-jakarta)] font-extrabold text-3xl text-navy mt-3 mb-2 leading-tight">
              Selamat datang di CFTInd
            </h1>
            <p className="text-muted text-[15px] leading-relaxed mb-6">
              CFTInd adalah platform penelitian yang berfokus pada perilaku guru dalam menumbuhkan kreativitas peserta didik.
            </p>

            <div className="bg-[#eff7f1] border-l-4 border-green rounded-xl p-5 mb-6 text-sm text-[#345c47] leading-relaxed">
              <p className="font-bold mb-2">Informasi Penting</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Studi ini dilaksanakan oleh <strong>Tim Peneliti CFTInd</strong> sebagai bagian dari riset pendidikan.</li>
                <li>Instrumen terdiri dari <strong>45 pernyataan</strong> tentang praktik mengajar Anda, dibagi dalam <strong>9 bagian</strong>.</li>
                <li>Estimasi waktu pengisian: <strong>± 10 menit</strong>.</li>
                <li>Partisipasi bersifat <strong>sukarela</strong> dan Anda dapat menghentikannya kapan saja.</li>
                <li>Data yang dikumpulkan bersifat anonim (tanpa nama, NIK, atau nomor telepon).</li>
                <li>Hasil analisis akan digunakan semata-mata untuk keperluan penelitian ilmiah.</li>
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm mb-6">
              <div className="bg-[#f5f9f6] rounded-xl p-4">
                <div className="text-2xl font-extrabold text-navy">45</div>
                <div className="text-muted text-xs mt-1">pernyataan</div>
              </div>
              <div className="bg-[#f5f9f6] rounded-xl p-4">
                <div className="text-2xl font-extrabold text-navy">±10</div>
                <div className="text-muted text-xs mt-1">menit estimasi</div>
              </div>
            </div>

            <div className="flex gap-3 flex-wrap">
              <button
                id="btn-pengantar-lanjut"
                onClick={() => goto(STAGE.CONSENT)}
                className="inline-flex items-center gap-2 bg-green text-white font-extrabold px-6 py-3.5 rounded-[13px] shadow-[0_8px_20px_#278c5722] hover:-translate-y-0.5 hover:bg-green-light transition-all duration-200"
              >
                Lanjutkan →
              </button>
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-[#f0f3f3] text-navy font-extrabold px-6 py-3.5 rounded-[13px] hover:-translate-y-0.5 transition-all duration-200"
              >
                ← Kembali
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // ── STAGE: CONSENT ──
  if (stage === STAGE.CONSENT) {
    return (
      <div className="min-h-screen flex flex-col bg-[#f4f7f5]">
        <FlowHeader stage={stage} page={page} />
        <main className="flex-1 max-w-[760px] w-full mx-auto px-5 py-10">
          <div className="bg-white rounded-2xl border border-[#e2eae6] p-8 md:p-10 shadow-[0_16px_50px_#163a4f08]">
            <span className="uppercase text-green text-xs font-extrabold tracking-widest">Tahap 2 dari 4</span>
            <h1 className="font-[family-name:var(--font-plus-jakarta)] font-extrabold text-2xl text-navy mt-3 mb-4">
              Persetujuan Partisipasi
            </h1>

            <div className="bg-[#f9fbfa] border border-[#dce8e0] rounded-xl p-6 text-sm text-[#3a4e4a] leading-[1.8] mb-5 max-h-72 overflow-y-auto">
              <p className="font-bold mb-3">NASKAH INFORMED CONSENT · Versi 1.0</p>
              <p>Saya diundang untuk berpartisipasi dalam penelitian yang berjudul <strong>"Perilaku Guru dalam Menumbuhkan Kreativitas Peserta Didik"</strong> yang dilaksanakan oleh Tim CFTInd.</p>
              <br />
              <p><strong>Tujuan penelitian:</strong> Mendeskripsikan dan memetakan perilaku mengajar guru yang mendukung tumbuhnya kreativitas peserta didik di berbagai jenjang pendidikan di Indonesia.</p>
              <br />
              <p><strong>Prosedur:</strong> Saya akan mengisi kuesioner daring yang terdiri dari 45 pernyataan tentang praktik mengajar saya, membutuhkan waktu ± 10 menit.</p>
              <br />
              <p><strong>Kerahasiaan:</strong> Tidak ada nama, NIK, atau nomor telepon yang dikumpulkan. Data profil yang dikumpulkan bersifat demografis (jenjang, lama mengajar, status sekolah, dll.) dan tidak dapat mengidentifikasi saya secara langsung. Semua data disimpan dengan aman dan hanya diakses oleh tim peneliti yang berwenang.</p>
              <br />
              <p><strong>Hak saya:</strong> Partisipasi bersifat sukarela. Saya dapat menghentikan pengisian kapan saja tanpa konsekuensi negatif apa pun. Saya juga berhak meminta penghapusan data pengisian saya melalui kontak peneliti.</p>
              <br />
              <p><strong>Penyimpanan data:</strong> Data disimpan di server terenkripsi selama masa studi dan hingga 5 tahun setelahnya sesuai ketentuan akademik dan institusi.</p>
              <br />
              <p className="text-xs text-muted">CFTInd · Naskah persetujuan versi 1.0 · Terakhir diperbarui November 2026</p>
            </div>

            <label className="flex gap-3 items-start border border-[#d8e5dc] rounded-xl p-4 cursor-pointer hover:border-green transition-colors mb-6">
              <input
                id="consent-check"
                type="checkbox"
                checked={consentChecked}
                onChange={(e) => setConsentChecked(e.target.checked)}
                className="mt-0.5 w-5 h-5 accent-green shrink-0"
              />
              <span className="text-sm text-navy2 leading-[1.6]">
                Saya telah membaca, memahami, dan <strong>bersedia berpartisipasi</strong> dalam penelitian ini sesuai ketentuan yang diuraikan di atas.
              </span>
            </label>

            <div className="mb-5">
              <Turnstile onVerify={(t) => setTurnstileToken(t)} />
            </div>

            <div className="flex gap-3 flex-wrap">
              <button
                id="btn-consent-lanjut"
                disabled={!consentChecked}
                onClick={() => goto(STAGE.PROFIL)}
                className="inline-flex items-center gap-2 bg-green text-white font-extrabold px-6 py-3.5 rounded-[13px] disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_8px_20px_#278c5722] hover:enabled:-translate-y-0.5 hover:enabled:bg-green-light transition-all duration-200"
              >
                Saya Setuju, Lanjutkan →
              </button>
              <button
                id="btn-consent-tolak"
                onClick={() => setStage(STAGE.DITOLAK)}
                className="inline-flex items-center gap-2 bg-[#f0f3f3] text-muted font-bold px-6 py-3.5 rounded-[13px] hover:-translate-y-0.5 transition-all duration-200 text-sm"
              >
                Saya tidak bersedia
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // ── STAGE: DITOLAK ──
  if (stage === STAGE.DITOLAK) {
    return (
      <div className="min-h-screen flex flex-col bg-[#f4f7f5]">
        <FlowHeader stage={stage} page={page} />
        <main className="flex-1 max-w-[760px] w-full mx-auto px-5 py-16 flex items-center">
          <div className="bg-white rounded-2xl border border-[#e2eae6] p-10 text-center shadow-[0_16px_50px_#163a4f08] w-full">
            <div className="text-5xl mb-4">🌱</div>
            <h1 className="font-[family-name:var(--font-plus-jakarta)] font-extrabold text-2xl text-navy mb-3">
              Terima kasih atas perhatian Anda
            </h1>
            <p className="text-muted leading-relaxed mb-6 max-w-md mx-auto">
              Anda memilih untuk tidak berpartisipasi. Tidak ada data yang disimpan.
              Kami sangat menghargai keputusan Anda.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-green text-white font-extrabold px-6 py-3.5 rounded-[13px]"
            >
              ← Kembali ke Beranda
            </Link>
          </div>
        </main>
      </div>
    );
  }

  // ── STAGE: PROFIL ──
  if (stage === STAGE.PROFIL) {
    const handleProfilChange = (field, val) => {
      setProfil((p) => ({ ...p, [field]: val }));
      setProfilErrors((e) => ({ ...e, [field]: undefined }));
    };

    const handleProfilNext = async () => {
      const errors = validateProfil();
      if (Object.keys(errors).length > 0) {
        setProfilErrors(errors);
        return;
      }

      setSubmitting(true);
      setSyncError("");
      try {
        const res = await fetch("/api/isi/mulai", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            profil,
            session_id: sessionId || undefined,
            turnstile_token: turnstileToken,
          }),
        });
        if (res.ok) {
          const json = await res.json();
          if (json.session_id) {
            setSessionId(json.session_id);
            saveProgress(STAGE.PETUNJUK, 0, answers, profil, json.session_id);
          }
        }
      } catch (err) {
        console.error("Gagal memulai sesi di server:", err);
      } finally {
        setSubmitting(false);
        goto(STAGE.PETUNJUK);
      }
    };

    return (
      <div className="min-h-screen flex flex-col bg-[#f4f7f5]">
        <FlowHeader stage={stage} page={page} />
        <main className="flex-1 max-w-[760px] w-full mx-auto px-5 py-10">
          <div className="bg-white rounded-2xl border border-[#e2eae6] p-8 md:p-10 shadow-[0_16px_50px_#163a4f08]">
            <span className="uppercase text-green text-xs font-extrabold tracking-widest">Tahap 3 dari 4</span>
            <h1 className="font-[family-name:var(--font-plus-jakarta)] font-extrabold text-2xl text-navy mt-3 mb-1">
              Profil Guru
            </h1>
            <p className="text-muted text-sm mb-6">
              Isi profil singkat untuk melengkapi data penelitian. Tidak ada informasi identitas langsung yang dikumpulkan.
              Kolom bertanda <span className="text-red-500">*</span> wajib diisi.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SelectField
                id="profil-jenjang"
                label="Jenjang mengajar"
                value={profil.jenjang}
                onChange={(v) => handleProfilChange("jenjang", v)}
                options={JENJANG}
                required
              />
              {profilErrors.jenjang && (
                <p className="text-red-500 text-xs col-span-full -mt-2">{profilErrors.jenjang}</p>
              )}

              <SelectField
                id="profil-lama"
                label="Pengalaman mengajar"
                value={profil.lama}
                onChange={(v) => handleProfilChange("lama", v)}
                options={LAMA_MENGAJAR}
                required
              />
              {profilErrors.lama && (
                <p className="text-red-500 text-xs col-span-full -mt-2">{profilErrors.lama}</p>
              )}

              <SelectField
                id="profil-status"
                label="Status satuan pendidikan"
                value={profil.status}
                onChange={(v) => handleProfilChange("status", v)}
                options={STATUS_SEKOLAH}
                required
              />
              {profilErrors.status && (
                <p className="text-red-500 text-xs col-span-full -mt-2">{profilErrors.status}</p>
              )}

              <SelectField
                id="profil-provinsi"
                label="Provinsi"
                value={profil.provinsi}
                onChange={(v) => handleProfilChange("provinsi", v)}
                options={PROVINSI}
                required
              />
              {profilErrors.provinsi && (
                <p className="text-red-500 text-xs col-span-full -mt-2">{profilErrors.provinsi}</p>
              )}

              <SelectField
                id="profil-jenis_kelamin"
                label="Jenis kelamin"
                value={profil.jenis_kelamin}
                onChange={(v) => handleProfilChange("jenis_kelamin", v)}
                options={JENIS_KELAMIN}
              />

              <SelectField
                id="profil-usia"
                label="Rentang usia"
                value={profil.usia}
                onChange={(v) => handleProfilChange("usia", v)}
                options={RENTANG_USIA}
              />

              <SelectField
                id="profil-pendidikan"
                label="Pendidikan terakhir"
                value={profil.pendidikan}
                onChange={(v) => handleProfilChange("pendidikan", v)}
                options={PENDIDIKAN}
              />

              <div className="flex flex-col gap-1.5">
                <label htmlFor="profil-mapel" className="text-sm font-bold text-navy2">
                  Mata pelajaran / guru kelas <span className="text-muted font-normal text-xs">(opsional)</span>
                </label>
                <input
                  id="profil-mapel"
                  type="text"
                  value={profil.mapel}
                  onChange={(e) => handleProfilChange("mapel", e.target.value)}
                  placeholder="Mis. Matematika, Guru Kelas"
                  className="border border-[#ccd9d4] bg-white text-navy2 rounded-xl px-4 py-3.5 min-h-[48px] focus:outline-none focus:ring-2 focus:ring-green/50 focus:border-green transition text-sm"
                />
              </div>

              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label htmlFor="profil-email" className="text-sm font-bold text-navy2">
                  Email <span className="text-muted font-normal text-xs">(opsional, bila bersedia menerima kabar hasil studi)</span>
                </label>
                <input
                  id="profil-email"
                  type="email"
                  value={profil.email}
                  onChange={(e) => handleProfilChange("email", e.target.value)}
                  placeholder="nama@email.com"
                  className="border border-[#ccd9d4] bg-white text-navy2 rounded-xl px-4 py-3.5 min-h-[48px] focus:outline-none focus:ring-2 focus:ring-green/50 focus:border-green transition text-sm"
                />
              </div>
            </div>

            <div className="flex gap-3 flex-wrap mt-8">
              <button
                id="btn-profil-lanjut"
                disabled={submitting}
                onClick={handleProfilNext}
                className="inline-flex items-center gap-2 bg-green text-white font-extrabold px-6 py-3.5 rounded-[13px] shadow-[0_8px_20px_#278c5722] hover:-translate-y-0.5 hover:bg-green-light transition-all duration-200 disabled:opacity-50"
              >
                {submitting ? "Memproses…" : "Lanjutkan →"}
              </button>
              <button
                onClick={() => goto(STAGE.CONSENT)}
                className="inline-flex items-center gap-2 bg-[#f0f3f3] text-navy font-extrabold px-6 py-3.5 rounded-[13px] hover:-translate-y-0.5 transition-all duration-200 text-sm"
              >
                ← Kembali
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // ── STAGE: PETUNJUK ──
  if (stage === STAGE.PETUNJUK) {
    return (
      <div className="min-h-screen flex flex-col bg-[#f4f7f5]">
        <FlowHeader stage={stage} page={page} />
        <main className="flex-1 max-w-[760px] w-full mx-auto px-5 py-10">
          <div className="bg-white rounded-2xl border border-[#e2eae6] p-8 md:p-10 shadow-[0_16px_50px_#163a4f08]">
            <span className="uppercase text-green text-xs font-extrabold tracking-widest">Tahap 4 dari 4</span>
            <h1 className="font-[family-name:var(--font-plus-jakarta)] font-extrabold text-2xl text-navy mt-3 mb-4">
              Petunjuk Pengisian
            </h1>

            <div className="bg-[#eff7f1] rounded-xl p-5 mb-6 text-sm text-[#345c47] leading-relaxed border border-[#c8e6d4]">
              <p className="font-bold mb-2">⚠️ Prinsip Pengisian</p>
              <p>
                Jawablah <strong>sesuai dengan yang benar-benar Anda lakukan</strong> dalam proses pembelajaran,
                bukan berdasarkan apa yang dianggap ideal atau seharusnya dilakukan.{" "}
                <strong>Tidak ada jawaban benar maupun salah.</strong>
              </p>
            </div>

            <p className="text-muted text-sm leading-relaxed mb-5">
              Untuk setiap pernyataan, pilih <strong>satu</strong> skala angka yang paling menggambarkan seberapa sering Anda melakukan perilaku yang disebutkan:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-6">
              {SKALA.map((s) => (
                <div key={s.value} className="bg-[#f5f9f6] rounded-xl p-3 text-center border border-[#e2eae6]">
                  <div className="text-2xl font-extrabold text-navy">{s.value}</div>
                  <div className="text-xs text-muted mt-1 leading-tight">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Example question */}
            <div className="border border-[#dcebe0] rounded-xl p-5 mb-6 bg-[#fbfdfc]">
              <p className="text-xs font-extrabold text-green uppercase tracking-wider mb-2">Contoh pernyataan</p>
              <p className="font-semibold text-navy2 mb-4 text-sm leading-relaxed">
                Saya mendorong murid untuk menunjukkan kepada saya apa yang telah mereka pelajari secara mandiri.
              </p>
              <div className="flex gap-2 flex-wrap">
                {SKALA.map((s) => (
                  <button
                    key={s.value}
                    className={`flex items-center gap-2 border-2 rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                      s.value === 4
                        ? "border-green bg-[#eef8f1] text-green"
                        : "border-[#dce6e1] text-muted"
                    }`}
                    tabIndex={-1}
                  >
                    <span className={`w-5 h-5 rounded-full grid place-items-center text-xs font-extrabold ${
                      s.value === 4 ? "bg-green text-white" : "bg-[#edf0ef] text-muted"
                    }`}>
                      {s.value === 4 ? "✓" : s.value}
                    </span>
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 flex-wrap">
              <button
                id="btn-petunjuk-mulai"
                onClick={() => goto(STAGE.KUESIONER, 0)}
                className="inline-flex items-center gap-2 bg-green text-white font-extrabold px-6 py-3.5 rounded-[13px] shadow-[0_8px_20px_#278c5722] hover:-translate-y-0.5 hover:bg-green-light transition-all duration-200"
              >
                Mulai Mengisi (Bagian 1) →
              </button>
              <button
                onClick={() => goto(STAGE.PROFIL)}
                className="inline-flex items-center gap-2 bg-[#f0f3f3] text-navy font-extrabold px-6 py-3.5 rounded-[13px] hover:-translate-y-0.5 transition-all duration-200 text-sm"
              >
                ← Kembali
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // ── STAGE: KUESIONER ──
  if (stage === STAGE.KUESIONER) {
    const setAnswer = (kode, value) => {
      const newAnswers = { ...answers, [kode]: value };
      setAnswers(newAnswers);
      setHighlightEmpty(false);
      saveProgress(stage, page, newAnswers, profil, sessionId);

      // Autosave debounced
      if (sessionId) {
        fetch("/api/isi/simpan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            session_id: sessionId,
            page,
            answers: { [kode]: value },
          }),
        }).catch(() => {});
      }
    };

    const handleNext = async () => {
      // Check all 5 answered on current page
      const unanswered = currentButir.filter((b) => answers[b.kode] === undefined);
      if (unanswered.length > 0) {
        setHighlightEmpty(true);
        const el = document.getElementById(`butir-${unanswered[0].kode}`);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }

      // Save page answers to backend
      if (sessionId) {
        const pageAnswers = {};
        currentButir.forEach((b) => {
          pageAnswers[b.kode] = answers[b.kode];
        });

        try {
          const res = await fetch("/api/isi/simpan", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              session_id: sessionId,
              page,
              answers: pageAnswers,
            }),
          });
          if (!res.ok) {
            setSyncError("Jawaban belum tersimpan karena koneksi bermasalah. Pilihan Anda masih ada di layar. Silakan coba lagi.");
          } else {
            setSyncError("");
          }
        } catch {
          setSyncError("Jawaban belum tersimpan karena koneksi bermasalah. Pilihan Anda masih ada di layar. Silakan coba lagi.");
        }
      }

      if (page < 8) {
        goto(STAGE.KUESIONER, page + 1);
      } else {
        goto(STAGE.TINJAUAN);
      }
    };

    const handleBack = () => {
      if (page > 0) {
        goto(STAGE.KUESIONER, page - 1);
      } else {
        goto(STAGE.PETUNJUK);
      }
    };

    return (
      <div className="min-h-screen flex flex-col bg-[#f4f7f5]">
        <FlowHeader stage={stage} page={page} />
        <main className="flex-1 max-w-[760px] w-full mx-auto px-5 py-8">
          <div className="bg-white rounded-2xl border border-[#e2eae6] p-6 md:p-8 shadow-[0_16px_50px_#163a4f08]">
            {/* Section header */}
            <div className="flex justify-between items-center mb-1 text-sm font-bold">
              <span className="text-green uppercase tracking-wider text-xs">Bagian {page + 1} dari 9</span>
              <span className="text-muted text-xs">{totalAnswered} / 45 butir terjawab</span>
            </div>

            {/* Progress bar */}
            <div className="h-2.5 bg-[#e2eee6] rounded-full overflow-hidden mb-6">
              <div
                className="h-full bg-gradient-to-r from-green to-yellow rounded-full transition-all duration-300"
                style={{ width: `${Math.round((totalAnswered / 45) * 100)}%` }}
              />
            </div>

            {/* Offline / connection notice */}
            {syncError && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-5 text-sm text-amber-800 flex items-start gap-2.5">
                <span className="text-lg">⚠️</span>
                <div>
                  <p className="font-bold">Pemberitahuan Penyimpanan</p>
                  <p className="text-xs mt-0.5">{syncError}</p>
                </div>
              </div>
            )}

            {highlightEmpty && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 mb-5 text-sm text-amber-800">
                Mohon pilih satu jawaban untuk setiap butir pernyataan di bagian ini sebelum melanjutkan.
              </div>
            )}

            {/* Questions list (5 items) */}
            <div className="space-y-6">
              {currentButir.map((butir, idx) => {
                const isAnswered = answers[butir.kode] !== undefined;
                const isEmpty = highlightEmpty && !isAnswered;
                return (
                  <div
                    key={butir.kode}
                    id={`butir-${butir.kode}`}
                    className={`rounded-2xl p-5 border-2 transition-all duration-200 ${
                      isEmpty
                        ? "border-amber-300 bg-amber-50"
                        : isAnswered
                        ? "border-[#c8e6d4] bg-[#f8fbf9]"
                        : "border-[#e2eae6] bg-[#fafbfa]"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-xs font-extrabold text-muted uppercase tracking-wider">
                        Pernyataan {page * 5 + idx + 1} dari 45
                      </p>
                      {isAnswered && (
                        <span className="text-green text-xs font-extrabold">✓ Terjawab</span>
                      )}
                    </div>
                    <p className="font-semibold text-navy2 text-[15px] leading-[1.6] mb-4">
                      {butir.teks}
                    </p>

                    {isEmpty && (
                      <p className="text-amber-700 text-xs font-bold mb-2">
                        Mohon pilih satu jawaban untuk butir ini.
                      </p>
                    )}

                    {/* Scale buttons */}
                    <div
                      role="radiogroup"
                      aria-label={`Pilihan untuk pernyataan ${page * 5 + idx + 1}`}
                      className="grid grid-cols-1 sm:grid-cols-5 gap-2"
                    >
                      {SKALA.map((s) => {
                        const selected = answers[butir.kode] === s.value;
                        return (
                          <button
                            key={s.value}
                            type="button"
                            role="radio"
                            aria-checked={selected}
                            onClick={() => setAnswer(butir.kode, s.value)}
                            className={`flex sm:flex-col items-center gap-2.5 sm:gap-1.5 border-2 rounded-xl px-4 sm:px-2 py-3 sm:py-2.5 text-sm font-bold transition-all duration-150 hover:border-green/60 min-h-[44px] ${
                              selected
                                ? "border-green bg-[#eef8f1] text-green shadow-[0_4px_12px_#278c5722]"
                                : "border-[#dce6e1] bg-white text-muted hover:bg-[#f5fbf7]"
                            }`}
                          >
                            <span
                              className={`w-6 h-6 shrink-0 rounded-full grid place-items-center text-xs font-extrabold ${
                                selected ? "bg-green text-white" : "bg-[#edf0ef] text-muted"
                              }`}
                            >
                              {selected ? "✓" : s.value}
                            </span>
                            <span className="text-xs text-center leading-tight">{s.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8 gap-3">
              <button
                id="btn-kuesioner-back"
                onClick={handleBack}
                className="inline-flex items-center gap-2 bg-[#f0f3f3] text-navy font-extrabold px-5 py-3.5 rounded-[13px] hover:-translate-y-0.5 transition-all duration-200 text-sm"
              >
                ← Kembali
              </button>
              <button
                id="btn-kuesioner-next"
                onClick={handleNext}
                className="inline-flex items-center gap-2 bg-green text-white font-extrabold px-6 py-3.5 rounded-[13px] shadow-[0_8px_20px_#278c5722] hover:-translate-y-0.5 hover:bg-green-light transition-all duration-200"
              >
                {page < 8 ? "Bagian Berikutnya →" : "Tinjau & Kirim →"}
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // ── STAGE: TINJAUAN ──
  if (stage === STAGE.TINJAUAN) {
    const allAnswered = BUTIR.every((b) => answers[b.kode] !== undefined);
    const unansweredCount = BUTIR.filter((b) => answers[b.kode] === undefined).length;

    const handleSubmit = async () => {
      if (!allAnswered || submitting) return;
      setSubmitting(true);
      setSyncError("");

      try {
        if (sessionId) {
          const res = await fetch("/api/isi/kirim", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              session_id: sessionId,
              turnstile_token: turnstileToken,
            }),
          });

          if (!res.ok) {
            const data = await res.json();
            setSyncError(data.error || "Gagal mengirimkan pengisian. Silakan coba lagi.");
            setSubmitting(false);
            return;
          }
        }

        sessionStorage.setItem("cftind_progress", JSON.stringify({
          stage: STAGE.SELESAI,
          session_id: sessionId,
          answers,
          profil,
        }));
        goto(STAGE.SELESAI);
      } catch (err) {
        console.error("Gagal submit:", err);
        setSyncError("Gagal mengirimkan karena koneksi internet. Silakan coba lagi.");
      } finally {
        setSubmitting(false);
      }
    };

    return (
      <div className="min-h-screen flex flex-col bg-[#f4f7f5]">
        <FlowHeader stage={stage} page={page} />
        <main className="flex-1 max-w-[760px] w-full mx-auto px-5 py-10">
          <div className="bg-white rounded-2xl border border-[#e2eae6] p-8 md:p-10 shadow-[0_16px_50px_#163a4f08]">
            <span className="uppercase text-green text-xs font-extrabold tracking-widest">Tinjau &amp; Kirim</span>
            <h1 className="font-[family-name:var(--font-plus-jakarta)] font-extrabold text-2xl text-navy mt-3 mb-4">
              Konfirmasi Pengisian
            </h1>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-[#f5f9f6] rounded-xl p-4 text-center">
                <div className="text-3xl font-extrabold text-green">{totalAnswered}</div>
                <div className="text-xs text-muted mt-1">pernyataan terjawab</div>
              </div>
              <div className="bg-[#f5f9f6] rounded-xl p-4 text-center">
                <div className={`text-3xl font-extrabold ${unansweredCount > 0 ? "text-amber-500" : "text-green"}`}>
                  {unansweredCount}
                </div>
                <div className="text-xs text-muted mt-1">belum terjawab</div>
              </div>
              <div className="bg-[#f5f9f6] rounded-xl p-4 text-center">
                <div className="text-3xl font-extrabold text-navy">9</div>
                <div className="text-xs text-muted mt-1">bagian selesai</div>
              </div>
            </div>

            {syncError && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-5 text-sm text-red-800">
                <p className="font-bold">Galat Pengiriman</p>
                <p className="text-xs mt-1">{syncError}</p>
              </div>
            )}

            {!allAnswered && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-5 text-sm text-amber-800">
                <p className="font-bold mb-1">Ada {unansweredCount} pernyataan yang belum dijawab.</p>
                <p>Klik <strong>Periksa Jawaban</strong> untuk kembali dan melengkapi butir yang terlewat.</p>
              </div>
            )}

            {allAnswered && (
              <div className="bg-[#eff7f1] border border-[#c8e6d4] rounded-xl p-4 mb-5 text-sm text-[#345c47]">
                <p className="font-bold">✓ Seluruh 45 pernyataan telah terjawab lengkap.</p>
                <p className="mt-1 text-xs">
                  Setelah menekan <strong>Kirim Jawaban</strong>, jawaban Anda akan direkam dan sesi pengisian akan dikunci.
                </p>
              </div>
            )}

            <div className="mb-6">
              <Turnstile onVerify={(t) => setTurnstileToken(t)} />
            </div>

            <div className="flex gap-3 flex-wrap">
              {!allAnswered && (
                <button
                  onClick={() => {
                    const firstUnanswered = BUTIR.findIndex((b) => answers[b.kode] === undefined);
                    const targetPage = Math.floor(firstUnanswered / 5);
                    goto(STAGE.KUESIONER, targetPage);
                  }}
                  className="inline-flex items-center gap-2 bg-amber-500 text-white font-extrabold px-6 py-3.5 rounded-[13px] hover:-translate-y-0.5 transition-all duration-200"
                >
                  Periksa Jawaban ↗
                </button>
              )}

              <button
                id="btn-kirim"
                disabled={!allAnswered || submitting}
                onClick={handleSubmit}
                className="inline-flex items-center gap-2 bg-green text-white font-extrabold px-6 py-3.5 rounded-[13px] disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_8px_20px_#278c5722] hover:enabled:-translate-y-0.5 hover:enabled:bg-green-light transition-all duration-200"
              >
                {submitting ? "Mengirimkan…" : "Kirim Jawaban ✓"}
              </button>
              <button
                onClick={() => goto(STAGE.KUESIONER, 8)}
                className="inline-flex items-center gap-2 bg-[#f0f3f3] text-navy font-extrabold px-5 py-3.5 rounded-[13px] hover:-translate-y-0.5 transition-all duration-200 text-sm"
              >
                ← Kembali
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // ── STAGE: SELESAI ──
  return (
    <div className="min-h-screen flex flex-col bg-[#f4f7f5]">
      <FlowHeader stage={stage} page={page} />
      <main className="flex-1 max-w-[760px] w-full mx-auto px-5 py-16 flex items-center">
        <div className="bg-white rounded-2xl border border-[#e2eae6] p-10 shadow-[0_16px_50px_#163a4f08] w-full text-center">
          <div className="text-6xl mb-5">🌱</div>
          <h1 className="font-[family-name:var(--font-plus-jakarta)] font-extrabold text-3xl text-navy mb-3">
            Terima kasih atas partisipasi Anda!
          </h1>
          <p className="text-muted leading-relaxed mb-4 max-w-md mx-auto text-sm">
            Pengisian instrumen Anda telah berhasil kami terima. Kontribusi Anda sangat berharga bagi pemetaan dan pengembangan riset perilaku guru dalam menumbuhkan kreativitas peserta didik di Indonesia.
          </p>

          <div className="bg-[#eff7f1] border border-[#c8e6d4] rounded-xl p-5 mb-6 text-sm text-[#345c47] text-left max-w-md mx-auto">
            <p className="font-bold mb-1">Informasi selanjutnya</p>
            <ul className="list-disc pl-5 space-y-1 text-xs leading-relaxed">
              <li>Data Anda telah tersimpan secara aman dalam sistem database terenkripsi.</li>
              <li>Sesuai prinsip etika penelitian, platform saat ini tidak menampilkan skor individual karena adaptasi instrumen sedang dalam tahap pengumpulan data riset.</li>
              <li>Jika Anda mencantumkan email, kami akan memberikan kabar ringkas saat hasil studi telah dipublikasikan.</li>
              <li>Untuk pertanyaan atau hak penghapusan data, silakan hubungi tim melalui halaman <Link href="/kontak" className="text-green font-bold hover:underline">Kontak</Link>.</li>
            </ul>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-green text-white font-extrabold px-6 py-3.5 rounded-[13px] shadow-[0_8px_20px_#278c5722] hover:-translate-y-0.5 transition-all"
          >
            ← Kembali ke Beranda
          </Link>
        </div>
      </main>
    </div>
  );
}
