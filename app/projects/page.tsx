'use client'

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// Register the hook to avoid React version discrepancies
gsap.registerPlugin(useGSAP);

interface Project {
  title: string;
  desc: string;
  link: string;
  status: string;
  tech: string[];
  preview?: string;
}

const projects: Project[] = [
  {
    title: "EarnKit SDK",
    desc: "SDK in development for AI developers to monetize agents with Web3 capabilities and crypto-based payments. Building comprehensive monetization infrastructure for AI agents.",
    link: "https://earnkit.com",
    status: "In Development",
    tech: ["React", "TypeScript", "Web3", "AI SDK"],
    preview: "/placeholder-project.png"
  },
  {
    title: "Earny Chat",
    desc: "AI-powered platform for automated trading on Zora, Uniswap, and Jupiter. Features wallet abstraction and smart contract automation with 1,000+ testnet executions.",
    link: "https://earny.chat",
    status: "Live",
    tech: ["Next.js", "AI", "DeFi", "Wallet Abstraction"],
    preview: "/placeholder-project.png"
  },
  {
    title: "Coinvise Platform",
    desc: "Enhanced Web3 token reward campaigns platform. Improved wallet management, backend queries, and features that drove 500+ creators acquisition with 3x retention increase.",
    link: "https://www.coinvise.ai",
    status: "Enhanced",
    tech: ["React", "Web3", "PostgreSQL", "AWS"],
    preview: "/placeholder-project.png"
  },
  {
    title: "Earny Miniapp",
    desc: "AI agent that rewards users for pushing beliefs and narratives forward. Users pick topics, cast about them, and get rewarded by @earny for adding value to conversations. Helps founders and creators capture attention around launches and test viral ideas.",
    link: "https://farcaster.xyz/miniapps/n7AjQgRK7CTc/earny",
    status: "Live",
    tech: ["Farcaster", "AI", "Miniapp", "Web3"],
    preview: "/placeholder-project.png"
  },
  {
    title: "Mode Domains",
    desc: "Decentralized '.mode' domains with wallet-based login and Three.js animations. Facilitated 30,000+ domain claims in beta with Merkle Trees optimization.",
    link: "https://modedomains.xyz",
    status: "Beta",
    tech: ["Three.js", "Web3", "Merkle Trees", "ENS"],
    preview: "/placeholder-project.png"
  },
  {
    title: "Smart Disperse",
    desc: "Multi-chain token distribution platform built from UI to smart contract integration. Enables efficient batch transfers across multiple blockchain networks.",
    link: "https://smartdisperse.xyz/",
    status: "Live",
    tech: ["Solidity", "Multi-chain", "DeFi", "React"],
    preview: "/placeholder-project.png"
  },
];

