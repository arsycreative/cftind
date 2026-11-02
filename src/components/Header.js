"use client";

import Link from "next/link";
import CFTIndLogo from "./CFTIndLogo";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "/#tentang", label: "Tentang" },
  { href: "/#dimensi", label: "9 Dimensi" },
  { href: "/#simulasi", label: "Coba Simulasi" },
  { href: "/#filosofi", label: "Filosofi" },
  { href: "/#faq", label: "FAQ" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`h-[84px] flex items-center sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-[#eef1ee] shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-[1180px] mx-auto px-7 w-full flex justify-between items-center gap-5">
        {/* Logo */}
        <Link href="/" aria-label="CFTInd beranda">
          <CFTIndLogo />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-bold text-[#536a70] hover:text-green transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
          <Link
            href="/isi"
            className="inline-flex items-center gap-2 bg-green text-white font-extrabold px-5 py-3 rounded-[13px] shadow-[0_8px_20px_#278c5733] hover:-translate-y-0.5 hover:bg-green-light transition-all duration-200 text-sm"
          >
            Mulai Sekarang <span aria-hidden>↗</span>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-xl text-navy"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
          aria-expanded={menuOpen}
        >
          <svg width="22" height="18" viewBox="0 0 22 18" fill="none">
            {menuOpen ? (
              <>
                <path d="M1 1L21 17M21 1L1 17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </>
            ) : (
              <>
                <path d="M0 1.5h22M0 9h22M0 16.5h22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-[84px] left-0 right-0 bg-white border-b border-[#eef1ee] shadow-lg py-4 px-7 flex flex-col gap-4 z-50">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm font-bold text-[#536a70] hover:text-green transition-colors"
            >
              {l.label}
            </a>
          ))}
          <Link
            href="/isi"
            onClick={() => setMenuOpen(false)}
            className="inline-flex items-center justify-center gap-2 bg-green text-white font-extrabold px-5 py-3 rounded-[13px] text-sm"
          >
            Mulai Sekarang ↗
          </Link>
        </div>
      )}
    </header>
  );
}
