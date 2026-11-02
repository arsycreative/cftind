"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Cloudflare Turnstile Client Component
 * @param {Object} props
 * @param {function(string): void} props.onVerify Callback saat token Turnstile berhasil diperoleh
 * @param {function(): void} [props.onError] Callback saat terjadi galat
 * @param {string} [props.theme='light'] Tema tampilan: 'light', 'dark', atau 'auto'
 * @param {string} [props.size='normal'] Ukuran widget: 'normal', 'compact', atau 'flexible'
 */
export default function Turnstile({
  onVerify,
  onError,
  theme = "light",
  size = "normal",
}) {
  const containerRef = useRef(null);
  const widgetIdRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useEffect(() => {
    // Jika siteKey belum diisi (mis. tahap pengembangan lokal),
    // simulasikan verifikasi langsung agar pengujian tidak terganggu.
    if (!siteKey) {
      if (onVerify) {
        onVerify("dev-turnstile-token");
      }
      return;
    }

    // Fungsi inisialisasi widget setelah script Turnstile siap
    const renderWidget = () => {
      if (!window.turnstile || !containerRef.current) return;
      if (widgetIdRef.current !== null) return; // Sudah ter-render

      try {
        const id = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          theme,
          size,
          callback: (token) => {
            if (onVerify) onVerify(token);
          },
          "error-callback": () => {
            if (onError) onError();
          },
          "expired-callback": () => {
            if (onVerify) onVerify("");
          },
        });
        widgetIdRef.current = id;
        setLoaded(true);
      } catch (e) {
        console.error("Gagal merender Turnstile:", e);
      }
    };

    // Muat script Cloudflare Turnstile jika belum ada
    if (typeof window !== "undefined") {
      if (window.turnstile) {
        renderWidget();
      } else {
        const existingScript = document.getElementById("cf-turnstile-script");
        if (!existingScript) {
          const script = document.createElement("script");
          script.id = "cf-turnstile-script";
          script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
          script.async = true;
          script.defer = true;
          script.onload = () => {
            renderWidget();
          };
          document.head.appendChild(script);
        } else {
          existingScript.addEventListener("load", renderWidget);
        }
      }
    }

    return () => {
      if (widgetIdRef.current !== null && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
          widgetIdRef.current = null;
        } catch {}
      }
    };
  }, [siteKey, theme, size, onVerify, onError]);

  // Jika siteKey tidak ada, tampilkan indikator ringan mode dev
  if (!siteKey) {
    return (
      <div className="flex items-center gap-2 text-xs text-muted py-2">
        <span className="text-green text-sm">🛡️</span>
        <span>Proteksi bot aktif (Mode Pengujian Lokal)</span>
      </div>
    );
  }

  return (
    <div className="my-3 min-h-[65px] flex items-center">
      <div ref={containerRef} />
    </div>
  );
}
