import type { Metadata } from "next";
import { Roboto_Mono, Roboto, Vazirmatn } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/context/theme-context";

const roboto = Roboto({
  weight: ['100', '400', '700'],
  subsets: ["latin"],
  style: ['normal'],
  variable: '--font-roboto',
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  style: ['normal', 'italic'],
  variable: '--font-roboto-mono',
});
const vazirmatn = Vazirmatn({
  subsets: ["latin", "arabic"],
  style: ['normal'],
  weight: ["100", "200", "300", "400", "700", "900"],
  variable: '--font-vazirmatn',
})

export const metadata: Metadata = {
  title: "Blog.io",
  description: "ORM blog app with real Auth system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${robotoMono.variable} ${vazirmatn.variable} font-vazirmatn antialiased bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
      >
        <ThemeProvider>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
