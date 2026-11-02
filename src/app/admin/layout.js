"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CFTIndLogo from "@/components/CFTIndLogo";

const navItems = [
  { href: "/admin/dashboard", label: "Ringkasan", icon: "◉" },
  { href: "/admin/respons", label: "Data Respons", icon: "▤" },
  { href: "/admin/ekspor", label: "Ekspor Excel", icon: "↓" },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Don't show sidebar on login page
  if (pathname === "/admin/login") return <>{children}</>;

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#f0f5f2]">
      {/* Mobile top navigation */}
      <div className="md:hidden bg-navy text-white px-5 py-3.5 flex justify-between items-center sticky top-0 z-30 shadow-md">
        <Link href="/admin/dashboard" className="flex items-center gap-2">
          <CFTIndLogo size="sm" className="[&_.text-navy]:text-white [&_.text-green]:!text-yellow" />
          <span className="text-xs text-white/60">Admin</span>
        </Link>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg bg-white/10 text-white font-bold text-sm"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Sidebar (Desktop + Mobile Drawer) */}
      <aside
        className={`w-64 bg-navy flex flex-col shrink-0 fixed top-0 bottom-0 left-0 z-40 transition-transform duration-300 md:translate-x-0 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="px-6 py-5 border-b border-white/10 flex justify-between items-center">
          <div>
            <Link href="/admin/dashboard">
              <CFTIndLogo size="sm" className="[&_.text-navy]:text-white [&_.text-green]:!text-yellow" />
            </Link>
            <p className="text-white/50 text-xs mt-1.5">Panel Admin Peneliti</p>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="md:hidden text-white/60 hover:text-white p-1 text-lg"
          >
            ✕
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 py-6 flex flex-col gap-1.5">
          {navItems.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${
                  active
                    ? "bg-white/15 text-white shadow-sm"
                    : "text-white/65 hover:text-white hover:bg-white/8"
                }`}
              >
                <span className="text-base w-5 text-center">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-6 py-5 border-t border-white/10">
          <Link
            href="/"
            className="text-white/60 text-xs hover:text-white transition-colors flex items-center gap-1.5"
          >
            ← Kembali ke Situs
          </Link>
          <button
            className="mt-3 text-white/50 text-xs hover:text-red-400 transition-colors block text-left"
            onClick={async () => {
              await fetch("/api/admin/logout", { method: "POST" });
              window.location.href = "/admin/login";
            }}
          >
            Keluar (Logout)
          </button>
        </div>
      </aside>

      {/* Backdrop for mobile drawer */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
        />
      )}

      {/* Main content */}
      <main className="flex-1 md:ml-64 min-h-screen">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
