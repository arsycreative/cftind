"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// Stat card component
function StatCard({ label, value, sub, color = "navy" }) {
  const colors = {
    navy: "from-navy to-navy-light",
    green: "from-green to-green-light",
    yellow: "from-[#d4952a] to-[#f8be3d]",
    muted: "from-[#697e86] to-[#8a9fa7]",
  };
  return (
    <div className={`bg-gradient-to-br ${colors[color]} text-white rounded-2xl p-6 shadow-md`}>
      <div className="text-4xl font-extrabold mb-1">{value}</div>
      <div className="text-white/80 text-sm font-semibold">{label}</div>
      {sub && <div className="text-white/60 text-xs mt-1">{sub}</div>}
    </div>
  );
}

// Visual Mini Bar Chart
function MiniChart({ data }) {
  const max = Math.max(...data.map((d) => d.count), 1);
  return (
    <div className="flex items-end gap-1.5 h-20 pt-4">
      {data.map((d, i) => {
        const heightPct = Math.max(8, Math.round((d.count / max) * 100));
        return (
          <div key={i} className="flex flex-col items-center gap-1 flex-1 group relative">
            {/* Tooltip on hover */}
            <div className="absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity bg-navy text-white text-[10px] py-0.5 px-1.5 rounded pointer-events-none whitespace-nowrap z-10">
              {d.date || d.label}: {d.count}
            </div>
            <div
              className={`w-full rounded-t transition-all duration-300 ${
                d.count > 0 ? "bg-green group-hover:bg-green-light" : "bg-[#e2eae6]"
              }`}
              style={{ height: `${heightPct}%` }}
            />
          </div>
        );
      })}
    </div>
  );
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    total: 0,
    selesai: 0,
    in_progress: 0,
    hari_ini: 0,
    harian: Array.from({ length: 14 }, (_, i) => ({ label: `H-${13 - i}`, count: 0 })),
    is_live_supabase: false,
  });
  const [currentDate, setCurrentDate] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setCurrentDate(
      new Date().toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
    async function fetchStats() {
      try {
        const res = await fetch("/api/admin/stats");
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-[family-name:var(--font-plus-jakarta)] font-extrabold text-2xl text-navy">
              Ringkasan Data
            </h1>
            <span
              className={`text-[11px] font-extrabold px-2.5 py-1 rounded-full ${
                stats.is_live_supabase
                  ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                  : "bg-amber-100 text-amber-800 border border-amber-300"
              }`}
            >
              {stats.is_live_supabase ? "● Supabase Live" : "● Local Store Active"}
            </span>
          </div>
          <p className="text-muted text-sm mt-1">
            {currentDate || "Memuat tanggal…"}
          </p>
        </div>
        <Link
          href="/admin/ekspor"
          id="btn-dashboard-ekspor"
          className="inline-flex items-center gap-2 bg-green text-white font-extrabold px-5 py-3 rounded-[13px] text-sm shadow-[0_6px_18px_#278c5722] hover:-translate-y-0.5 hover:bg-green-light transition-all duration-200"
        >
          ↓ Unduh Excel
        </Link>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Respons" value={loading ? "…" : stats.total} color="navy" />
        <StatCard
          label="Selesai"
          value={loading ? "…" : stats.selesai}
          sub={stats.total > 0 ? `${Math.round((stats.selesai / stats.total) * 100)}% selesai` : "completed"}
          color="green"
        />
        <StatCard
          label="Sedang Berjalan"
          value={loading ? "…" : stats.in_progress}
          sub="in_progress"
          color="muted"
        />
        <StatCard
          label="Hari Ini"
          value={loading ? "…" : stats.hari_ini}
          sub="respons baru"
          color="yellow"
        />
      </div>

      {/* Chart */}
      <div className="bg-white rounded-2xl border border-[#e2eae6] p-6 mb-6 shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <div>
            <h2 className="font-bold text-navy text-sm">Tren Respons 14 Hari Terakhir</h2>
            <p className="text-xs text-muted mt-0.5">Jumlah pengisian instrumen per hari</p>
          </div>
          <span className="text-xs font-bold text-green">
            {stats.harian.reduce((acc, curr) => acc + curr.count, 0)} total 14 hari
          </span>
        </div>
        <MiniChart data={stats.harian} />
        <div className="flex justify-between text-[11px] font-semibold text-muted mt-3 px-1 border-t border-[#e2eae6] pt-2">
          <span>14 hari lalu</span>
          <span>Hari ini</span>
        </div>
      </div>

      {/* Database connection info card */}
      {!stats.is_live_supabase && (
        <div className="bg-[#eff7f1] border border-[#c8e6d4] rounded-2xl p-6 mb-6">
          <div className="flex items-start gap-4">
            <span className="text-2xl">🌱</span>
            <div>
              <h3 className="font-bold text-navy text-sm">Mode Pratinjau Lokal Aktif</h3>
              <p className="text-xs text-muted mt-1 leading-relaxed">
                Platform saat ini menggunakan penyimpanan lokal otomatis. Semua alur kuesioner, penyimpanan bertahap,
                tabel respons, dan ekspor file Excel berfungsi 100%. Untuk menghubungkan database Supabase produksi,
                cukup masukkan kredensial di <code className="bg-white px-1.5 py-0.5 rounded font-mono text-[11px] border">.env.local</code>{" "}
                dan jalankan berkas <code className="bg-white px-1.5 py-0.5 rounded font-mono text-[11px] border">supabase/schema.sql</code>.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Quick links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          href="/admin/respons"
          className="bg-white rounded-2xl border border-[#e2eae6] p-6 shadow-sm hover:border-green transition-all group flex items-center justify-between"
        >
          <div>
            <h3 className="font-bold text-navy group-hover:text-green transition-colors text-base">
              Buka Tabel Respons →
            </h3>
            <p className="text-muted text-xs mt-1">
              Filter status, jenjang, pencarian ID responden, dan lihat rincian 45 jawaban.
            </p>
          </div>
          <span className="text-2xl text-muted group-hover:text-green group-hover:translate-x-1 transition-all">
            ▤
          </span>
        </Link>

        <Link
          href="/admin/ekspor"
          className="bg-white rounded-2xl border border-[#e2eae6] p-6 shadow-sm hover:border-green transition-all group flex items-center justify-between"
        >
          <div>
            <h3 className="font-bold text-navy group-hover:text-green transition-colors text-base">
              Konfigurasi Ekspor Excel →
            </h3>
            <p className="text-muted text-xs mt-1">
              Unduh sheet Data_Lebar, Kamus_Variabel, dan Info_Ekspor siap olah SPSS/R.
            </p>
          </div>
          <span className="text-2xl text-muted group-hover:text-green group-hover:translate-x-1 transition-all">
            ↓
          </span>
        </Link>
      </div>
    </div>
  );
}
