import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "MIHS Provincial Hospital - Janakpurdham, Madhesh Province",
  description: "MIHS Provincial Hospital provides quality healthcare services in Janakpurdham, Madhesh Province, Nepal. Offering specialized departments including Emergency Medicine, Surgery, Neurosurgery, Pediatrics, and more.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/logo.png", type: "image/png" },
    ],
    apple: "/logo.png",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body
        className={`${jost.variable} antialiased`}
        style={{ fontFamily: "var(--font-jost), sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
