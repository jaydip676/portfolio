"use client";

import React, { useState, useEffect, useRef } from "react";

interface ClientWordProps {
  initial: string;
  words: Array<string>;
  className: string;
}

const ClientWord: React.FC<ClientWordProps> = ({
  initial,
  words,
  className,
}) => {
  const [currentWord, setCurrentWord] = useState(initial);
  const [isClient, setIsClient] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Scramble text effect
  const scrambleText = (element: HTMLElement, finalText: string, duration: number = 0.3) => {
    const chars = "0&%#$@*&@!&#*";
    let frame = 0;
    const totalFrames = duration * 60;
    const finalLength = finalText.length;

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
        setIsAnimating(false);
      }
    };

    scramble();
  };

  // event handler with scramble animation
  const changeWord = () => {
    if (words && !isAnimating && spanRef.current) {
      setIsAnimating(true);

      const currentIndex = words.indexOf(currentWord);
      let newIndex = currentIndex + 1;
      if (newIndex === words.length) {
        newIndex = 0;
      }

      const newWord = words[newIndex];

      // Update state immediately for next click calculation
      setCurrentWord(newWord);

      // Start scramble animation
      scrambleText(spanRef.current, newWord, 0.4);
    }
  };

  return (
    <span
      ref={spanRef}
      className={`${className} ${isAnimating ? 'cursor-wait' : 'cursor-pointer'}`}
      onClick={changeWord}
    >
      {isClient ? currentWord : initial}
    </span>
  );
};

export default ClientWord;
