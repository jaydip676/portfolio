"use client";

import React from "react";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mb-[10vh]">
      <div className="flex justify-center space-x-4">
        <Link
          href="https://www.linkedin.com/in/jaydip676"
          className="flex items-center justify-center opacity-30 transition-all duration-200 ease-in-out text-white hover:opacity-100"
          aria-label="LinkedIn"
        >
          <FaLinkedin className="h-6 w-6" />
        </Link>
        <Link
          href="https://github.com/jaydip676"
          className=" flex items-center justify-center opacity-30 transition-all duration-200 ease-in-out text-white hover:opacity-100"
          aria-label="GitHub"
        >
          <FaGithub className="h-6 w-6" />
        </Link>
        <Link
          href="https://x.com/jdpatel676"
          className="flex items-center justify-center opacity-30 transition-all duration-200 ease-in-out text-white hover:opacity-100"
          aria-label="X (Twitter)"
        >
          <FaTwitter className="h-6 w-6" />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
