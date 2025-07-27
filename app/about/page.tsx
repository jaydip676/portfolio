import React from "react";
import ClientWord from "../components/ClientWord";
import ClientTechView from "../components/ClientTechView";

const About: React.FC = () => {
  const titlewords = [
    "Documentation",
    "Outline",
    "Summary",
    "Rundown",
    "Synopsis",
    "Overview",
  ];
  const computerwords = [
    "tech support",
    "digital guru",
    "computer expert",
    "IT guy",
    "sysadmin",
    "technician",
  ];
  const bucketlist = [
    "drive a F1 car 🏎️",
    "go skydiving 🪂",
    "start a business 💼",
    "change the world �",
    "create equality 🤝🏼",
    "learn languages 🔊",
    "increase discipline 😶",
    "climb mountains 🗻",
  ];
  const title2words = ["Presently", "Recently", "Nowadays", "Lately"];
  const techwords = ["Technology", "Stacks", "Services", "Tools"];
  const learningwords = [
    "software design",
    "data structures",
    "algorithims",
    "discrete math",
    "operating systems",
    "databases",
    "networking",

  ];
  const title3words = [
    "Additionally",
    "Furthermore",
    "Moreover",
    "Finally",
    "Also",
    "In Conclusion",
  ];
  return (
    <main className="p-8 font-body">
      <span className="text-3xl">📝</span>{" "}
      <ClientWord
        initial="Documentation"
        words={titlewords}
        className="cursor-pointer text-3xl underline transition-all duration-200 ease-in-out hover:text-nice-blue"
      />
      <p className="mt-8">
        For as long as I can remember, I&apos;ve always been the{" "}
        <ClientWord
          initial="tech support"
          words={computerwords}
          className="cursor-pointer underline transition-all duration-200 ease-in-out hover:text-nice-blue"
        />{" "}
        in my family 💻. Honestly, I have to give credit to gaming for starting
        me off.
      </p>
      <p className="mb-8 mt-6">
        Of course, I exist outside of tech. I love doing more than watching,
        leading more than following. I learn through application and live off
        logic. In the future, I hope to{" "}
        <ClientWord
          initial="drive a F1 car 🏎️"
          words={bucketlist}
          className="cursor-pointer underline transition-all duration-200 ease-in-out hover:text-nice-blue"
        />
        .
      </p>
      <span className="text-3xl">🔧</span>{" "}
      <ClientWord
        initial="Skills"
        words={techwords}
        className="p- cursor-pointer text-3xl underline transition-all duration-200 ease-in-out hover:text-nice-blue"
      />
      <p className="mt-8">
        I&apos;m quite the multi-disciplinary engineer having dabbled in all the
        fun stuff:
      </p>
      <div className="mb-8">
        <ClientTechView />
      </div>
      <span className="text-3xl">📌</span>{" "}
      <ClientWord
        initial="Currently"
        words={title2words}
        className="cursor-pointer text-3xl underline transition-all duration-200 ease-in-out hover:text-nice-blue"
      />
      <p className="mt-8">
        I&apos;m working as a Full Stack Engineer at{" "}
        <a
          href="https://coinvise.co"
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer underline transition-all duration-200 ease-in-out hover:text-nice-blue"
        >
          Coinvise
        </a>
        {" "}where I&apos;m building{" "}
        <a
          href="https://earnkit.com"
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer underline transition-all duration-200 ease-in-out hover:text-nice-blue"
        >
          EarnKit
        </a>
        {" "}💰 - the easiest way to monetize AI agents.
      </p>
      <p className="mt-6">
        EarnKit provides developers with a simple SDK to add monetization to their AI agents with just a few lines of code. Our platform enables:
      </p>
      <ul className="mb-8 mt-4 list-inside list-disc space-y-1 pl-8">
        <li>Usage-based pricing (per prompt or API call)</li>
        <li>Credit-based billing with wallet-native payments</li>
        <li>Transaction fees from onchain actions (swaps, bridges, mints)</li>
        <li>Automatic, trustless revenue streams</li>
        <li>Smart wallet integration with no popups</li>
        <li>Built-in analytics and revenue tracking</li>
      </ul>
      <span className="text-3xl">🎓</span>{" "}
      <span className="text-3xl">Education</span>
      <div className="mt-8 mb-8">
        <p className="font-bold">Bachelor of Engineering - IT</p>
        <p className=" italic">L. D. College of Engineering, Ahmedabad</p>
      </div>
    </main>
  );
};

export default About;
