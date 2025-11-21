import React, { useEffect, useRef, useState } from "react";
import Prism from "../components/Prism";
import TextType from "../components/TextType";
import GradientText from "../components/GradientText";
import ProfileCard from "../components/ProfileCard";
// import LogoLoop from "./components/LogoLoop";
// import type { LogoItem } from "./components/LogoLoop";

// import {
//   SiReact,
//   SiNextdotjs,
//   SiTypescript,
//   SiTailwindcss,
// } from "react-icons/si";
import CardNav, { CardNavItem } from "../components/CardNav";
// import DomeGallery from "./components/DomeGallery";
// import "./components/DomeGallery.css";
import StarBorder from "../components/StarBorder";
import ChromaGrid from "../components/ChromaGrid";
import InfiniteMenu from "../components/InfiniteMenu";
import ElectricLineSVG from "../components/ElectricLineSVG";
import { Link  } from "react-router-dom";

import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
// import { useNavigate } from "react-router-dom";

// import { createBrowserRouter } from "react-router-dom";
// import HomePage from "./components/HomePage";

// const ReactIcon = SiReact as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
// const NextIcon = SiNextdotjs as unknown as React.FC<
//   React.SVGProps<SVGSVGElement>
// >;
// const TsIcon = SiTypescript as unknown as React.FC<
//   React.SVGProps<SVGSVGElement>
// >;
// const TailwindIcon = SiTailwindcss as unknown as React.FC<
//   React.SVGProps<SVGSVGElement>
// >;

// const techLogos: LogoItem[] = [
//   { node: <ReactIcon />, title: "React", href: "https://react.dev" },
//   { node: <NextIcon />, title: "Next.js", href: "https://nextjs.org" },
//   {
//     node: <TsIcon />,
//     title: "TypeScript",
//     href: "https://www.typescriptlang.org",
//   },
//   {
//     node: <TailwindIcon />,
//     title: "Tailwind CSS",
//     href: "https://tailwindcss.com",
//   },
// ];

const items1 = [
  {
    image:
      "data:image/jpeg;base64,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", // Path relative to the public directory
    title: "Sarah Johnson",
    subtitle: "Frontend Developer",
    handle: "@agriculture",
    borderColor: "#3B82F6",
    gradient: "linear-gradient(145deg, #1435f5ff, #000000)",
    url: "https://www.linkedin.com/in/abhiman-b8145a37a",
  },
];

const items2 = [
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_QW0yDZHbGu9dS6MCdd0NgjIPSbqmqPnfGU2JItkdQEmh0ZV4NC71A9ZrtOAxgd7rpBM&usqp=CAU", // Path relative to the public directory
    title: "Sarah Johnson",
    subtitle: "Frontend Developer",
    handle: "@sarahjohnson",
    borderColor: "#0c68fdff",
    gradient: "linear-gradient(145deg, #1b06ffff, #7b666606)",
    url: "https://www.linkedin.com/in/abhiman-b8145a37a",
  },
];

const services = [
  {
    image: "./direct_buy.jpeg",
    title: "BUY from FARMER",
    description: "Buy your favorite vegetables and food , directly from farmer",
  },
  {
    image: "./buying.jpeg",

    title: "BUY from DISTRIBUTOR",
    description: "Buy your favaroite vegetables and fruits from distributor",
  },
  {
    image: "./selling.png",

    title: "SELL to DISTRIBUTOR ",
    description: "Sell you vegetables or fruit to distributor!",
  },
  {
    image: "./track.jpeg",
    title: "TRACK the DEAL",
    description: "Track the deals using transaction id and QR code",
  },
];

