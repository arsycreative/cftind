"use client";

import { useState } from "react";

export default function AdminEksporPage() {
  const [options, setOptions] = useState({
    include_incomplete: false,
    include_email: false,
    filter_jenjang: "",
    filter_provinsi: "",
    filter_dari: "",
    filter_sampai: "",
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = (key, val) => setOptions((o) => ({ ...o, [key]: val }));

  const handleEkspor = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/admin/ekspor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(options),
      });

      if (res.ok) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `CFTInd_Data_${new Date().toISOString().slice(0, 10)}.xlsx`;
        a.click();
        URL.revokeObjectURL(url);
        setResult({ success: true, message: "File berhasil diunduh." });
      } else {
        const data = await res.json();
        setResult({ success: false, message: data.error || "Ekspor gagal." });
      }
    } catch {
      setResult({ success: false, message: "Terjadi kesalahan koneksi." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-[family-name:var(--font-plus-jakarta)] font-extrabold text-2xl text-navy">
          Ekspor Excel
        </h1>
        <p className="text-muted text-sm mt-1">
          Unduh data mentah dalam format .xlsx siap dianalisis di SPSS, R, JASP, atau Excel.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Options */}
        <div className="bg-white rounded-2xl border border-[#e2eae6] p-6 shadow-sm">
          <h2 className="font-bold text-navy text-sm mb-4 uppercase tracking-wider">Opsi Ekspor</h2>

          <div className="space-y-4">
            {/* Include incomplete */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={options.include_incomplete}
                onChange={(e) => handleChange("include_incomplete", e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-green"
              />
              <span className="text-sm text-navy2 leading-[1.5]">
                Sertakan respons yang belum selesai (<code className="text-xs bg-[#f0f5f2] px-1 rounded">in_progress</code>)
              </span>
            </label>

            {/* Include email */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={options.include_email}
                onChange={(e) => handleChange("include_email", e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-green"
              />
              <span className="text-sm text-navy2 leading-[1.5]">
                Sertakan kolom email (jika ada)
              </span>
            </label>

            {/* Filter jenjang */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-muted uppercase tracking-wider">Filter Jenjang</label>
              <select
                value={options.filter_jenjang}
                onChange={(e) => handleChange("filter_jenjang", e.target.value)}
                className="border border-[#ccd9d4] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green/40 focus:border-green"
              >
                <option value="">Semua jenjang</option>
                {["PAUD / TK / RA","SD / MI","SMP / MTs","SMA / MA","SMK / MAK","SLB / Pendidikan Khusus","Lainnya"].map((j) => (
                  <option key={j} value={j}>{j}</option>
                ))}
              </select>
            </div>

            {/* Filter tanggal */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-muted uppercase tracking-wider">Dari Tanggal</label>
                <input
                  type="date"
                  value={options.filter_dari}
                  onChange={(e) => handleChange("filter_dari", e.target.value)}
                  className="border border-[#ccd9d4] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green/40 focus:border-green"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-muted uppercase tracking-wider">Sampai Tanggal</label>
                <input
                  type="date"
                  value={options.filter_sampai}
                  onChange={(e) => handleChange("filter_sampai", e.target.value)}
                  className="border border-[#ccd9d4] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green/40 focus:border-green"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Info & action */}
        <div className="flex flex-col gap-4">
          {/* File info */}
          <div className="bg-white rounded-2xl border border-[#e2eae6] p-6 shadow-sm">
            <h2 className="font-bold text-navy text-sm mb-4 uppercase tracking-wider">Isi File Excel</h2>
            <div className="space-y-2.5">
              {[
                { sheet: "Data_Lebar", desc: "1 baris = 1 responden. Kolom B01–B45 berisi angka jawaban." },
                { sheet: "Kamus_Variabel", desc: "Nomor butir, kode kolom, dimensi, teks butir, skala." },
                { sheet: "Info_Ekspor", desc: "Filter yang dipakai, jumlah baris, waktu ekspor." },
              ].map((s) => (
                <div key={s.sheet} className="flex gap-3">
                  <code className="text-xs bg-[#eef8f1] text-green px-2 py-1 rounded font-bold shrink-0">{s.sheet}</code>
                  <span className="text-xs text-muted leading-relaxed">{s.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Rules */}
          <div className="bg-[#eff7f1] border border-[#c8e6d4] rounded-2xl p-5 text-xs text-[#345c47] leading-relaxed">
            <p className="font-bold mb-2">Aturan Ekspor</p>
            <ul className="list-disc pl-4 space-y-1">
              <li>Default: hanya data berstatus <strong>selesai</strong></li>
              <li>Nilai teks disanitasi dari karakter formula Excel</li>
              <li>Kolom jawaban berupa <strong>angka</strong> (1–5)</li>
              <li>Ekspor ini dicatat (siapa, kapan, filter apa)</li>
            </ul>
          </div>

          {/* Action */}
          {result && (
            <div className={`rounded-xl p-4 text-sm font-bold ${
              result.success ? "bg-green/10 text-green" : "bg-red-50 text-red-600"
            }`}>
              {result.success ? "✓ " : "✕ "}{result.message}
            </div>
          )}

          <button
            id="btn-ekspor-excel"
            onClick={handleEkspor}
            disabled={loading}
            className="w-full bg-green text-white font-extrabold py-4 rounded-[13px] shadow-[0_8px_20px_#278c5722] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-light hover:-translate-y-0.5 transition-all duration-200"
          >
            {loading ? "Membuat file…" : "↓ Unduh Excel"}
          </button>

          <div className="bg-[#eff7f1] border border-[#c8e6d4] rounded-xl p-4 text-xs text-[#345c47]">
            File Excel (.xlsx) di-generate secara real-time dari data respons menggunakan pustaka ExcelJS.
          </div>
        </div>
      </div>
    </div>
  );
}
