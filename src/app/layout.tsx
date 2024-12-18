import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MenuProvider } from "./context/menuContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Droplo - zadanie rekrutacyjne",
  description: "Stworzone przez Mateusza Jarząbek",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <MenuProvider>
        <body
          className={`${inter.variable} antialiased my-20 flex justify-center`}
        >
          <div className="container flex items-center justify-center">
            {children}
          </div>
        </body>
      </MenuProvider>
    </html>
  );
}