const Adpage: React.FC = () => {
  const [hidden, setHidden] = useState(false);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [qrHovered, setQrHovered] = useState(false);
  

  useEffect(() => {
    const handleScroll = () => {
      setHidden(true);

      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      scrollTimeout.current = setTimeout(() => {
        setHidden(false);
      }, 800);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  const items: CardNavItem[] = [
    {
      label: "About",
      bgColor: "#0D0716",
      textColor: "#fff",
      links: [
        { label: "Company", href: "/about", ariaLabel: "About Company" },
        { label: "Careers", href: "/careers", ariaLabel: "About Careers" },
      ],
    },
    {
      label: "Projects",
      bgColor: "#170D27",
      textColor: "#fff",
      links: [
        {
          label: "Featured",
          href: "/features",
          ariaLabel: "Featured Projects",
        },
        {
          label: "Case Studies",
          href: "/Projects",
          ariaLabel: "Project Case Studies",
        },
      ],
    },
    {
      label: "Contact",
      bgColor: "#271E37",
      textColor: "#fff",
      links: [
        { label: "Email", href: "/email", ariaLabel: "Email us" },
        { label: "Twitter", href: "/twitter", ariaLabel: "Twitter" },
        { label: "LinkedIn", href: "/linkedin", ariaLabel: "LinkedIn" },
      ],
    },
  ];

  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "black",
        position: "relative",
        minHeight: "120vh",
        overflowX: "hidden",
      }}
    >
      {/* ===== Prism fixed background ===== */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <Prism
          animationType="rotate"
          timeScale={0.5}
          height={3.5}
          baseWidth={5.5}
          scale={3.6}
          hueShift={0}
          colorFrequency={5}
          noise={0.1}
          glow={0.4}
        />
      </div>

      {/* ===== ProfileCard (with slide effect) ===== */}
      <div
        style={{
          position: "fixed",
          bottom: "2rem",
          right: "2rem",
          zIndex: 8000,
          transition: "transform 1s ease",
          transitionDelay: hidden ? "0s" : "30s",
          transform: hidden ? "translateX(140%)" : "translateX(0)",
        }}
      >
        <ProfileCard
          name="Abhiman"
          title="Software Engineer"
          handle="Abhiman"
          status="Missing"
          contactText="See more"
          avatarUrl="./app_logo.png"
          miniAvatarUrl="./app_logo.png"
          iconUrl="./app_logo.png"
          grainUrl="./app_logo.png"
          showUserInfo={true}
          enableTilt={true}
          enableMobileTilt={false}
          onContactClick={() => {
            window.open(
              "https://www.linkedin.com/in/abhiman-b8145a37a",
              "_blank",
            );
          }}
        />
      </div>

      {/* ===== Foreground content ===== */}
      <main
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          color: "white",
        }}
      >
        {/* Hero section */}
        <section
          style={{
            height: "40vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            padding: "2rem",
          }}
        >
          {/* Fixed header/nav */}
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              zIndex: 1000,
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <CardNav
              
              items={items}
              baseColor="rgba(235, 222, 222, 0.05)"
              menuColor="#0e0c0cff"
              buttonBgColor="#111"
              buttonTextColor="#fff"
              ease="power3.out"
              showSearch={true}
              onSearch={(query) => console.log("Search for:", query)}
              navButtons={[
                {
                  label: "Get Started",
                  href: "/Subscription",
                  bgColor: "#151414ff",
                },
              ]}
            />
          </div>

          {/* Hero Section */}
          <GradientText
            colors={[
              "#06754311",
              "#2037e5e8",
              "#8b1c29be",
              "#f7f7f7ff",
              "#77fa0bbe",
            ]}
            animationSpeed={10}
            showBorder={false}
          >
            <div style={{ paddingTop: "60px", textAlign: "center" }}>
              {/* 👆 paddingTop prevents navbar from overlapping the hero */}
              <span style={{ fontSize: "4rem", fontWeight: "800" }}>
                SPECIAL THANKS TO FARMERS
              </span>
            </div>
          </GradientText>

          <div style={{ marginTop: "1rem" }}>
            <TextType
              text={["FULLY DECENTRALISED AGRICULTURE SYSTEM ..."]}
              typingSpeed={120}
              pauseDuration={1500}
              showCursor={true}
              cursorCharacter="*"
              textColors={["#09f3ffff"]}
              style={{ fontSize: "2rem", fontWeight: "700" }}
            />
          </div>
        </section>
        {/* Content sections */}
        <section
          style={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
            borderTop: "1px solid rgba(255, 255, 255, 0)",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <h2
              style={{
                fontSize: "3rem",
                marginBottom: "5rem",
                color: "white",
                textShadow: "0 0 20px rgba(64,255,170,0.5)",
              }}
            >
              🌱 Project Overview
            </h2>
            <div
              style={{
                display: "flex",
                alignItems: "left",
                marginTop: "0.5rem",
                paddingLeft: 20,
              }}
            >
              <div style={{ height: "600px", position: "relative" }}>
                <ChromaGrid
                  items={items1}
                  radius={150}
                  damping={0.45}
                  fadeOut={1}
                  ease="power3.out"
                />
              </div>
              <TextType
                text={[
                  "\nDecentralised means fully transparent what ever \nyou transact no third party ,no mystery prices.\n\n👨‍🌾 Farmers get fair pay.                                 \n\n🛒 Consumers get the truth.                         \n\n🔗 Blockchain keeps everyone honest        \n\nSimple,Transparent.Fresh                \n\n               — just like your food! 🍅",
                ]}
                typingSpeed={5}
                pauseDuration={1500}
                showCursor={true}
                cursorCharacter="|"
                textColors={["#ccc6deff"]}
                style={{ fontSize: "200%", fontWeight: "700" }}
              />
              <div style={{ height: "600px", position: "relative" }}>
                <ChromaGrid
                  items={items2}
                  radius={150}
                  damping={0.45}
                  fadeOut={1}
                  ease="power3.out"
                />
              </div>
            </div>
            <StarBorder
              as="button"
              className="custom-class"
              color="Magenta"
              speed="5s"
              onClick={() => {
                window.open("https://www.youtube.com");
              }}
            >
              click here for more details about this project
            </StarBorder>
          </div>
        </section>
        <section
          style={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
            borderTop: "1px solid rgba(0, 0, 0, 0)",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <h2
              style={{
                fontSize: "3rem",
                marginBottom: "1rem",
                color: "white",
                textShadow: "0 0 20px rgba(255, 255, 1, 0.8)",
              }}
            >
              Our services
            </h2>
            <p>Check out our latest sevices</p>
            <div
              style={{
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                // padding: "1rem",
                borderTop: "1px solid rgba(0, 0, 0, 0)",
              }}
            >
              <InfiniteMenu items={services} />
            </div>
          </div>
        </section>
        {/* <div
          style={{
            width: "100vw",
            height: "120vh",
            overflow: "hidden",
            backgroundColor: "transparent",
          }}
        >
          <DomeGallery />
        </div> */}
        <section
          style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "20rem", // more space after h2
            justifyContent: "center",
            backgroundColor: "#0d0d0d01",
            position: "relative",
            lineHeight: "1", // space inside h2
          }}
        >
          <h2
            style={{
              marginTop: "2rem",
              fontSize: "3rem",
              color: "#ffffff",
              textShadow: "0 0 20px rgba(255, 11, 11, 1)",
              textAlign: "center",
              marginBottom: "3rem",
              fontFamily: "Poppins, sans-serif",
              letterSpacing: "2px",
              margin: "10%",
              padding: "1%",
            }}
          >
            FEATURES OF THIS PROJECT
          </h2>

          {/* ⚡ Main QR + connected boxes layout */}
          <div
            style={{
              position: "relative",
              width: "450px",
              height: "450px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "7px",
            }}
          >
            {/* 🔳 Center QR Code */}
            <div
              style={{
                width: "230px",
                height: "230px",
                backgroundColor: "rgba(16, 67, 120, 0)",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "16px",
                boxShadow: "0 0 30px rgba(255, 0, 115, 0.95)",
                backdropFilter: "blur(8px)",
                transition: "all 0.4s ease-in-out",
                cursor: "pointer",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
              onMouseEnter={(e) => {
                setQrHovered(true); // hide arrows
                e.currentTarget.style.transform =
                  "translate(-50%, -50%) scale(2) rotate(1800deg)";
                e.currentTarget.style.boxShadow =
                  "0 0 60px rgba(239, 14, 14, 0.8)";
              }}
              onMouseLeave={(e) => {
                setQrHovered(false); // show arrows
                e.currentTarget.style.transform =
                  "translate(-50%, -50%) scale(1)";
                e.currentTarget.style.boxShadow =
                  "0 0 30px rgba(4, 255, 63, 0.98)";
              }}
            >
              <img
                src="/qrcode.svg"
                alt="QR Code"
                style={{
                  width: "80%",
                  height: "80%",
                  objectFit: "contain",
                  transition: "transform 0.4s ease-in-out",
                }}
              />
            </div>

            {/* Boxes */}
            {[
              { pos: "top", text: "SCAN IT AND GET ALL DETAIL OF DEAL" },
              {
                pos: "bottom",
                text: "FOR EACH DEAL YOU GET A UNIQUE QR CODE TO SCAN",
              },
              { pos: "left", text: "YOU CAN SEE THE ORIGIN OF TRANSATION" },
              {
                pos: "right",
                text: "YOU CAN SEE ALL TYPE OF INFORMATION TO BUILD TRUST",
              },
            ].map((item, i) => {
              const style: React.CSSProperties = {
                position: "absolute",
                width: "300px",
                height: "150px",
                backgroundColor: "rgba(0, 0, 0, 0.49)",
                borderRadius: "8px",
                boxShadow: "0 0 20px rgba(24, 255, 8, 1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: "bold",
                textAlign: "center",
                fontFamily: "Poppins, sans-serif",
              };

              if (item.pos === "top") {
                style.top = "-20%";
                style.left = "120%";
                style.transform = "translateX(-50%)";
              } else if (item.pos === "bottom") {
                style.bottom = "-21%";
                style.left = "-20%";
                style.transform = "translateX(-50%)";
              } else if (item.pos === "left") {
                style.left = "-51%";
                style.top = "-4%";
                style.transform = "translateY(-50%)";
              } else if (item.pos === "right") {
                style.right = "-52%";
                style.top = "105%";
                style.transform = "translateY(-50%)";
              }

              return (
                <div key={i} style={style}>
                  <p>{item.text}</p>
                </div>
              );
            })}

            {/* Electric arrows */}
            {!qrHovered && (
              <>
                <div
                  style={{
                    position: "absolute",
                    left: "35%", // top
                    top: "25%",
                    transform: "translateY(-100%) rotate(0deg)",
                  }}
                >
                  <ElectricLineSVG flip={90} />
                </div>
                <div
                  style={{
                    position: "absolute",
                    left: "15%", // down side
                    top: "75%",
                    transform: "translateY(0%) rotate(0deg)",
                  }}
                >
                  <ElectricLineSVG flip={270} />
                </div>
                <div
                  style={{
                    position: "absolute",
                    right: "77%", // left side
                    top: "70%",
                    transform: "translateY(-100%) rotate(180deg)",
                  }}
                >
                  <ElectricLineSVG flip={180} />
                </div>
                <div
                  style={{
                    position: "absolute",
                    right: "-30%",
                    top: "35%", //right side
                    transform: "translateY(0%) rotate(180deg)",
                  }}
                >
                  <ElectricLineSVG flip={360} />
                </div>
              </>
            )}
          </div>
        </section>
        {/* Extra content */}
        <section
          style={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
            borderTop: "1px solid rgba(255, 255, 255, 0)",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <h2
              style={{
                fontSize: "2rem",
                marginBottom: "1rem",
                color: "rgba(255,255,255,0.7)",
              }}
            >
              Technologies
            </h2>

            {/* <LogoLoop
              logos={techLogos}
              speed={20}
              direction="left"
              logoHeight={48}
              gap={60}
              pauseOnHover
              scaleOnHover
              fadeOut
              fadeOutColor="#ac0e0eff"
              ariaLabel="Technology partners"
            /> */}
          </div>
        </section>
        <section
          style={{
            width: "100%",
            backgroundColor: "#0b1120",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "0",
            margin: "0",
          }}
        >
          <footer className="bg-gradient-to-b from-[#0b1120] to-[#0f172a] text-white border-t border-pink-8000">
            <div className="max-w-9xl mx-auto px-6 sm:px-10 lg:px-16 py-14">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                {/* --- Brand Section --- */}
                <div>
                  <div className="flex items-center space-x-3 mb-5">

                    <span className="text-2xl font-extrabold tracking-tight">
                      AGRICULTURE - SYSTEM
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    Your trusted partner for any small to big deals
                  </p>

                  {/* --- Social Links --- */}
                  <div className="flex space-x-4">
                    <a
                      href="https://facebook.com"
                      aria-label="Visit our Facebook"
                      className="p-2 bg-gray-800 rounded-full hover:bg-[#3b82f6] transition-colors"
                    >
                      <Facebook className="h-4 w-4" />
                    </a>
                    <a
                      href="https://twitter.com"
                      aria-label="Visit our Twitter"
                      className="p-2 bg-gray-800 rounded-full hover:bg-[#1DA1F2] transition-colors"
                    >
                      <Twitter className="h-4 w-4" />
                    </a>
                    <a
                      href="https://instagram.com"
                      aria-label="Visit our Instagram"
                      className="p-2 bg-gray-800 rounded-full hover:bg-[#E1306C] transition-colors"
                    >
                      <Instagram className="h-4 w-4" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/abhiman-b8145a37a"
                      aria-label="Visit my LinkedIn profile"
                      className="p-2 bg-gray-800 rounded-full hover:bg-[#0077B5] transition-colors"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                  </div>
                </div>

                {/* --- Services --- */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-white">
                    Services
                  </h3>
                  <ul className="space-y-2 text-gray-400 text-sm">
                    <li>
                      <Link
                        to="/services/plumbing"
                        className="hover:text-white transition-colors"
                      >
                        Track deals
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/services/electrical"
                        className="hover:text-white transition-colors"
                      >
                        Distributors
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/services/appliance-repair"
                        className="hover:text-white transition-colors"
                      >
                        Farmer
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/services/carpentry"
                        className="hover:text-white transition-colors"
                      >
                        Consumer
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* --- Company --- */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-white">
                    Company
                  </h3>
                  <ul className="space-y-2 text-gray-400 text-sm">
                    <li>
                      <Link
                        to="/about"
                        className="hover:text-white transition-colors"
                      >
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/careers"
                        className="hover:text-white transition-colors"
                      >
                        Careers
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/blog"
                        className="hover:text-white transition-colors"
                      >
                        Blog
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/privacy-policy"
                        className="hover:text-white transition-colors"
                      >
                        Privacy Policy
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/terms"
                        className="hover:text-white transition-colors"
                      >
                        Terms & Conditions
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* --- Contact --- */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-white">
                    Contact
                  </h3>
                  <ul className="space-y-3 text-gray-400 text-sm">
                    <li className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 flex-shrink-0 text-[#3b82f6]" />
                      <span>+91 xxx xxx xx9</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 flex-shrink-0 text-[#3b82f6]" />
                      <a
                        href="mailto:support@nexsyn.com"
                        className="hover:text-white transition-colors"
                      >
                        support@agriculture.com
                      </a>
                    </li>
                    <li className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 flex-shrink-0 text-[#3b82f6]" />
                      <span>unknown, China</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* --- Divider + Bottom note --- */}
              <div className="mt-12 border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
                <p>
                  © {new Date().getFullYear()}{" "}
                  <span className="text-white font-semibold">
                    Agri - Culture
                  </span>
                  . All rights reserved for you ❤️
                </p>
                <p className="mt-2 text-xs text-gray-600">
                  Built with ❤️ by{" "}
                  <span className="text-white font-semibold">Abhiman</span>
                </p>
              </div>
            </div>
          </footer>
        </section>
      </main>
    </div>
  );
};

export default Adpage;
