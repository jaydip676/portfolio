import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Roboto_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  metadataBase: new URL("https://jaydip.dev/"),
  title: "Jaydip Patel - Full Stack Engineer | Web3 & AI Specialist",
  description:
    "Full Stack Engineer at Coinvise building EarnKit - AI agent monetization platform. Specialized in Web3, blockchain development, and creating innovative DeFi solutions with React, Node.js, and Solidity.",
  keywords: [
    "Jaydip Patel",
    "Full Stack Engineer",
    "Web3 Developer",
    "Blockchain Developer",
    "Solidity",
    "EarnKit",
    "AI Agent Monetization",
    "Coinvise",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Ethers.js",
    "Wagmi",
    "Viem",
    "Hardhat",
    "DeFi",
    "Smart Contracts",
    "Farcaster",
    "Web3 UX",
    "Account Abstraction",
    "BTT Chain",
    "HandShake Protocol",
    "Mode Domains",
    "Smart Disperse",
    "Portfolio",
    "Software Engineer",
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Development",
    "Artificial Intelligence",
    "AI",
    "AI Agent",
    "Blockchain",
    "Crypto",
    "DApps"
  ],
  authors: [{ name: "Jaydip Patel" }],
  creator: "Jaydip Patel",
  publisher: "Jaydip Patel",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://jaydip.dev/",
    title: "Jaydip Patel - Full Stack Engineer | Web3 & AI Specialist",
    description:
      "Full Stack Engineer at Coinvise building EarnKit - AI agent monetization platform. Specialized in Web3, blockchain development, and creating innovative DeFi solutions.",
    siteName: "Jaydip Patel Portfolio",
    images: [
      {
        url: "/og_image_jaydip_dev.png",
        width: 1200,
        height: 630,
        alt: "Jaydip Patel - Full Stack Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jaydip Patel - Full Stack Engineer | Web3 & AI Specialist",
    description:
      "Full Stack Engineer building EarnKit at Coinvise. Specialized in Web3, AI agents, and blockchain development.",
    images: ["/og_image_jaydip_dev.png"],
  },
};

const roboto_mono = Roboto_Mono({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-mono",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${roboto_mono.variable}`} suppressHydrationWarning>
      <body className="bg-just-black text-white">

        <div className="mx-auto mt-[10vh] max-w-2xl sm:mt-[20vh] sm:flex z-20 gap-4">
          <Navbar />
          {children}
          <Analytics />
        </div>
        <Footer />
      </body>
    </html>
  );
}
