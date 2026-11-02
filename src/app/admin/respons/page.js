"use client";

import { useState, useEffect, useCallback } from "react";
import { BUTIR } from "@/lib/items";

const STATUS_LABELS = {
  completed: { label: "Selesai", color: "bg-green/15 text-green border border-green/30" },
  in_progress: { label: "Berjalan", color: "bg-amber-100 text-amber-800 border border-amber-300" },
  deleted: { label: "Dihapus", color: "bg-red-100 text-red-700 border border-red-200" },
};

export default function AdminResponsPage() {
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterJenjang, setFilterJenjang] = useState("");
  const [page, setPage] = useState(1);
  const PER_PAGE = 25;

  // Detail Modal State
  const [selectedSub, setSelectedSub] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  // Delete confirmation
  const [deletingId, setDeletingId] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        search,
        status: filterStatus,
        jenjang: filterJenjang,
        page: String(page),
        limit: String(PER_PAGE),
      });
      const res = await fetch(`/api/admin/respons?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setRows(data.rows || []);
        setTotal(data.total || 0);
      }
    } catch (err) {
      console.error("Gagal memuat respons:", err);
    } finally {
      setLoading(false);
    }
  }, [search, filterStatus, filterJenjang, page]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const openDetail = async (id) => {
    setDetailLoading(true);
    try {
      const res = await fetch(`/api/admin/respons/${id}`);
      if (res.ok) {
        const json = await res.json();
        setSelectedSub(json.data);
      }
    } catch (err) {
      console.error("Gagal memuat rincian:", err);
    } finally {
      setDetailLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus data respons ${id}? Tindakan ini bersifat soft-delete.`)) {
      return;
    }
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/respons/${id}/delete`, { method: "POST" });
      if (res.ok) {
        await fetchData();
        if (selectedSub?.id === id) setSelectedSub(null);
      }
    } catch (err) {
      console.error("Gagal menghapus:", err);
    } finally {
      setDeletingId(null);
    }
  };

  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="font-[family-name:var(--font-plus-jakarta)] font-extrabold text-2xl text-navy">
            Data Respons
          </h1>
          <p className="text-muted text-sm mt-1">
            {total} entri ditemukan {loading && "(memperbarui…)"}
          </p>
        </div>
        <a
          href="/admin/ekspor"
          className="inline-flex items-center gap-2 bg-green text-white font-extrabold px-5 py-3 rounded-[13px] text-sm shadow-[0_6px_18px_#278c5722] hover:-translate-y-0.5 hover:bg-green-light transition-all duration-200"
        >
          ↓ Ekspor Excel
        </a>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-[#e2eae6] p-5 mb-5 shadow-sm flex flex-wrap gap-3 items-center">
        <input
          type="text"
          placeholder="Cari kode respons…"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="border border-[#ccd9d4] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green/40 focus:border-green min-w-56"
        />
        <select
          value={filterStatus}
          onChange={(e) => {
            setFilterStatus(e.target.value);
            setPage(1);
          }}
          className="border border-[#ccd9d4] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green/40 focus:border-green"
        >
          <option value="">Semua status</option>
          <option value="completed">Selesai (Completed)</option>
          <option value="in_progress">Berjalan (In Progress)</option>
        </select>
        <select
          value={filterJenjang}
          onChange={(e) => {
            setFilterJenjang(e.target.value);
            setPage(1);
          }}
          className="border border-[#ccd9d4] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green/40 focus:border-green"
        >
          <option value="">Semua jenjang</option>
          {[
            "PAUD / TK / RA",
            "SD / MI",
            "SMP / MTs",
            "SMA / MA",
            "SMK / MAK",
            "SLB / Pendidikan Khusus",
            "Lainnya",
          ].map((j) => (
            <option key={j} value={j}>{j}</option>
          ))}
        </select>

        {(search || filterStatus || filterJenjang) && (
          <button
            onClick={() => {
              setSearch("");
              setFilterStatus("");
              setFilterJenjang("");
              setPage(1);
            }}
            className="text-sm text-muted hover:text-red-500 font-semibold transition-colors px-2"
          >
            ✕ Reset filter
          </button>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-[#e2eae6] shadow-sm overflow-hidden">
        {loading && rows.length === 0 ? (
          <div className="py-20 text-center text-muted">
            <div className="text-3xl mb-2">⏳</div>
            <p className="font-semibold text-sm">Memuat data respons…</p>
          </div>
        ) : rows.length === 0 ? (
          <div className="py-20 text-center text-muted">
            <div className="text-4xl mb-3">📭</div>
            <p className="font-bold">Tidak ada data respons</p>
            <p className="text-sm mt-1 max-w-xs mx-auto">
              Tidak ada responden yang sesuai dengan kriteria filter saat ini.
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-[#f5f9f6] border-b border-[#e2eae6]">
                  <tr>
                    {["Kode", "Status", "Mulai", "Selesai", "Durasi", "Jenjang", "Provinsi", "Aksi"].map((h) => (
                      <th
                        key={h}
                        className="text-left px-5 py-3.5 text-xs font-extrabold text-muted uppercase tracking-wider whitespace-nowrap"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f0f5f2]">
                  {rows.map((row) => {
                    const status = STATUS_LABELS[row.status] || STATUS_LABELS.in_progress;
                    return (
                      <tr key={row.id} className="hover:bg-[#fafcfa] transition-colors">
                        <td className="px-5 py-3.5 font-mono text-xs font-bold text-navy whitespace-nowrap">
                          {row.id}
                        </td>
                        <td className="px-5 py-3.5 whitespace-nowrap">
                          <span className={`text-[11px] font-extrabold px-2.5 py-1 rounded-full ${status.color}`}>
                            {status.label}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-muted text-xs whitespace-nowrap">{row.mulai}</td>
                        <td className="px-5 py-3.5 text-muted text-xs whitespace-nowrap">{row.selesai || "—"}</td>
                        <td className="px-5 py-3.5 text-navy font-semibold text-xs whitespace-nowrap">
                          {row.durasi ? `${row.durasi} menit` : "—"}
                        </td>
                        <td className="px-5 py-3.5 text-muted whitespace-nowrap">{row.jenjang}</td>
                        <td className="px-5 py-3.5 text-muted whitespace-nowrap">{row.provinsi}</td>
                        <td className="px-5 py-3.5 whitespace-nowrap flex items-center gap-3">
                          <button
                            onClick={() => openDetail(row.id)}
                            className="text-xs text-green font-extrabold hover:text-green-light underline decoration-green/40 hover:decoration-green"
                          >
                            Detail
                          </button>
                          <button
                            disabled={deletingId === row.id}
                            onClick={() => handleDelete(row.id)}
                            className="text-xs text-red-500 hover:text-red-700 font-bold disabled:opacity-50"
                          >
                            Hapus
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center px-5 py-4 border-t border-[#e2eae6]">
              <span className="text-xs text-muted">
                Halaman {page} dari {totalPages} ({total} total)
              </span>
              <div className="flex gap-2">
                <button
                  disabled={page <= 1}
                  onClick={() => setPage((p) => p - 1)}
                  className="px-3.5 py-1.5 text-sm font-bold rounded-xl border border-[#dce8e0] disabled:opacity-40 hover:border-green transition-colors"
                >
                  ← Sebelumnya
                </button>
                <button
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className="px-3.5 py-1.5 text-sm font-bold rounded-xl border border-[#dce8e0] disabled:opacity-40 hover:border-green transition-colors"
                >
                  Berikutnya →
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* ── DETAIL MODAL (A-04) ────────────────────────────────────────────── */}
      {selectedSub && (
        <div className="fixed inset-0 bg-[#0c263fb0] z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex justify-between items-start border-b border-[#e2eae6] pb-4 mb-6">
              <div>
                <span className="text-xs font-extrabold uppercase text-green tracking-wider">
                  Rincian Respons Responden
                </span>
                <h2 className="text-2xl font-extrabold text-navy font-[family-name:var(--font-plus-jakarta)] mt-1">
                  {selectedSub.id}
                </h2>
                <div className="flex items-center gap-2 mt-2">
                  <span
                    className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                      selectedSub.status === "completed"
                        ? "bg-green/15 text-green"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {selectedSub.status === "completed" ? "Selesai" : "Sedang Berjalan"}
                  </span>
                  {selectedSub.durasi_menit && (
                    <span className="text-xs text-muted">
                      Durasi: <strong>{selectedSub.durasi_menit} menit</strong>
                    </span>
                  )}
                  {selectedSub.flag_cepat === "YA" && (
                    <span className="text-xs bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded">
                      ⚠️ Pengisian Cepat (&lt; 3 mnt)
                    </span>
                  )}
                  {selectedSub.flag_seragam === "YA" && (
                    <span className="text-xs bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded">
                      ⚠️ Jawaban Seragam
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={() => setSelectedSub(null)}
                className="w-8 h-8 rounded-full bg-[#f0f5f2] text-navy font-extrabold hover:bg-navy hover:text-white transition-colors grid place-items-center"
              >
                ✕
              </button>
            </div>

            {/* Profile Section */}
            <div className="bg-[#f7faf8] rounded-xl p-5 mb-6 border border-[#e2eae6]">
              <h3 className="font-bold text-navy text-sm mb-3">Profil Responden</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <span className="text-muted block">Jenjang Mengajar:</span>
                  <strong className="text-navy2 text-sm">{selectedSub.profil?.jenjang || "—"}</strong>
                </div>
                <div>
                  <span className="text-muted block">Pengalaman Mengajar:</span>
                  <strong className="text-navy2 text-sm">{selectedSub.profil?.lama || "—"}</strong>
                </div>
                <div>
                  <span className="text-muted block">Status Sekolah:</span>
                  <strong className="text-navy2 text-sm">{selectedSub.profil?.status || "—"}</strong>
                </div>
                <div>
                  <span className="text-muted block">Provinsi:</span>
                  <strong className="text-navy2 text-sm">{selectedSub.profil?.provinsi || "—"}</strong>
                </div>
                <div>
                  <span className="text-muted block">Mata Pelajaran:</span>
                  <strong className="text-navy2 text-sm">{selectedSub.profil?.mapel || "—"}</strong>
                </div>
                <div>
                  <span className="text-muted block">Jenis Kelamin:</span>
                  <strong className="text-navy2 text-sm">{selectedSub.profil?.jenis_kelamin || "—"}</strong>
                </div>
                <div>
                  <span className="text-muted block">Rentang Usia:</span>
                  <strong className="text-navy2 text-sm">{selectedSub.profil?.usia || "—"}</strong>
                </div>
                <div>
                  <span className="text-muted block">Pendidikan Terakhir:</span>
                  <strong className="text-navy2 text-sm">{selectedSub.profil?.pendidikan || "—"}</strong>
                </div>
                <div>
                  <span className="text-muted block">Email Responden:</span>
                  <strong className="text-navy2 text-sm font-mono">{selectedSub.profil?.email || "—"}</strong>
                </div>
              </div>
            </div>

            {/* Answers Section */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-navy text-sm">
                  Jawaban Instrumen (45 Butir)
                </h3>
                <span className="text-xs text-muted font-bold">
                  Skala Likert 1 (Sangat Tidak Setuju) – 5 (Sangat Setuju)
                </span>
              </div>

              <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                {BUTIR.map((b) => {
                  const val = selectedSub.answers?.[b.kode];
                  return (
                    <div
                      key={b.kode}
                      className="flex items-center justify-between gap-3 p-3 rounded-xl border border-[#eef2f0] hover:bg-[#fafcfa] text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono font-extrabold text-green bg-green/10 px-2 py-1 rounded text-[11px] w-12 text-center shrink-0">
                          {b.kode}
                        </span>
                        <div>
                          <p className="font-semibold text-navy2 leading-snug">{b.teks}</p>
                          <span className="text-[10px] text-muted uppercase font-bold tracking-wider">
                            Dimensi: {b.dimensi}
                          </span>
                        </div>
                      </div>
                      <div className="shrink-0 text-center">
                        {val !== undefined ? (
                          <span className="w-8 h-8 rounded-full bg-navy text-white font-extrabold grid place-items-center text-sm shadow-sm">
                            {val}
                          </span>
                        ) : (
                          <span className="text-muted text-xs italic">Kosong</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-[#e2eae6]">
              <button
                onClick={() => handleDelete(selectedSub.id)}
                className="text-xs text-red-600 hover:text-red-800 font-bold px-3 py-2 rounded-xl hover:bg-red-50 transition-colors"
              >
                Hapus Respons Ini
              </button>
              <button
                onClick={() => setSelectedSub(null)}
                className="bg-navy text-white font-bold px-5 py-2.5 rounded-xl text-xs hover:bg-navy-light transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
