import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import styles from "./layout.module.css";
import Header from "./../components/Header";
import Footer from "./../components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Minimum CRUD",
  description: "Minimum CRUD created with Next.js, Express.js, and MySQL.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${styles.wrapper}`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
