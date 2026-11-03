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
    "HOTS",
    "kuesioner guru Indonesia",
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
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
  },
  other: {
    "theme-color": "#278C57",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "CFTInd — Menumbuhkan Kreativitas Bersama Guru",
      description:
        "Platform asesmen dan riset perilaku guru dalam menumbuhkan kreativitas peserta didik (CFTIndex Bahasa Indonesia).",
      inLanguage: "id-ID",
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
    },
    {
      "@type": "ResearchProject",
      "@id": `${siteUrl}/#project`,
      name: "CFTInd — Riset Pemetaan Perilaku Guru Pemupuk Kreativitas",
      alternateName: "CFTIndex Adaptasi Bahasa Indonesia",
      url: siteUrl,
      logo: `${siteUrl}/icon.png`,
      image: `${siteUrl}/og-image.png`,
      description:
        "Platform penelitian dan asesmen reflektif 9 dimensi perilaku guru dalam menumbuhkan kreativitas peserta didik berdasarkan kerangka Cropley (1997) dan Soh (2000, 2015).",
      inLanguage: "id-ID",
      funder: {
        "@type": "Organization",
        name: "Tim Riset CFTInd",
      },
      knowsAbout: [
        "Creativity Fostering Teacher Behaviour",
        "CFTIndex",
        "Pedagogi Kreatif",
        "Kurikulum Merdeka",
        "Inovasi Pembelajaran",
        "Asesmen Pendidikan",
      ],
    },
    {
      "@type": "EducationalOrganization",
      "@id": `${siteUrl}/#organization`,
      name: "CFTInd",
      url: siteUrl,
      logo: `${siteUrl}/icon.png`,
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "Apa itu instrumen CFTIndex dan apa tujuannya di Indonesia?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Creativity Fostering Teacher Behaviour Index (CFTIndex) adalah instrumen pengukuran perilaku pedagogis guru yang dikembangkan oleh Prof. Kay Soh (2000, 2015) berdasarkan 9 prinsip psikologi kreativitas Arthur Cropley. Di Indonesia, instrumen ini diadaptasi untuk membantu memetakan praktik pengajaran yang memberi ruang bagi tumbuhnya pemikiran kreatif murid di berbagai jenjang sekolah.",
          },
        },
        {
          "@type": "Question",
          name: "Apakah instrumen ini menampilkan skor kepribadian atau rapor guru?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Tidak. Sesuai prinsip etika psikometrik, selama proses pengujian validitas adaptasi Indonesia berlangsung, platform ini tidak menampilkan skor individual atau kategori predikat guru. Pengisian murni bertujuan untuk riset dan refleksi pedagogis, tanpa konsekuensi evaluasi kinerja formal.",
          },
        },
        {
          "@type": "Question",
          name: "Berapa lama waktu yang dibutuhkan untuk mengisi instrumen lengkap?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Kuesioner terdiri dari 45 butir pernyataan yang dibagi ke dalam 9 layar (5 butir per layar). Rata-rata guru menyelesaikannya dalam waktu ±10 menit. Sistem kami dilengkapi penyimpanan otomatis (autosave) per layar, sehingga Anda tidak perlu khawatir kehilangan data jika koneksi internet terputus.",
          },
        },
        {
          "@type": "Question",
          name: "Apakah data sekolah dan identitas pribadi saya aman dan terjamin rahasia?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Sangat aman. Platform CFTInd mematuhi prinsip UU Pelindungan Data Pribadi (UU No. 27/2022). Kami tidak mengumpulkan Nama lengkap, NIK, alamat rumah, maupun nomor telepon. Semua data demografis disimpan secara anonim dan alamat IP di-hash satu arah (SHA-256) semata-mata untuk mencegah spam bot.",
          },
        },
        {
          "@type": "Question",
          name: "Apakah semua guru dari jenjang PAUD hingga SMA/SMK dapat berpartisipasi?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Ya! Instrumen ini dirancang secara inklusif lintas jenjang, mulai dari PAUD/TK, SD/MI, SMP/MTs, SMA/MA, SMK/MAK, hingga SLB/Pendidikan Khusus. Partisipasi guru dari berbagai wilayah dan jenjang sangat berharga untuk membangun norma pengukuran nasional yang adil.",
          },
        },
        {
          "@type": "Question",
          name: "Bisakah saya meminta data saya dihapus setelah selesai mengisi?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Tentu. Setiap responden memiliki hak penarikan persetujuan. Anda cukup mencatat ID Sesi pengisian Anda dan menghubungi tim peneliti melalui halaman kontak. Sistem admin kami mendukung fitur penghapusan data (soft-delete) sesuai standar etika riset.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="id"
      className={`${dmSans.variable} ${plusJakarta.variable} h-full`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col antialiased bg-white text-navy2">
        {children}
      </body>
    </html>
  );
}
