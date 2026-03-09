import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Visionary Dev LLC | Web Development That Converts",
  description:
    "Professional web development services. Starter websites, business websites, e-commerce stores, and ongoing care plans built to convert visitors into customers.",
  keywords: "web development, web design, business website, e-commerce website, starter website",
  openGraph: {
    title: "Visionary Dev LLC | Web Development That Converts",
    description:
      "Professional web development services built to convert visitors into customers.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-dark text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
