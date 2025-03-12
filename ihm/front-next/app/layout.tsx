import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { Toaster } from "sonner";
import Providers from "../components/Provider";

import "./globals.css";

const poppins = Poppins({
  weight: [ '300','400','500'],
  preload: false,
});

export const metadata: Metadata = {
  title: "Celsius",
  description: "Celsius",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={poppins.className}>
        <Toaster richColors position="top-right" />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
