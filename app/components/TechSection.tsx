import React from "react";
import {
  SiReact,
  SiJavascript,
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiPostgresql,
  SiHtml5,
  SiCss3,
  SiMongodb,
  SiDocker,
  SiGit,
  SiVercel,
  SiSolidity,
  SiRailway,
  SiExpress,
  SiEthereum,
  SiGithubactions,
  SiSocketdotio,
  SiJest,
} from "@icons-pack/react-simple-icons";

import { FaJava } from "react-icons/fa";
import { SiThreedotjs } from "react-icons/si";
import Image from "next/image";

const TechSection: React.FC<{ activeSection: string }> = ({
  activeSection,
}) => {
  // const frontEndIcons: { icon: JSX.Element; name: string }[] = [
  //   { icon: <SiTypescript />, name: "TypeScript" },
  //   { icon: <SiJavascript />, name: "JavaScript" },
  //   { icon: <SiReact />, name: "React" },
  //   { icon: <SiNextdotjs />, name: "Next.js" },
  //   { icon: <SiVite />, name: "Vite" },
  //   { icon: <SiVercel />, name: "Vercel" },
  //   { icon: <SiTailwindcss />, name: "Tailwind CSS" },
  //   { icon: <SiFigma />, name: "Figma" },
  // ];

  const iconClass = "w-6 h-6"; // Tailwind CSS classes for consistent icon size

  const webIcons: { icon: React.ReactNode; name: string }[] = [
    { icon: <SiReact className={iconClass} />, name: "React.js" },
    { icon: <SiNextdotjs className={iconClass} />, name: "Next.js" },
    { icon: <SiTailwindcss className={iconClass} />, name: "Tailwind CSS" },
    { icon: <SiThreedotjs className={iconClass} />, name: "Three.js" },
    { icon: <SiNodedotjs className={iconClass} />, name: "Node.js" },
    { icon: <SiExpress className={iconClass} />, name: "Express.js" },
    { icon: <SiSocketdotio className={iconClass} />, name: "Socket.io" },
    { icon: <SiPostgresql className={iconClass} />, name: "PostgreSQL" },
    { icon: <SiMongodb className={iconClass} />, name: "MongoDB" },
    { icon: <SiHtml5 className={iconClass} />, name: "HTML" },
    { icon: <SiCss3 className={iconClass} />, name: "CSS" },
    { icon: <SiTypescript className={iconClass} />, name: "TypeScript" },
    // { icon: <SiJavascript className={iconClass} />, name: "JavaScript" },
  ];

  const web3Icons: { icon: React.ReactNode; name: string }[] = [
    { icon: <SiEthereum className={iconClass} />, name: "Ethers.js" },
    { icon: <SiSolidity className={iconClass} />, name: "Solidity" },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 629 629" fill="none"><div id="in-page-channel-node-id" data-channel-name="in_page_channel_wvTJCv" />
        <g clipPath="url(#clip0_131_142)">
          <path fillRule="evenodd" clipRule="evenodd" d="M71.788 366.47C71.788 386.294 87.8583 402.364 107.682 402.364H179.47C199.294 402.364 215.364 386.294 215.364 366.47L215.364 222.894C215.364 203.07 231.434 187 251.258 187C271.082 187 287.152 203.07 287.152 222.894V366.47C287.152 386.294 303.222 402.364 323.046 402.364H394.834C414.658 402.364 430.728 386.294 430.728 366.47V222.894C430.728 203.07 446.798 187 466.622 187C486.446 187 502.516 203.07 502.516 222.894V438.258C502.516 458.082 486.446 474.152 466.622 474.152H35.894C16.0703 474.152 0 458.082 0 438.258L1.26782e-05 222.894C1.40786e-05 203.07 16.0703 187 35.894 187C55.7177 187 71.788 203.07 71.788 222.894L71.788 366.47ZM581.142 482.698C607.573 482.698 629 461.271 629 434.84C629 408.408 607.573 386.981 581.142 386.981C554.71 386.981 533.283 408.408 533.283 434.84C533.283 461.271 554.71 482.698 581.142 482.698Z" fill="white" />
        </g>
      </svg>, name: "Wagmi"
    },
    {
      icon: <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
        width="24px" height="24px" viewBox="0 0 64 64" enableBackground="new 0 0 64 64">
        <path fill="#ffffff" opacity="1.000000" stroke="none"
          d="
   M16.702600,33.822426 
     C14.726636,26.240801 16.078367,19.844564 21.890856,14.932594 
     C26.998871,10.615957 32.927422,9.665537 39.185528,12.044909 
     C46.661514,14.887324 50.690292,21.575796 50.131927,29.769522 
     C49.644173,36.927120 44.098740,43.333282 37.018051,44.918873 
     C29.545036,46.592312 22.055643,43.420410 18.156351,36.892582 
     C17.648251,36.041969 17.304850,35.092976 16.702600,33.822426 
   z"/>
        <path fill="#ffffff" opacity="1.000000" stroke="none"
          d="
   M35.538509,55.310631 
     C30.591501,54.999668 26.065481,54.683739 20.583429,54.301075 
     C25.447105,49.791718 38.172863,49.450886 44.617645,53.799644 
     C41.731594,54.301647 38.845547,54.803654 35.538509,55.310631 
   z"/>
      </svg>, name: "Privy"
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 10 31" fill="none" className="nav--logo">
        <path fillRule="evenodd" clipRule="evenodd" d="M9.7381 8.21527C9.7381 10.2672 8.05309 11.9305 5.97452 11.9305C3.89595 11.9305 2.21094 10.2672 2.21094 8.21527C2.21094 6.16338 3.89595 4.5 5.97452 4.5C8.05309 4.5 9.7381 6.16338 9.7381 8.21527ZM11.9515 25.3055L6.59425 13.7254C6.53986 13.6086 6.45268 13.5097 6.34305 13.4403C6.23342 13.3709 6.10594 13.3341 5.97573 13.3341C5.84552 13.3341 5.71804 13.3709 5.60841 13.4403C5.49878 13.5097 5.41161 13.6086 5.35722 13.7254L0 25.3055H11.9515Z" fill="currentColor"></path>
      </svg>, name: "TurnKey"
    },
    {
      icon: <Image src="/viem.png" alt="Viem" width={24} height={24} />, name: "Viem"
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 256 177" version="1.1" preserveAspectRatio="xMidYMid">
        <g>
          <path d="M256,148.406607 C256,148.406607 217.007253,142.629903 196.402559,140.973019 C176.615112,139.383307 153.166846,138.465303 128.011319,138.465303 C102.855792,138.465303 79.4075265,139.383307 59.6256766,140.973019 C39.0153847,142.652294 0.0282356755,150.668029 0.0282356755,150.668029 L0.0282356755,160.743674 C0.0282356755,169.699803 57.3306685,176.976658 128.011319,176.976658 C198.69197,176.976658 255.994402,169.699803 255.994402,160.743674 L256,148.406607 Z" fill="white" />
          <path d="M88.6603273,14.7643691 C41.9255225,31.4163803 10.7166742,75.664588 10.7140171,125.277403 L10.7140171,141.891023 C27.3914169,137.906683 44.3954335,135.441138 61.5176588,134.524607 C61.4019755,131.337717 61.342268,128.126572 61.3385362,124.89117 C61.355329,81.2972124 71.8787806,42.0693674 88.6603273,14.7643691 Z" fill="white" />
          <path d="M245.30315,125.277403 C245.343126,98.0545432 235.873361,71.6726454 218.529795,50.6896416 C226.048491,74.7037573 229.794938,99.7392358 229.635395,124.902365 C229.635395,129.481186 229.517846,134.007763 229.282748,138.482096 C234.620105,139.303585 239.906987,140.424875 245.118303,141.840644 L245.30315,125.277403 Z" fill="white" />
          <path d="M245.30315,125.277403 C245.343126,98.0545432 235.873361,71.6726454 218.529795,50.6896416 C226.048491,74.7037573 229.794938,99.7392358 229.635395,124.902365 C229.635395,129.481186 229.517846,134.007763 229.282748,138.482096 C234.620105,139.303585 239.906987,140.424875 245.118303,141.840644 L245.30315,125.277403 Z" fill="white" />
          <path d="M218.529795,50.684044 C187.104313,12.5902868 135.200193,-1.76612429 88.6659248,14.7643691 C71.873183,42.0693674 61.355329,81.2972124 61.355329,124.896768 C61.355329,128.132169 61.4150365,131.343315 61.5344516,134.530204 C78.9989031,133.181187 99.2173643,132.347148 120.868806,132.196013 C120.868806,132.196013 125.78908,132.196013 128.022514,132.196013 C161.889262,131.789594 195.739449,133.898215 229.293943,138.504486 C229.521578,134.026422 229.639127,129.499845 229.64659,124.924756 C229.8055,99.7516578 226.055239,74.7064879 218.529795,50.684044 L218.529795,50.684044 Z" fill="white" />
          <g transform="translate(81.394668, 0.000000)" fill="white">
            <path d="M93.7986585,58.4422907 L86.3650714,11.9823716 C85.8370184,8.56415712 83.3879084,5.75552474 80.0733908,4.76709013 C58.4140349,-1.58903004 35.3846237,-1.58903004 13.7252677,4.76709013 C10.4129329,5.75734065 7.96632131,8.56560629 7.43918465,11.9823716 L0,58.4422907" />
          </g>
          <path d="M128.022514,131.210839 C125.783482,131.210839 123.561242,131.210839 121.355796,131.210839 L121.109502,131.210839 L120.863209,131.210839 C53.507521,131.681036 0.0338332561,138.756378 0.0338332561,147.415835 L0.0338332561,159.96561 C-0.075292123,160.701057 0.0815069892,161.451311 0.476042125,162.081496 C3.8969084,159.512263 7.8289966,157.706557 12.0070582,156.786185 C22.6478093,154.197131 33.4629332,152.386191 44.3666718,151.367727 C50.5593216,150.688461 56.7447402,152.70744 61.3441338,156.909331 C69.765567,164.618976 80.76931,168.894659 92.1868031,168.893752 L163.835835,168.893752 C175.253226,168.893752 186.256779,164.618506 194.678504,156.909331 L194.678504,156.909331 C199.277546,152.702584 205.466059,150.68122 211.661564,151.362129 C222.56347,152.380489 233.376741,154.191432 244.01558,156.780587 C247.972386,157.541461 251.709264,159.176584 254.953252,161.566519 C255.137973,161.751239 255.350681,161.913569 255.51301,162.081496 C255.91028,161.448201 256.069033,160.694128 255.960817,159.954415 L255.960817,147.40464 C256,138.476498 198.697567,131.210839 128.022514,131.210839 Z" fill="white" />
          <polygon fill="#6E6F70" points="154.980462 93.942147 127.988929 110.555766 127.988929 132.13444" />
          <polygon fill="#0A0A0A" points="128.016917 132.13444 128.016917 110.555766 101.025383 93.942147" />
          <polygon fill="#0A0A0A" points="101.025383 84.0848076 101.025383 84.0848076 128.016917 99.6908623 128.016917 40.4292763" />
          <polygon fill="#6E6F70" points="154.980462 84.0848076 127.988929 40.4236787 127.988929 40.4236787 127.988929 68.4731552 127.988929 68.4731552 127.988929 99.6852648 154.980462 84.07921 154.980462 84.07921" />
        </g>
      </svg>, name: "Hardhat"
    },
    {
      icon: <Image src="/rainbowkit.svg" alt="RainbowKit" width={24} height={24} />, name: "RainbowKit"
    },
  ];

  const toolsIcons: { icon: React.ReactNode; name: string }[] = [
    { icon: <SiDocker className={iconClass} />, name: "Docker" },
    { icon: <SiRailway className={iconClass} />, name: "Railway" },
    { icon: <SiGit className={iconClass} />, name: "Git" },
    { icon: <SiVercel className={iconClass} />, name: "Vercel" },
    { icon: <SiJest className={iconClass} />, name: "Jest" },
    { icon: <SiGithubactions className={iconClass} />, name: "GitHub Actions" },
  ];

  const renderIcons = (icons: { icon: React.ReactNode; name: string }[]) => (
    <ul className="mt-6 grid grid-cols-2 gap-6">
      {icons.map(({ icon, name }, index) => (
        <li
          key={index}
          className={`flex translate-y-4 animate-slideDown items-center gap-2 opacity-0`}
          style={{ animationDelay: `${index * 50}ms` }}
        >
          {icon}
          <span>{name}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className={`min-h-[264px] transition-opacity ${activeSection}`}>
      {/* manually set the height to prevent layout shift */}
      {activeSection === "web" && renderIcons(webIcons)}
      {activeSection === "web3" && renderIcons(web3Icons)}
      {activeSection === "tools" && renderIcons(toolsIcons)}
    </div>
  );
};

export default TechSection;
