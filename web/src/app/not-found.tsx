import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { NotFoundPage } from "@/components/NotFoundPage";
import czMessages from "../../messages/cz.json";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootNotFound() {
  return (
    <html lang="cs" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full">
        <NextIntlClientProvider locale="cz" messages={czMessages}>
          <NotFoundPage />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