const Projects: React.FC = () => {
  const container = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLParagraphElement>(null);
  const hrRef = useRef<HTMLHRElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const portfolioSectionRef = useRef<HTMLDivElement>(null);
  const previewCardRef = useRef<HTMLDivElement>(null);

  const [hasAnimated, setHasAnimated] = useState(false);

  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen size
  useEffect(() => {
    const checkIsMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      // Clear hover state when switching to mobile
      if (mobile && hoveredProject !== null) {
        setHoveredProject(null);
      }
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, [hoveredProject]);

  // Handle project hover for preview card (desktop only)
  const handleProjectHover = (index: number, event: React.MouseEvent) => {
    if (isMobile) return; // Skip hover effects on mobile

    setHoveredProject(index);
    setMousePosition({ x: event.clientX, y: event.clientY });

    // Animate preview card in
    if (previewCardRef.current) {
      gsap.to(previewCardRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  const handleProjectLeave = () => {
    if (isMobile) return; // Skip hover effects on mobile

    // Animate preview card out
    if (previewCardRef.current) {
      gsap.to(previewCardRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 0.2,
        ease: "power2.out",
        onComplete: () => setHoveredProject(null)
      });
    }
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!isMobile && hoveredProject !== null) {
      setMousePosition({ x: event.clientX, y: event.clientY });
    }
  };



  // Main GSAP animation sequence
  useGSAP(() => {
    if (!hasAnimated) {
      const tl = gsap.timeline({
        delay: 0.2,
        onComplete: () => {
          if (typeof window !== 'undefined') {
            sessionStorage.setItem('projectsAnimated', 'true');
          }
          setHasAnimated(true);
        }
      });

      // Set initial states (excluding HR line which has its own animation)
      const allElements = [
        headerRef.current,
        ...projectRefs.current.filter(Boolean),
        portfolioSectionRef.current
      ].filter(Boolean);

      gsap.set(allElements, {
        y: 50,
        opacity: 0,
        filter: "blur(6px)"
      });

      // Header animation with emoji bounce
      if (headerRef.current) {
        tl.to(headerRef.current, {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.6,
          ease: "power3.out"
        }, 0);

        // Animate emoji separately
        const emoji = headerRef.current.querySelector('.emoji');
        if (emoji) {
          gsap.set(emoji, { scale: 0, rotation: -180 });
          tl.to(emoji, {
            scale: 1,
            rotation: 0,
            duration: 0.8,
            ease: "back.out(1.7)"
          }, 0.2);
        }
      }

      // HR line expanding animation
      if (hrRef.current) {
        gsap.set(hrRef.current, { scaleX: 0, transformOrigin: "left center" });
        tl.to(hrRef.current, {
          scaleX: 1,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out"
        }, 0.4);
      }

      // Stagger project sections like About page
      projectRefs.current.forEach((projectRef, index) => {
        if (projectRef) {
          // Set initial state for entire project section
          gsap.set(projectRef, {
            y: 60,
            opacity: 0,
            filter: "blur(8px)"
          });

          const delay = 0.8 + (index * 0.15);

          // Animate entire project section
          tl.to(projectRef, {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.6,
            ease: "power3.out"
          }, delay);
        }
      });

      // Portfolio section at the end
      if (portfolioSectionRef.current) {
        const finalDelay = 0.8 + (projects.length * 0.15) + 0.3;
        tl.to(portfolioSectionRef.current, {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.6,
          ease: "power3.out"
        }, finalDelay);
      }

    } else {
      // If already animated, show everything immediately
      const allElements = [
        headerRef.current,
        portfolioSectionRef.current
      ].filter(Boolean);

      gsap.set(allElements, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)"
      });

      // Set project sections to visible
      projectRefs.current.forEach((projectRef) => {
        if (projectRef) {
          gsap.set(projectRef, {
            opacity: 1,
            y: 0,
            filter: "blur(0px)"
          });
        }
      });

      // Set HR line to full scale with proper opacity
      if (hrRef.current) {
        gsap.set(hrRef.current, {
          scaleX: 1,
          opacity: 1
        });
      }

      // Set emoji to normal state
      const emoji = headerRef.current?.querySelector('.emoji');
      if (emoji) {
        gsap.set(emoji, { scale: 1, rotation: 0 });
      }
    }

    // Set initial preview card state
    if (previewCardRef.current) {
      gsap.set(previewCardRef.current, {
        opacity: 0,
        scale: 0.95
      });
    }

  }, { scope: container, dependencies: [hasAnimated] });

  return (
    <div ref={container}>
      <main className="p-8 font-body">
        <p
          ref={headerRef}
          style={{
            opacity: hasAnimated ? 1 : 0,
            transform: hasAnimated ? 'translateY(0px)' : 'translateY(50px)',
            filter: hasAnimated ? 'blur(0px)' : 'blur(6px)'
          }}
        >
          <span className="emoji">🔨</span> A list of my engineering masterpieces.
        </p>

        <hr
          ref={hrRef}
          className="my-4 border-t-2 border-body-light-grey"
          style={{
            opacity: hasAnimated ? 1 : 0,
            transform: hasAnimated ? 'scaleX(1)' : 'scaleX(0)',
            transformOrigin: 'left center'
          }}
        />

        {projects.map((project, index) => (
          <div
            key={index}
            ref={el => { projectRefs.current[index] = el; }}
            className={`project-card ${!isMobile ? 'cursor-pointer' : ''}`}
            style={{
              opacity: hasAnimated ? 1 : 0,
              transform: hasAnimated ? 'translateY(0px)' : 'translateY(60px)',
              filter: hasAnimated ? 'blur(0px)' : 'blur(8px)'
            }}
            onMouseEnter={(e) => handleProjectHover(index, e)}
            onMouseLeave={handleProjectLeave}
            onMouseMove={handleMouseMove}
          >
            <a
              href={project.link}
              className="cursor-pointer font-bold underline transition-all duration-200 ease-in-out hover:text-nice-blue"
              target="_blank"
              rel="noopener noreferrer"
            >
              {project.title}
            </a>
            <p className="mb-8 mt-2 text-neutral-400 text-sm">
              {isMobile
                ? project.desc
                : (project.desc.length > 80 ? `${project.desc.substring(0, 80)}...` : project.desc)
              }
            </p>
          </div>
        ))}

        <div
          ref={portfolioSectionRef}
          className="project-card"
          style={{
            opacity: hasAnimated ? 1 : 0,
            transform: hasAnimated ? 'translateY(0px)' : 'translateY(50px)',
            filter: hasAnimated ? 'blur(0px)' : 'blur(6px)'
          }}
        >
          <Link
            href="/"
            className="cursor-pointer font-bold underline transition-all duration-200 ease-in-out hover:text-nice-blue"
          >
            Portfolio
          </Link>
          <p className="mb-4 mt-2 text-neutral-400 text-sm">
            This website! Describes myself and lists my works.
          </p>
        </div>
      </main>

      {/* Preview Card - Desktop Only */}
      {!isMobile && hoveredProject !== null && (
        <div
          ref={previewCardRef}
          className="fixed z-50 pointer-events-none"
          style={{
            left: mousePosition.x + 20,
            top: mousePosition.y - 100,
            transform: 'translate(0, 0)'
          }}
        >
          <div className="bg-neutral-900 rounded-lg shadow-2xl border border-gray-600 p-4 w-80 max-w-sm">
            {/* Project Preview Image */}
            <div className="w-full h-40 bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
              <div className="flex flex-col items-center justify-center text-gray-500">
                <svg className="w-12 h-12 mb-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
                <span className="text-xs text-gray-400">Preview Coming Soon</span>
              </div>
            </div>

            {/* Project Info */}
            <div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg text-white leading-tight">
                  {projects[hoveredProject].title}
                </h3>
                {/* <span className={`px-2 py-1 rounded-full text-xs font-medium ml-2 ${projects[hoveredProject].status === 'Live' ? 'bg-green-900/50 text-green-300 border border-green-700' :
                  projects[hoveredProject].status === 'In Development' ? 'bg-yellow-900/50 text-yellow-300 border border-yellow-700' :
                    projects[hoveredProject].status === 'Beta' ? 'bg-blue-900/50 text-blue-300 border border-blue-700' :
                      'bg-purple-900/50 text-purple-300 border border-purple-700'
                  }`}>
                  {projects[hoveredProject].status}
                </span> */}
              </div>

              <p className="text-gray-300 text-sm leading-relaxed">
                {projects[hoveredProject].desc}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
