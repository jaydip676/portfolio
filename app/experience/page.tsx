import React from "react";

const positions = [
  {
    title: "Full Stack Developer",
    company: "Coinvise",
    date: "Nov. 2024 - Present",
    desc: "Developing EarnKit SDK for AI agent monetization and enhancing Web3 creator platform. Built Farcaster mini-apps, implemented gasless transactions via Account Abstraction (Pimlico, Turnkey, Privy), and integrated WarpCast/Neynar APIs. Enhanced onboarding UX contributing to 500+ creator signups and managed deployment pipelines using PostgreSQL, Railway, and Git-based workflows.",
  },
  {
    title: "Senior Frontend Developer",
    company: "Lampros Tech",
    date: "Jun. 2022 - Oct. 2024",
    desc: "Led frontend development for DeFi interfaces and internal dApps. Connected smart contracts with responsive UIs using Wagmi, Viem, and Ethers. Designed user-centric Web3 flows including wallet connections, transaction states, and notifications. Collaborated with backend teams on Solidity contract integration testing and built intuitive interfaces for cross-chain tools.",
  },
  {
    title: "Full Stack Developer",
    company: "Arth Infosoft Pvt. Ltd.",
    date: "Jan. 2022 - Apr. 2022",
    desc: "Completed intensive full stack development training focused on REST APIs and MVC patterns. Built modular e-pharmacy application featuring patient dashboards, product listings, and order workflows using the MERN stack. Gained hands-on experience in complete software development lifecycle from design to deployment.",
  },
];

const Experience: React.FC = () => {
  return (
    <div>
      <main className="p-8 font-body">
        <p>Explore my working background!</p>
        <hr className="my-4 border-t-2 border-body-light-grey" />
        {positions.map((position, index) => (
          <div key={index}>
            <p className="font-bold">{position.title}</p>
            <p className="mb-2">
              <i>{position.company}</i>
            </p>
            <p className="mb-2">{position.desc}</p>
            <p>{position.date}</p>
            <hr className="my-4 border-t-2 border-body-light-grey" />
          </div>
        ))}
      </main>
    </div>
  );
};

export default Experience;
