export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cftind.my.id";

  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/isi",
          "/kebijakan-privasi",
          "/kontak",
          "/og-image.png",
          "/og-image.jpg",
          "/icon.svg",
          "/icon.png",
          "/favicon.ico",
        ],
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "Googlebot",
        allow: [
          "/",
          "/isi",
          "/kebijakan-privasi",
          "/kontak",
          "/og-image.png",
          "/og-image.jpg",
          "/icon.svg",
          "/icon.png",
          "/favicon.ico",
        ],
        disallow: ["/admin/", "/api/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
