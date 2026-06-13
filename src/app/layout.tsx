import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "El libro que te está esperando — Miguel Fuentes",
  description:
    "Cuatro libros. Un instante para encontrar el que te corresponde hoy. Te toma menos de tres minutos.",
  openGraph: {
    title: "El libro que te está esperando",
    description:
      "Cuatro libros sobre los momentos que parten una vida en dos. Encontrá el tuyo en menos de tres minutos.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col grain">{children}</body>
    </html>
  );
}
