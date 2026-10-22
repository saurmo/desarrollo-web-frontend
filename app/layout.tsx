import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Listings",
  description: "Encuentra y reserva tu próxima cabaña",
};

/**
 * Layout raíz: lo comparten TODAS las páginas, públicas y privadas.
 * Solo define el html, las fuentes y el fondo de la aplicación (la paleta del login).
 * La barra pública vive en app/(public)/layout.tsx y el panel en app/(private)/layout.tsx.
 */
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-950 bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 text-slate-100">
        {children}
      </body>
    </html>
  );
}
