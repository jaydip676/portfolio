import { useEffect, useRef } from "react";

const isMobile = () =>
  typeof window !== "undefined" &&
  /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function useAnimatedTitle() {
  const stateRef = useRef({
    msgIndex: 0,
    charIndex: 0,
    deleting: false,
    isBlurred: false,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isMobile()) return;
    if (prefersReducedMotion()) return;

    // Constant emoji prefix - never changes
    const emojiPrefix = "🚀 ";
    
    // Only the text part animates
    const messages = [
      "Shipping faster",
      "Build smarter",
      "Your idea → product",
    ];

    const blurMessage = "👀 Still there?";
    const originalTitle = document.title;

    let interval: NodeJS.Timeout;
    let pauseTimeout: NodeJS.Timeout;

    const typeTick = () => {
      const state = stateRef.current;
      
      // Don't animate if tab is blurred
      if (state.isBlurred) return;

      const text = messages[state.msgIndex];

      if (!state.deleting) {
        // Typing forward - always show emoji prefix + animated text
        const currentText = text.slice(0, state.charIndex);
        document.title = emojiPrefix + currentText;
        state.charIndex++;

        if (state.charIndex > text.length) {
          // Pause at end before deleting
          clearInterval(interval);
          pauseTimeout = setTimeout(() => {
            state.deleting = true;
            interval = setInterval(typeTick, 50); // Faster delete speed
          }, 1500); // Pause for 1.5s at end
        }
      } else {
        // Deleting backward - keep emoji, delete text
        state.charIndex--;
        const currentText = text.slice(0, state.charIndex);
        document.title = emojiPrefix + currentText;

        if (state.charIndex <= 0) {
          // Move to next message
          state.deleting = false;
          state.msgIndex = (state.msgIndex + 1) % messages.length;
          
          // Brief pause before next message (emoji stays visible)
          clearInterval(interval);
          pauseTimeout = setTimeout(() => {
            interval = setInterval(typeTick, 80); // Resume typing speed
          }, 300);
        }
      }
    };

    const startAnimation = () => {
      const state = stateRef.current;
      state.msgIndex = 0;
      state.charIndex = 0;
      state.deleting = false;
      state.isBlurred = false;

      clearInterval(interval);
      clearTimeout(pauseTimeout);
      
      // Start with just the emoji visible
      document.title = emojiPrefix;
      interval = setInterval(typeTick, 80); // Fast typing speed
    };

    const onBlur = () => {
      stateRef.current.isBlurred = true;
      clearInterval(interval);
      clearTimeout(pauseTimeout);
      document.title = blurMessage;
    };

    const onFocus = () => {
      if (stateRef.current.isBlurred) {
        startAnimation();
      }
    };

    // Start the animation
    startAnimation();

    window.addEventListener("blur", onBlur);
    window.addEventListener("focus", onFocus);

    return () => {
      clearInterval(interval);
      clearTimeout(pauseTimeout);
      document.title = originalTitle;
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("focus", onFocus);
    };
  }, []);
}
