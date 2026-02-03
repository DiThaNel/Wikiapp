import type { Metadata } from "next";
import { Teko } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import { SearchProvider } from "./context/SearchContext";

const teko = Teko({
  variable: "--font-teko",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Wiki Hunter App",
  description: "Wiki Hunter App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${teko.variable} antialiased`}
        suppressHydrationWarning
      >
        <SearchProvider>
            <Header />
            {children}
        </SearchProvider>
      </body>
    </html>
  );
}
