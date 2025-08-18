// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header"; // Importa el componente

export const metadata: Metadata = {
  title: "Andrómeda – Software a la medida para ingeniería en Colombia",
  description: "Creamos software a la medida para empresas de ingeniería en Colombia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="bg-brand-dark text-white"> {/* Color de fondo por defecto */}
        <Header />
        <main>{children}</main>
        {/* Aquí irá el Footer más adelante */}
      </body>
    </html>
  );
}