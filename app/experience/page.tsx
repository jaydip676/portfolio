'use client'

import React, { useRef, useState } from "react";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// Register the hook to avoid React version discrepancies
gsap.registerPlugin(useGSAP);

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
  const container = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLParagraphElement>(null);
  const hrRef = useRef<HTMLHRElement>(null);
  const positionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [hasAnimated, setHasAnimated] = useState(false);

  // Main GSAP animation sequence
  useGSAP(() => {
    if (!hasAnimated) {
      const tl = gsap.timeline({
        delay: 0.3,
        onComplete: () => {
          if (typeof window !== 'undefined') {
            sessionStorage.setItem('experienceAnimated', 'true');
          }
          setHasAnimated(true);
        }
      });

      // Set initial states for all elements (excluding HR line which has its own animation)
      const sections = [
        headerRef.current,
        ...positionRefs.current.filter(Boolean)
      ].filter(Boolean);

      gsap.set(sections, {
        y: 60,
        opacity: 0,
        filter: "blur(8px)"
      });

      // Header animation
      if (headerRef.current) {
        tl.to(headerRef.current, {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.6,
          ease: "power3.out"
        }, 0);
      }

      // HR line expanding animation
      if (hrRef.current) {
        gsap.set(hrRef.current, { scaleX: 0, transformOrigin: "left center" });
        tl.to(hrRef.current, {
          scaleX: 1,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out"
        }, 0.3);
      }

      // Stagger position sections
      positionRefs.current.forEach((positionRef, index) => {
        if (positionRef) {
          const delay = 0.6 + (index * 0.15);

          tl.to(positionRef, {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.6,
            ease: "power3.out"
          }, delay);
        }
      });

    } else {
      // If already animated, show everything immediately
      const allElements = [
        headerRef.current,
        ...positionRefs.current.filter(Boolean)
      ].filter(Boolean);

      gsap.set(allElements, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)"
      });

      // Set HR line to full scale with proper opacity
      if (hrRef.current) {
        gsap.set(hrRef.current, {
          scaleX: 1,
          opacity: 1
        });
      }
    }

  }, { scope: container, dependencies: [hasAnimated] });

  return (
    <div ref={container}>
      <main className="p-8 font-body">
        <p
          ref={headerRef}
          style={{
            opacity: hasAnimated ? 1 : 0,
            transform: hasAnimated ? 'translateY(0px)' : 'translateY(60px)',
            filter: hasAnimated ? 'blur(0px)' : 'blur(8px)'
          }}
        >
          Explore my working background!
        </p>

        <hr
          ref={hrRef}
          className="my-4 border-t border-body-light-grey"
          style={{
            opacity: hasAnimated ? 1 : 0,
            transform: hasAnimated ? 'scaleX(1)' : 'scaleX(0)',
            transformOrigin: 'left center'
          }}
        />

        {positions.map((position, index) => (
          <div
            key={index}
            ref={el => { positionRefs.current[index] = el; }}
            style={{
              opacity: hasAnimated ? 1 : 0,
              transform: hasAnimated ? 'translateY(0px)' : 'translateY(60px)',
              filter: hasAnimated ? 'blur(0px)' : 'blur(8px)'
            }}
          >
            <p className="font-bold">{position.title}</p>
            <p className="mb-2">
              <i>{position.company}</i>
            </p>
            <p className="mb-2 text-neutral-400 text-sm">{position.desc}</p>
            <p>{position.date}</p>
            <hr className="my-4 border-t border-body-light-grey" />
          </div>
        ))}
      </main>
    </div>
  );
};

export default Experience;
