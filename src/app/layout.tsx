// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Calculadora IMC",
  description: "Calculadora de Índice de Masa Corporal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="bg-brand-dark text-white"> {/* Color de fondo por defecto */}
        <main>{children}</main>
        {/* Aquí irá el Footer más adelante */}
      </body>
    </html>
  );
}