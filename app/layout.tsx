import type { Metadata } from "next";
import { Fraunces, Public_Sans } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600"],
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Ashutosh Sharma — Operations & FP&A",
    template: "%s",
  },
  description: "Operations leader working toward FP&A — portfolio of experience, projects, and skills.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${fraunces.variable} ${publicSans.variable}`}>
  <script
    dangerouslySetInnerHTML={{
      __html: `
        (function() {
          var theme = localStorage.getItem('theme');
          if (theme === 'dark') {
            document.documentElement.classList.add('dark');
          }
        })();
      `,
    }}
  />
  <Nav />
  {children}
</body>
    </html>
  );
}