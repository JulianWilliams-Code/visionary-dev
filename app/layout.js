import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Visionary Dev LLC | Professional Websites for Small Businesses",
  description:
    "We design and build fast, professional websites for small businesses, local service companies, and startups. Custom sites that get you customers.",
  keywords:
    "web design, web development, small business website, ecommerce website, website redesign, landing page",
  openGraph: {
    title: "Visionary Dev LLC | Professional Websites for Small Businesses",
    description:
      "We design and build fast, professional websites for small businesses and organizations.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-dark text-white antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
