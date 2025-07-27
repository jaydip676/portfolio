"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

// Register GSAP plugin
gsap.registerPlugin(useGSAP);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLDivElement[]>([]);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const pathname = usePathname();

  const buttons = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Experience", path: "/experience" },
  ];

  // Enhanced scramble text effect that builds from empty
  const scrambleText = (element: HTMLElement, finalText: string, duration: number = 0.6) => {
    const chars = "!<>-_\\/[]{}—=+*^?#________";
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
        } else if (i === currentLength && Math.random() > 0.3) {
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
      }
    };

    scramble();
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

  // Calculate text color based on scroll
  const getTextColor = () => {
    const maxScroll = 500;
    const opacity = Math.min(scrollY / maxScroll, 1);
    const grayValue = Math.round(64 + (255 - 64) * opacity);
    return `rgb(${grayValue}, ${grayValue}, ${grayValue})`;
  };

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
          duration: 0.4,
          ease: "power3.out"
        }
      )

        // Faster menu items animation
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
            duration: 0.6,
            ease: "back.out(1.2)",
            stagger: {
              amount: 0.2,
              from: "start",
              ease: "power2.out"
            },
            onComplete: () => {
              // Start scramble effect immediately
              menuItemsRef.current.forEach((item, index) => {
                const link = item?.querySelector('a') as HTMLElement;
                if (link) {
                  // Clear initial text
                  link.textContent = "";
                  setTimeout(() => {
                    scrambleText(link, buttons[index].name, 0.4);
                  }, index * 80);
                }
              });
            }
          }, 0.1
        )

        // Faster title animation
        .call(() => {
          if (titleRef.current) {
            titleRef.current.textContent = ""; // Start empty
            gsap.fromTo(titleRef.current,
              {
                opacity: 0,
                scale: 0.9
              },
              {
                opacity: 1,
                scale: 1,
                duration: 0.3,
                ease: "power2.out",
                onComplete: () => {
                  setTimeout(() => {
                    scrambleText(titleRef.current as HTMLElement, "Full Stack Engineer", 0.5);
                  }, 100);
                }
              }
            );
          }
        }, [], 0.8);
    }
  }, { dependencies: [isMenuOpen] });

  const openMenu = () => {
    setIsMenuOpen(true);
  };

  const closeMenu = () => {
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
      duration: 0.3,
      ease: "power2.in",
      stagger: {
        amount: 0.15,
        from: "end",
        ease: "power2.in"
      }
    })
      .to(titleRef.current, {
        opacity: 0,
        scale: 0.9,
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
        duration: 0.4,
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
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  // Desktop navigation
  if (!isMobile) {
    return (
      <div className="mb-4 flex justify-center sm:mb-0 sm:mt-32 sm:flex-col sm:justify-normal sm:space-y-4">
        {buttons.map((button, index) => (
          <Link
            key={index}
            href={button.path}
            className={`group relative rounded-md px-4 py-2 transition-all duration-300 hover:scale-105 ${pathname === button.path ? "font-semibold" : ""
              }`}
            style={{
              color: pathname === button.path ? "#ffffff" : getTextColor()
            }}
            onMouseEnter={(e) => {
              if (pathname !== button.path) {
                gsap.to(e.currentTarget, {
                  scale: 1.05,
                  duration: 0.3,
                  ease: "power2.out"
                });
              }
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
              });
            }}
          >
            <span className="relative z-10">{button.name}</span>
            {/* Subtle underline for active state */}
            {pathname === button.path && (
              <div className="absolute bottom-0 left-1/2 h-0.5 w-6 -translate-x-1/2 bg-white" />
            )}
          </Link>
        ))}
      </div>
    );
  }

  // Mobile navigation
  return (
    <div ref={container}>
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
            <div className="relative">
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
  );
};

export default Navbar;
