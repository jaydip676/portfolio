"use client";

import React, { useState, useEffect } from "react";

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

  useEffect(() => {
    setIsClient(true);
  }, []);

  // event handler
  const changeWord = () => {
    if (words) {
      const currentIndex = words.indexOf(currentWord);
      let newIndex = currentIndex + 1;
      if (newIndex === words.length) {
        newIndex = 0;
      }

      const newWord = words[newIndex];
      setCurrentWord(newWord);
    }
  };

  return (
    <span className={className} onClick={changeWord}>
      {isClient ? currentWord : initial}
    </span>
  );
};

export default ClientWord;
