'use client'

import React from "react";
import ClientWord from "./components/ClientWord";
import GlowGrid from "./components/threejs/GlowGrid";

const Home: React.FC = () => {
  const words = [
    "portfolio",
    "home",
    "workspace",
    "playground",
    "lab",
    "studio",
    "hub",
    "space",
    "domain",
    "digital corner"
  ];

  return (
    <main className="p-8 font-body">


      <h1 className="mb-8 text-4xl">👋🏼 Hey, I&apos;m Jaydip.</h1>
      <p className="mb-6">
        Welcome to my
        <ClientWord
          initial="portfolio"
          words={words}
          className="cursor-pointer ml-2 underline transition-all duration-200 ease-in-out hover:text-nice-blue"
        />
        !
      </p>
      <p className="mb-6">
        I&apos;m a Full Stack Developer, passionate about building scalable and user-friendly applications.
      </p>
      <p className="mb-6">
        Currently, I&apos;m creating
        <a
          href="https://earnkit.com"
          target="_blank"
          className="underline transition-colors duration-200 ease-in-out hover:text-nice-blue mx-2"
        >
          EarnKit
        </a>
        app at Coinvise, an AI Agent Monetization Platform that simplifies blockchain and AI integration, helping developers to monetize their AI agents.
      </p>
      <p className="mb-6">
        When I&apos;m not crafting code or debugging life 🤖, I&apos;m chasing high scores 🎮, watching thrillers 🎥, or diving deep into the latest in tech 🧠.
      </p>

      <p>
        Contact me at{" "}
        <a
          href="mailto:jayraj676@gmail.com"
          className="underline transition-colors duration-200 ease-in-out hover:text-nice-blue"
        >
          jayraj676@gmail.com
        </a>
        .
      </p>
    </main>
  );
};

export default Home;
