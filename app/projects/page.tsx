import React from "react";
import Link from "next/link";

const projects = [
  {
    title: "EarnKit SDK",
    desc: "SDK in development for AI developers to monetize agents with Web3 capabilities and crypto-based payments. Building comprehensive monetization infrastructure for AI agents.",
    link: "https://earnkit.com",
  },
  {
    title: "Earny Chat",
    desc: "AI-powered platform for automated trading on Zora, Uniswap, and Jupiter. Features wallet abstraction and smart contract automation with 1,000+ testnet executions.",
    link: "https://earny.chat",
  },
  {
    title: "Coinvise Platform",
    desc: "Enhanced Web3 token reward campaigns platform. Improved wallet management, backend queries, and features that drove 500+ creators acquisition with 3x retention increase.",
    link: "https://www.coinvise.ai",
  },
  {
    title: "Earny Miniapp",
    desc: "AI agent that rewards users for pushing beliefs and narratives forward. Users pick topics, cast about them, and get rewarded by @earny for adding value to conversations. Helps founders and creators capture attention around launches and test viral ideas.",
    link: "https://farcaster.xyz/miniapps/n7AjQgRK7CTc/earny",
  },
  {
    title: "Mode Domains",
    desc: "Decentralized '.mode' domains with wallet-based login and Three.js animations. Facilitated 30,000+ domain claims in beta with Merkle Trees optimization.",
    link: "https://modedomains.xyz",
  },
  {
    title: "Smart Disperse",
    desc: "Multi-chain token distribution platform built from UI to smart contract integration. Enables efficient batch transfers across multiple blockchain networks.",
    link: "https://smartdisperse.xyz/",
  },
  {
    title: "HandShake Protocol",
    desc: "Secure token and NFT transfers on BTT Chain with mutual consent mechanism. Features EIP-712 integration, flexible gas payments, and advanced security measures.",
    link: "https://handshake-mainnet.vercel.app/",
  },

];

const Projects: React.FC = () => {
  return (
    <div>
      <main className="p-8 font-body">
        <p>🔨 A list of my engineering masterpieces.</p>
        <hr className="my-4 border-t-2 border-body-light-grey" />
        {projects.map((project, index) => (
          <div key={index}>
            <a
              href={project.link}
              className="cursor-pointer font-bold underline transition-all duration-200 ease-in-out hover:text-nice-blue"
              target="_blank"
              rel="noopener noreferrer"
            >
              {project.title}
            </a>
            <p className="mb-4">{project.desc}</p>
          </div>
        ))}
        <Link
          href="/"
          className="cursor-pointer font-bold underline transition-all duration-200 ease-in-out hover:text-nice-blue"
        >
          Portfolio
        </Link>
        <p className="mb-4">
          This website! Describes myself and lists my works.
        </p>
      </main>
    </div>
  );
};

export default Projects;
