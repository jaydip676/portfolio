'use client'

import React, { useRef, useEffect, useState } from "react";
import ClientWord from "./components/ClientWord";
import GlowGrid from "./components/threejs/GlowGrid";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

// Register GSAP plugins
gsap.registerPlugin(useGSAP);

const Home: React.FC = () => {
  const container = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const paragraphRefs = useRef<HTMLParagraphElement[]>([]);
  const linkRef = useRef<HTMLAnchorElement>(null);

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

  // SplitText effect for characters with emoji preservation
  const splitTextToChars = (element: HTMLElement) => {
    const text = element.textContent || "";
    element.innerHTML = "";

    // Split by Array.from to handle emojis properly
    const chars = Array.from(text);

    chars.forEach((char, index) => {
      const span = document.createElement("span");
      span.textContent = char === " " ? "\u00A0" : char; // Preserve spaces
      span.style.display = "inline-block";
      span.className = `char-${index}`;
      element.appendChild(span);
    });

    return element.querySelectorAll("span");
  };

  // Main GSAP animation sequence - only on first visit
  useGSAP(() => {
    // Only animate if this is the first visit

    const tl = gsap.timeline({
      delay: 0.2, // Reduced from 0.5s
    });

    // Hero title character reveal animation
    if (heroTitleRef.current) {
      // Make sure h1 is visible
      gsap.set(heroTitleRef.current, { opacity: 1 });

      const chars = splitTextToChars(heroTitleRef.current);

      // Set initial state for characters
      gsap.set(chars, {
        y: 30, // Reduced from 100
        opacity: 0,
        rotationX: -90,
        transformOrigin: "50% 50% -50px"
      });

      // Animate characters in - faster
      tl.to(chars, {
        y: 0,
        opacity: 1,
        rotationX: 0,
        duration: 0.8, // Reduced from 1.2s
        ease: "back.out(1.7)",
        stagger: {
          amount: 0.5, // Reduced from 0.8s
          from: "start",
          ease: "power2.out"
        }
      });
    }

    // Animate paragraphs with consistent effects
    paragraphRefs.current.forEach((paragraph, index) => {
      if (paragraph) {
        // Set consistent initial state for all paragraphs
        gsap.set(paragraph, {
          y: 50,
          opacity: 0,
          filter: "blur(8px)"
        });

        // Consistent animation for all paragraphs - faster timing
        const delay = 0.6 + (index * 0.15); // Reduced from 1 + (index * 0.2)

        tl.to(paragraph, {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.6, // Reduced from 0.8s
          ease: "power3.out"
        }, delay);
      }
    });

  }, { scope: container });

  // Scroll-triggered animations for when elements come into view
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          gsap.to(entry.target, {
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out",
            yoyo: true,
            repeat: 1
          });
        }
      });
    }, observerOptions);

    paragraphRefs.current.forEach(p => {
      if (p) observer.observe(p);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={container}>
      <main className="p-8 font-body">
        <h1
          ref={heroTitleRef}
          className="mb-8 font-bold text-2xl md:text-4xl"
          style={{
            perspective: "1000px",
            opacity: 0
          }}
        >
          👋 Hey, I&apos;m Jaydip.
        </h1>

        <p
          ref={el => { if (el) paragraphRefs.current[0] = el; }}
          className="mb-6"
          style={{
            opacity: 0,
            transform: 'translateY(50px)',
            filter: 'blur(8px)'
          }}
        >
          Welcome to my
          <ClientWord
            initial="portfolio"
            words={words}
            className="cursor-pointer ml-2 underline transition-all duration-200 ease-in-out hover:text-nice-blue"
          />
          !
        </p>

        <p
          ref={el => { if (el) paragraphRefs.current[1] = el; }}
          className="mb-6"
          style={{
            opacity: 0,
            transform: 'translateY(50px)',
            filter: 'blur(8px)'
          }}
        >
          I&apos;m a Full Stack Developer, passionate about building scalable and user-friendly applications.
        </p>

        <p
          ref={el => { if (el) paragraphRefs.current[2] = el; }}
          className="mb-6"
          style={{
            opacity: 0,
            transform: 'translateY(50px)',
            filter: 'blur(8px)'
          }}
        >
          Currently, I&apos;m creating
          <a
            ref={linkRef}
            href="https://earnkit.com"
            target="_blank"
            className="inline-block underline transition-all duration-300 ease-in-out hover:text-nice-blue mx-2 px-2 py-1 rounded-md relative"
          >
            EarnKit
          </a>
          app at Coinvise, an AI Agent Monetization Platform that simplifies blockchain and AI integration, helping developers to monetize their AI agents.
        </p>

        <p
          ref={el => { if (el) paragraphRefs.current[3] = el; }}
          className="mb-6"
          style={{
            opacity: 0,
            transform: 'translateY(50px)',
            filter: 'blur(8px)'
          }}
        >
          When I&apos;m not crafting code or debugging life 🤖, I&apos;m chasing high scores 🎮, watching thrillers 🎥, or diving deep into the latest in tech 🧠.
        </p>

        <p
          ref={el => { if (el) paragraphRefs.current[4] = el; }}
          style={{
            opacity: 0,
            transform: 'translateY(50px)',
            filter: 'blur(8px)'
          }}
        >
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
    </div>
  );
};

export default Home;
