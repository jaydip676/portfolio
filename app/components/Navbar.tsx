"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useAnimatedTitle } from "../hooks/useAnimatedTitle";

// Register GSAP plugin
gsap.registerPlugin(useGSAP);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState<boolean | null>(null); // null = loading
  const container = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLDivElement[]>([]);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const titleIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  // Auto-rotating titles for mobile menu
  const autoTitles = [
    "Full Stack Engineer",
    "Problem Solver",
    "Code Architect",
    "Tech Innovator",
    "Web3 Builder",
    "AI Enthusiast",
  ];

  const buttons = [
    { name: "Home", path: "/", scrambleChars: "0&%#$@*&" },
    { name: "About", path: "/about", scrambleChars: "!@#$%^&*()_+" },
    { name: "Projects", path: "/projects", scrambleChars: "[]{}|\\:;\"'<>?/" },
    { name: "Experience", path: "/experience", scrambleChars: "~`!@#$%^&*()_+-=" },
  ];

  // Enhanced scramble text effect that builds from empty with custom characters
  const scrambleText = (element: HTMLElement, finalText: string, duration: number = 0.4, customChars?: string, onComplete?: () => void) => {
    const chars = customChars || "!<>-_\\/[]{}—=+*^?#________";
    let frame = 0;
    const totalFrames = duration * 60;
    const finalLength = finalText.length;

    // Start with empty content
    element.textContent = "";

    const scramble = () => {
      const progress = frame / totalFrames;
      let scrambledText = "";
      const currentLength = Math.floor(progress * finalLength);

      // Build text progressively
      for (let i = 0; i < finalLength; i++) {
        if (i < currentLength) {
          // Characters that are "locked in"
          if (progress > (i + 0.5) / finalLength) {
            scrambledText += finalText[i];
          } else {
            // Still scrambling this character
            scrambledText += chars[Math.floor(Math.random() * chars.length)];
          }
        } else if (i === currentLength && Math.random() > 0.4) {
          // Sometimes show preview of next character
          scrambledText += chars[Math.floor(Math.random() * chars.length)];
        }
      }

      element.textContent = scrambledText;

      if (frame < totalFrames) {
        frame++;
        requestAnimationFrame(scramble);
      } else {
        element.textContent = finalText;
        if (onComplete) onComplete();
      }
    };

    scramble();
  };

  // Auto-cycle titles with direct scramble transition (like ClientWord)
  const startTitleCycle = () => {
    let currentIndex = 0;

    const cycleTitle = () => {
      if (titleRef.current && isMenuOpen) {
        const nextTitle = autoTitles[currentIndex];

        // Direct transition from current word to new word (like ClientWord)
        scrambleText(titleRef.current, nextTitle, 0.6, "0&%#$@*&@!&#*", () => {
          currentIndex = (currentIndex + 1) % autoTitles.length;
        });
      }
    };

    // Start immediately with first title
    if (titleRef.current && isMenuOpen) {
      const firstTitle = autoTitles[currentIndex];
      scrambleText(titleRef.current, firstTitle, 0.6, "0&%#$@*&@!&#*", () => {
        currentIndex = (currentIndex + 1) % autoTitles.length;
      });
    }

    // Set up interval for continuous cycling
    titleIntervalRef.current = setInterval(cycleTitle, 3000); // Change every 3 seconds
  };

  // Stop title cycling
  const stopTitleCycle = () => {
    if (titleIntervalRef.current) {
      clearInterval(titleIntervalRef.current);
      titleIntervalRef.current = null;
    }
  };

  // Check if mobile screen
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Handle scroll for color change
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fast and smooth GSAP animations
  useGSAP(() => {
    if (isMenuOpen && overlayRef.current) {
      const tl = gsap.timeline();

      // Faster overlay animation
      tl.fromTo(overlayRef.current,
        {
          x: "-100%",
          opacity: 0,
          scale: 1.05
        },
        {
          x: "0%",
          opacity: 1,
          scale: 1,
          duration: 0.25,
          ease: "power3.out"
        }
      )

        // Much faster menu items animation
        .fromTo(menuItemsRef.current,
          {
            opacity: 0,
            rotationX: -45,
            transformOrigin: "center center",
            filter: "blur(5px)",
            scale: 0.8
          },
          {
            opacity: 1,
            rotationX: 0,
            filter: "blur(0px)",
            scale: 1,
            duration: 0.2,
            ease: "back.out(1.2)",
            stagger: {
              amount: 0.08,
              from: "start",
              ease: "power2.out"
            },
            onComplete: () => {
              // Start faster scramble effect immediately
              menuItemsRef.current.forEach((item, index) => {
                const link = item?.querySelector('a') as HTMLElement;
                if (link) {
                  // Clear initial text
                  link.textContent = "";
                  setTimeout(() => {
                    scrambleText(link, buttons[index].name, 0.3, buttons[index].scrambleChars);
                  }, index * 60);
                }
              });
            }
          }, 0.05
        )

        // Faster title animation with auto-cycling
        .call(() => {
          setTimeout(() => {
            startTitleCycle();
          }, 200);
        }, [], 0.4);
    }
  }, { dependencies: [isMenuOpen] });

  const openMenu = () => {
    setIsMenuOpen(true);
  };

  const closeMenu = () => {
    // Stop title cycling
    stopTitleCycle();

    const tl = gsap.timeline();

    // Kill all particle animations
    particlesRef.current.forEach(particle => {
      if (particle) {
        gsap.killTweensOf(particle);
      }
    });

    // Fast close animation
    tl.to(menuItemsRef.current, {
      opacity: 0,
      rotationX: 45,
      filter: "blur(5px)",
      scale: 0.8,
      duration: 0.2,
      ease: "power2.in",
      stagger: {
        amount: 0.1,
        from: "end",
        ease: "power2.in"
      }
    })
      .to(titleRef.current, {
        opacity: 0,
        scale: 1,
        duration: 0.2,
        ease: "power2.in"
      }, 0.05)
      .to(particlesRef.current, {
        opacity: 0,
        scale: 0,
        duration: 0.3,
        ease: "power2.in",
        stagger: 0.02
      }, 0.1)
      .to(overlayRef.current, {
        x: "-100%",
        opacity: 0,
        scale: 1.05,
        duration: 0.25,
        ease: "power3.in",
        onComplete: () => setIsMenuOpen(false)
      }, 0.2);
  };

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      stopTitleCycle(); // Ensure title cycling stops when menu closes
    }

    return () => {
      document.body.style.overflow = "unset";
      stopTitleCycle(); // Cleanup on unmount
    };
  }, [isMenuOpen]);



  return (
    <div>
      {/* Desktop navigation - hidden on mobile by default */}
      <div className="hidden md:flex md:flex-col md:justify-center md:space-y-4 md:mt-32 gap-4 ">
        {buttons.map((button, index) => (
          <Link
            key={index}
            href={button.path}
            className="group max-w-max relative rounded-md px-0 py-1 transition-all duration-300"
            style={{
              color: pathname === button.path ? "#ffffff" : "text-[#979797]"
            }}
          >
            <span
              className={`relative z-10 transition-colors duration-300 ${pathname === button.path ? "text-white" : "text-[#979797]"} group-hover:text-white`}
            >
              {button.name}
            </span>
            {/* Underline that comes from the left on hover */}
            <div className={`absolute bottom-0 left-0 h-0.5 w-0 bg-white transition-all duration-300 ease-out group-hover:w-full ${pathname === button.path ? "w-full" : "w-0"}`} />
          </Link>
        ))}
      </div>

      {/* Mobile navigation - shown on mobile by default */}
      <div ref={container} className="md:hidden">
        {/* Hamburger Menu Button */}
        <button
          ref={hamburgerRef}
          onClick={openMenu}
          className="fixed top-6 left-6 z-30 flex h-12 w-12 flex-col items-center justify-center rounded-full bg-black/80 backdrop-blur-sm transition-all duration-300 hover:bg-black/90 hover:scale-110 active:scale-95"
          aria-label="Open menu"
        >
          <div className="flex flex-col gap-1">
            <div className="h-0.5 w-6 bg-white transition-all duration-300"></div>
            <div className="h-0.5 w-6 bg-white transition-all duration-300"></div>
            <div className="h-0.5 w-6 bg-white transition-all duration-300"></div>
          </div>
        </button>

        {/* Full Screen Overlay Menu */}
        {isMenuOpen && (
          <div
            ref={overlayRef}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-md"
            style={{
              transform: "translateX(-100%)",
              background: "radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3), transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3), transparent 50%), radial-gradient(circle at 40% 80%, rgba(120, 219, 255, 0.3), transparent 50%), rgba(0, 0, 0, 0.95)"
            }}
          >
            {/* Close Button */}
            <button
              onClick={closeMenu}
              className="group absolute right-6 top-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:scale-110"
              aria-label="Close menu"
            >
              <div className="relative flex items-center justify-center">
                <div className="absolute h-0.5 w-6 rotate-45 bg-white transition-all duration-300 group-hover:bg-red-400"></div>
                <div className="absolute h-0.5 w-6 -rotate-45 bg-white transition-all duration-300 group-hover:bg-red-400"></div>
              </div>
            </button>

            {/* Menu Items */}
            <div className="flex h-full flex-col items-center justify-center space-y-12">
              {buttons.map((button, index) => (
                <div
                  key={index}
                  ref={(el) => {
                    if (el) {
                      menuItemsRef.current[index] = el;
                      // Add subtle floating animation after menu is open
                      if (isMenuOpen) {
                        gsap.to(el, {
                          rotation: "random(-2, 2)",
                          duration: "random(4, 6)",
                          repeat: -1,
                          yoyo: true,
                          ease: "sine.inOut",
                          delay: index * 0.3
                        });
                      }
                    }
                  }}
                  className="group relative opacity-0"
                >
                  <Link
                    href={button.path}
                    onClick={closeMenu}
                    className={`relative text-5xl font-light transition-all duration-300 hover:scale-110 ${pathname === button.path
                      ? "text-white font-normal"
                      : "text-gray-400 hover:text-white"
                      }`}
                    onMouseEnter={(e) => {
                      gsap.to(e.currentTarget, {
                        scale: 1.05,
                        textShadow: "0 0 20px rgba(255,255,255,0.5)",
                        duration: 0.2,
                        ease: "power2.out"
                      });
                    }}
                    onMouseLeave={(e) => {
                      gsap.to(e.currentTarget, {
                        scale: 1,
                        textShadow: "none",
                        duration: 0.2,
                        ease: "power2.out"
                      });
                    }}
                  >
                    {/* Text will be populated by scramble effect */}
                  </Link>

                  {/* Animated underline */}
                  <div className="absolute -bottom-2 left-0 h-0.5 w-0 bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 group-hover:w-full" />
                </div>
              ))}
            </div>

            {/* Decorative Elements */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
              <p className="text-lg font-light text-gray-400 mb-2">
                Jaydip Patel
              </p>
              <p
                ref={titleRef}
                className="text-sm text-gray-500 font-mono tracking-wider"
              >
                Full Stack Engineer
                {/* Text will be populated by scramble effect */}
              </p>
            </div>

            {/* Floating particles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  ref={(el) => {
                    if (el) {
                      particlesRef.current[i] = el;
                      if (isMenuOpen) {
                        // Animate particles floating around
                        gsap.set(el, {
                          x: Math.random() * window.innerWidth,
                          y: Math.random() * window.innerHeight,
                          opacity: 0
                        });

                        gsap.to(el, {
                          opacity: Math.random() * 0.6 + 0.2,
                          duration: 1,
                          ease: "power2.out",
                          delay: i * 0.1
                        });

                        // Continuous floating motion
                        gsap.to(el, {
                          x: `+=${Math.random() * 200 - 100}`,
                          y: `+=${Math.random() * 200 - 100}`,
                          duration: Math.random() * 8 + 6,
                          repeat: -1,
                          yoyo: true,
                          ease: "sine.inOut",
                          delay: Math.random() * 2
                        });

                        // Subtle pulsing
                        gsap.to(el, {
                          scale: Math.random() * 0.5 + 0.5,
                          duration: Math.random() * 3 + 2,
                          repeat: -1,
                          yoyo: true,
                          ease: "sine.inOut",
                          delay: Math.random() * 2
                        });
                      }
                    }
                  }}
                  className="absolute w-1 h-1 bg-white/30 rounded-full"
                  style={{
                    left: 0,
                    top: 0,
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
