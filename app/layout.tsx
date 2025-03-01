import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "QR Code Generator",
  description: "Generate QR Codes for your links",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
