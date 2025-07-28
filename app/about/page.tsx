'use client'

import React, { useRef, useState } from "react";
import ClientWord from "../components/ClientWord";
import ClientTechView from "../components/ClientTechView";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// Register the hook to avoid React version discrepancies
gsap.registerPlugin(useGSAP);

const About: React.FC = () => {
  const container = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const introParagraphRef = useRef<HTMLParagraphElement>(null);
  const goalsParagraphRef = useRef<HTMLParagraphElement>(null);
  const skillsHeaderRef = useRef<HTMLDivElement>(null);
  const skillsDescRef = useRef<HTMLParagraphElement>(null);
  const techSectionRef = useRef<HTMLDivElement>(null);
  const currentlyHeaderRef = useRef<HTMLDivElement>(null);
  const currentlyContentRef = useRef<HTMLDivElement>(null);
  const featuresListRef = useRef<HTMLUListElement>(null);
  const educationHeaderRef = useRef<HTMLDivElement>(null);
  const educationContentRef = useRef<HTMLDivElement>(null);

  const [hasAnimated, setHasAnimated] = useState(false);

  // Character splitting function for text animations
  const splitTextToChars = (element: HTMLElement): HTMLElement[] => {
    const text = element.textContent || '';
    const chars: HTMLElement[] = [];

    element.innerHTML = '';

    Array.from(text).forEach((char) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.display = 'inline-block';
      element.appendChild(span);
      chars.push(span);
    });

    return chars;
  };

  // Main GSAP animation sequence
  useGSAP(() => {
    if (!hasAnimated) {
      const tl = gsap.timeline({
        delay: 0.3,
        onComplete: () => {
          setHasAnimated(true);
        }
      });

      // Set initial states for all elements
      const sections = [
        titleRef.current,
        introParagraphRef.current,
        goalsParagraphRef.current,
        skillsHeaderRef.current,
        skillsDescRef.current,
        techSectionRef.current,
        currentlyHeaderRef.current,
        currentlyContentRef.current,
        featuresListRef.current,
        educationHeaderRef.current,
        educationContentRef.current
      ].filter(Boolean);

      gsap.set(sections, {
        y: 60,
        opacity: 0,
        filter: "blur(8px)"
      });

      // Animate title section with emoji spin
      if (titleRef.current) {
        const emoji = titleRef.current.querySelector('.emoji');
        if (emoji) {
          gsap.set(emoji, { rotation: -180, scale: 0 });
          tl.to(emoji, {
            rotation: 0,
            scale: 1,
            duration: 0.6,
            ease: "back.out(1.7)"
          }, 0);
        }

        tl.to(titleRef.current, {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.6,
          ease: "power3.out"
        }, 0);
      }

      // Stagger main content sections
      const mainSections = [
        introParagraphRef.current,
        goalsParagraphRef.current
      ].filter(Boolean);

      tl.to(mainSections, {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.2
      }, 0.3);

      // Skills header with emoji bounce
      if (skillsHeaderRef.current) {
        const emoji = skillsHeaderRef.current.querySelector('.emoji');
        if (emoji) {
          gsap.set(emoji, { scale: 0, rotation: -90 });
          tl.to(emoji, {
            scale: 1,
            rotation: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.5)"
          }, 0.9);
        }

        tl.to(skillsHeaderRef.current, {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.6,
          ease: "power3.out"
        }, 0.9);
      }

      // Skills description and tech section
      tl.to([skillsDescRef.current, techSectionRef.current].filter(Boolean), {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.15
      }, 1.2);

      // Currently header with pin emoji rotation
      if (currentlyHeaderRef.current) {
        const emoji = currentlyHeaderRef.current.querySelector('.emoji');
        if (emoji) {
          gsap.set(emoji, { rotation: 45, scale: 0 });
          tl.to(emoji, {
            rotation: 0,
            scale: 1,
            duration: 0.5,
            ease: "back.out(1.7)"
          }, 1.8);
        }

        tl.to(currentlyHeaderRef.current, {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.6,
          ease: "power3.out"
        }, 1.8);
      }

      // Currently content
      tl.to(currentlyContentRef.current, {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.6,
        ease: "power3.out"
      }, 2.1);

      // Animate bullet points individually
      if (featuresListRef.current) {
        const listItems = featuresListRef.current.querySelectorAll('li');
        gsap.set(listItems, {
          x: -30,
          opacity: 0,
          scale: 0.8
        });

        tl.to(listItems, {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "back.out(1.7)",
          stagger: 0.1
        }, 2.4);
      }

      // Education header with graduation cap emoji
      if (educationHeaderRef.current) {
        const emoji = educationHeaderRef.current.querySelector('.emoji');
        if (emoji) {
          gsap.set(emoji, { y: -20, rotation: -15, scale: 0 });
          tl.to(emoji, {
            y: 0,
            rotation: 0,
            scale: 1,
            duration: 0.6,
            ease: "bounce.out"
          }, 2.7);
        }

        tl.to(educationHeaderRef.current, {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.6,
          ease: "power3.out"
        }, 2.7);
      }

      // Education content
      tl.to(educationContentRef.current, {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.6,
        ease: "power3.out"
      }, 3.0);

    } else {
      // If already animated, show everything immediately
      const allElements = [
        titleRef.current,
        introParagraphRef.current,
        goalsParagraphRef.current,
        skillsHeaderRef.current,
        skillsDescRef.current,
        techSectionRef.current,
        currentlyHeaderRef.current,
        currentlyContentRef.current,
        featuresListRef.current,
        educationHeaderRef.current,
        educationContentRef.current
      ].filter(Boolean);

      gsap.set(allElements, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)"
      });

      // Set emojis to normal state
      const emojis = container.current?.querySelectorAll('.emoji');
      if (emojis) {
        gsap.set(emojis, {
          scale: 1,
          rotation: 0,
          y: 0
        });
      }

      // Set list items to normal state
      if (featuresListRef.current) {
        const listItems = featuresListRef.current.querySelectorAll('li');
        gsap.set(listItems, {
          x: 0,
          opacity: 1,
          scale: 1
        });
      }
    }
  }, { scope: container, dependencies: [hasAnimated] });

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
    "change the world 🌍",
    "create equality 🤝🏼",
    "learn languages 🔊",
    "increase discipline 😶",
    "climb mountains 🗻",
  ];
  const title2words = ["Presently", "Recently", "Nowadays", "Lately"];
  const techwords = ["Technology", "Stacks", "Services", "Tools"];
  const title3words = [
    "Additionally",
    "Furthermore",
    "Moreover",
    "Finally",
    "Also",
    "In Conclusion",
  ];

  return (
    <main ref={container} className="p-8 font-body">
      <div
        ref={titleRef}
        style={{
          opacity: hasAnimated ? 1 : 0,
          transform: hasAnimated ? 'translateY(0px)' : 'translateY(60px)',
          filter: hasAnimated ? 'blur(0px)' : 'blur(8px)'
        }}
      >
        <span className="text-3xl emoji">📝</span>{" "}
        <ClientWord
          initial="Documentation"
          words={titlewords}
          className="cursor-pointer text-2xl md:text-3xl underline transition-all duration-200 ease-in-out hover:text-nice-blue"
        />
      </div>

      <p
        ref={introParagraphRef}
        className="mt-8"
        style={{
          opacity: hasAnimated ? 1 : 0,
          transform: hasAnimated ? 'translateY(0px)' : 'translateY(60px)',
          filter: hasAnimated ? 'blur(0px)' : 'blur(8px)'
        }}
      >
        For as long as I can remember, I&apos;ve always been the{" "}
        <ClientWord
          initial="tech support"
          words={computerwords}
          className="cursor-pointer underline transition-all duration-200 ease-in-out hover:text-nice-blue"
        />{" "}
        in my family 💻. Honestly, I have to give credit to gaming for starting
        me off.
      </p>

      <p
        ref={goalsParagraphRef}
        className="mb-8 mt-6"
        style={{
          opacity: hasAnimated ? 1 : 0,
          transform: hasAnimated ? 'translateY(0px)' : 'translateY(60px)',
          filter: hasAnimated ? 'blur(0px)' : 'blur(8px)'
        }}
      >
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

      <div
        ref={skillsHeaderRef}
        style={{
          opacity: hasAnimated ? 1 : 0,
          transform: hasAnimated ? 'translateY(0px)' : 'translateY(60px)',
          filter: hasAnimated ? 'blur(0px)' : 'blur(8px)'
        }}
      >
        <span className="text-3xl emoji">🔧</span>{" "}
        <ClientWord
          initial="Skills"
          words={techwords}
          className="cursor-pointer text-2xl md:text-3xl underline transition-all duration-200 ease-in-out hover:text-nice-blue"
        />
      </div>

      <p
        ref={skillsDescRef}
        className="mt-8"
        style={{
          opacity: hasAnimated ? 1 : 0,
          transform: hasAnimated ? 'translateY(0px)' : 'translateY(60px)',
          filter: hasAnimated ? 'blur(0px)' : 'blur(8px)'
        }}
      >
        I&apos;m quite the multi-disciplinary engineer having dabbled in all the
        fun stuff:
      </p>

      <div
        ref={techSectionRef}
        className="mb-8"
        style={{
          opacity: hasAnimated ? 1 : 0,
          transform: hasAnimated ? 'translateY(0px)' : 'translateY(60px)',
          filter: hasAnimated ? 'blur(0px)' : 'blur(8px)'
        }}
      >
        <ClientTechView />
      </div>

      <div
        ref={currentlyHeaderRef}
        style={{
          opacity: hasAnimated ? 1 : 0,
          transform: hasAnimated ? 'translateY(0px)' : 'translateY(60px)',
          filter: hasAnimated ? 'blur(0px)' : 'blur(8px)'
        }}
      >
        <span className="text-3xl emoji">📌</span>{" "}
        <ClientWord
          initial="Currently"
          words={title2words}
          className="cursor-pointer text-2xl md:text-3xl underline transition-all duration-200 ease-in-out hover:text-nice-blue"
        />
      </div>

      <div
        ref={currentlyContentRef}
        style={{
          opacity: hasAnimated ? 1 : 0,
          transform: hasAnimated ? 'translateY(0px)' : 'translateY(60px)',
          filter: hasAnimated ? 'blur(0px)' : 'blur(8px)'
        }}
      >
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
      </div>

      <ul
        ref={featuresListRef}
        className="mb-8 mt-4 list-inside list-disc space-y-1 pl-8"
        style={{
          opacity: hasAnimated ? 1 : 0
        }}
      >
        <li style={{ opacity: hasAnimated ? 1 : 0, transform: hasAnimated ? 'translateX(0px) scale(1)' : 'translateX(-30px) scale(0.8)' }}>Usage-based pricing (per prompt or API call)</li>
        <li style={{ opacity: hasAnimated ? 1 : 0, transform: hasAnimated ? 'translateX(0px) scale(1)' : 'translateX(-30px) scale(0.8)' }}>Credit-based billing with wallet-native payments</li>
        <li style={{ opacity: hasAnimated ? 1 : 0, transform: hasAnimated ? 'translateX(0px) scale(1)' : 'translateX(-30px) scale(0.8)' }}>Transaction fees from onchain actions (swaps, bridges, mints)</li>
        <li style={{ opacity: hasAnimated ? 1 : 0, transform: hasAnimated ? 'translateX(0px) scale(1)' : 'translateX(-30px) scale(0.8)' }}>Automatic, trustless revenue streams</li>
        <li style={{ opacity: hasAnimated ? 1 : 0, transform: hasAnimated ? 'translateX(0px) scale(1)' : 'translateX(-30px) scale(0.8)' }}>Smart wallet integration with no popups</li>
        <li style={{ opacity: hasAnimated ? 1 : 0, transform: hasAnimated ? 'translateX(0px) scale(1)' : 'translateX(-30px) scale(0.8)' }}>Built-in analytics and revenue tracking</li>
      </ul>

      <div
        ref={educationHeaderRef}
        style={{
          opacity: hasAnimated ? 1 : 0,
          transform: hasAnimated ? 'translateY(0px)' : 'translateY(60px)',
          filter: hasAnimated ? 'blur(0px)' : 'blur(8px)'
        }}
      >
        <span className="text-3xl emoji">🎓</span>{" "}
        <span className="text-2xl md:text-3xl">Education</span>
      </div>

      <div
        ref={educationContentRef}
        className="mt-8 mb-8"
        style={{
          opacity: hasAnimated ? 1 : 0,
          transform: hasAnimated ? 'translateY(0px)' : 'translateY(60px)',
          filter: hasAnimated ? 'blur(0px)' : 'blur(8px)'
        }}
      >
        <p className="font-bold">Bachelor of Engineering - IT</p>
        <p className="italic">L. D. College of Engineering, Ahmedabad</p>
      </div>
    </main>
  );
};

export default About;
