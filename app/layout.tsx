import type { Metadata } from "next";
import "./globals.css";
import localFont from 'next/font/local'
import Providers from "./providers";

const systemFont = localFont({ 
  src: '../public/fonts/inter/Inter-VariableFont_opsz,wght.ttf',
  variable: "--system-font",
})

export const metadata: Metadata = {
  title: "Arvan Blog",
  description: "An Arvanian Dashboard to manage blog!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${systemFont.variable} h-full antialiased`}
    >
        <body>
          <Providers>
            <main>
                {children}
            </main>
          </Providers>
        </body>
    </html>
  );
} 
