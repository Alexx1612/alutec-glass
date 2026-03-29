import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Alutec Glass - Sisteme de Sticlă pentru Terase și Balcoane",
  description: "Profesioniști în sisteme de sticlă glisantă, culisantă și fixă pentru terase. Calitate superioară și design modern pentru spațiul tău. Calcul preț online și livrare în Rosiori de Vede.",
  keywords: ["sisteme sticlă terasă", "glisanta sticlă", "culisant sticlă", "balcoane sticlă", "terase închise", "Rosiori de Vede", "calcul preț sticlă", "Alutec Glass"],
  authors: [{ name: "Alutec Glass" }],
  openGraph: {
    title: "Alutec Glass - Sisteme Profesionale de Sticlă",
    description: "Sisteme moderne de sticlă pentru terase și balcoane. Calitate garantată și design elegant.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alutec Glass - Sisteme de Sticlă",
    description: "Sisteme profesionale de sticlă pentru terase și balcoane",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro" suppressHydrationWarning>
      <body
        className={`${inter.className} antialiased bg-background text-foreground min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}