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

export const metadata = {
  title: "CFTInd — Menumbuhkan Kreativitas Bersama Guru",
  description:
    "Platform asesmen dan riset yang berfokus pada perilaku guru dalam menumbuhkan kreativitas peserta didik. Kenali praktik mengajar yang mendukung tumbuhnya kreativitas.",
  keywords: "CFTInd, kreativitas guru, asesmen guru, riset pendidikan, CFTIndex",
  authors: [{ name: "Tim CFTInd" }],
  openGraph: {
    title: "CFTInd — Menumbuhkan Kreativitas Bersama Guru",
    description:
      "Platform asesmen dan riset yang berfokus pada perilaku guru dalam menumbuhkan kreativitas peserta didik.",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="id"
      className={`${dmSans.variable} ${plusJakarta.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
