import type { Metadata } from "next";

import { I18nProvider } from "@/features/i18n/i18n-provider";

import "./globals.css";

export const metadata: Metadata = {
  title: "Pixel Office",
  description: "A real-time 8-bit virtual office for small teams.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
