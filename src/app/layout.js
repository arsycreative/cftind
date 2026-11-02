import { DM_Sans, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cftind.my.id";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "CFTInd — Menumbuhkan Kreativitas Bersama Guru",
    template: "%s | CFTInd",
  },
  description:
    "Platform asesmen dan riset perilaku guru dalam menumbuhkan kreativitas peserta didik (CFTIndex Bahasa Indonesia). Refleksi pedagogis lintas jenjang pendidikan.",
  keywords: [
    "CFTInd",
    "CFTIndex",
    "kreativitas guru",
    "asesmen guru",
    "riset pendidikan",
    "pedagogi kreatif",
    "Kurikulum Merdeka",
    "Cropley",
    "Soh",
  ],
  authors: [{ name: "Tim Riset CFTInd", url: siteUrl }],
  creator: "Tim Riset CFTInd",
  publisher: "CFTInd",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "CFTInd — Menumbuhkan Kreativitas Bersama Guru",
    description:
      "Kenali 9 dimensi perilaku mengajar yang memupuk daya cipta siswa. Platform asesmen & riset CFTIndex adaptasi Bahasa Indonesia.",
    url: siteUrl,
    siteName: "CFTInd",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CFTInd — Menumbuhkan Kreativitas Bersama Guru",
        type: "image/png",
      },
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "CFTInd — Menumbuhkan Kreativitas Bersama Guru",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CFTInd — Menumbuhkan Kreativitas Bersama Guru",
    description:
      "Kenali 9 dimensi perilaku mengajar yang memupuk daya cipta siswa. Platform asesmen & riset CFTIndex adaptasi Bahasa Indonesia.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: siteUrl,
  },
  other: {
    "theme-color": "#278C57",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="id"
      className={`${dmSans.variable} ${plusJakarta.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased bg-white text-navy2">
        {children}
      </body>
    </html>
  );
}
