"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ClientNavButton: React.FC<{
  text: string;
  path: string;
  index: number;
}> = ({ text, path, index }) => {
  const pathname = usePathname();

  return (
    <Link
      href={path}
      className={`${index !== 3 ? "border-r" : ""} px-2 text-right font-body transition-all duration-200 ease-in-out sm:border-none sm:px-0 text-white hover:text-nice-blue ${pathname === path && "text-nice-blue"
        }`}
    >
      {text}
    </Link>
  );
};

export default ClientNavButton;
