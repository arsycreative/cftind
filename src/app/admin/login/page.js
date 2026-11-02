"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CFTIndLogo from "@/components/CFTIndLogo";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Email atau kata sandi tidak valid.");
        return;
      }

      router.push("/admin");
    } catch {
      setError("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f5f2] flex flex-col items-center justify-center px-5">
      {/* Card */}
      <div className="bg-white rounded-2xl border border-[#e2eae6] shadow-[0_24px_80px_#153a5b12] w-full max-w-[420px] p-10">
        <div className="text-center mb-8">
          <CFTIndLogo size="md" />
          <p className="text-muted text-sm mt-3">Panel Admin — Masuk untuk melanjutkan</p>
        </div>

        {error && (
          <div
            role="alert"
            className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 mb-5"
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="admin-email" className="text-sm font-bold text-navy2">
              Email
            </label>
            <input
              id="admin-email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@cftind.my.id"
              className="border border-[#ccd9d4] bg-white text-navy2 rounded-xl px-4 py-3.5 min-h-[48px] focus:outline-none focus:ring-2 focus:ring-green/40 focus:border-green transition"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="admin-password" className="text-sm font-bold text-navy2">
              Kata Sandi
            </label>
            <input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="border border-[#ccd9d4] bg-white text-navy2 rounded-xl px-4 py-3.5 min-h-[48px] focus:outline-none focus:ring-2 focus:ring-green/40 focus:border-green transition"
            />
          </div>

          <button
            id="btn-admin-login"
            type="submit"
            disabled={loading}
            className="w-full bg-navy text-white font-extrabold py-3.5 rounded-[13px] hover:bg-navy-light disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 mt-2 min-h-[48px]"
          >
            {loading ? "Masuk…" : "Masuk →"}
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-[#e2eae6] text-center">
          <p className="text-xs text-muted mb-2">
            Akses terbatas untuk tim peneliti CFTInd
          </p>
          <button
            type="button"
            onClick={() => {
              setEmail("admin@cftind.my.id");
              setPassword("admin123");
            }}
            className="text-[11px] text-green font-bold hover:underline bg-[#eff7f1] px-2.5 py-1.5 rounded-lg border border-[#c8e6d4]"
          >
            Isi Kredensial Demo (admin@cftind.my.id)
          </button>
        </div>
      </div>

      <p className="text-xs text-muted mt-6">
        © 2026 CFTInd · Panel Admin
      </p>
    </div>
  );
}
