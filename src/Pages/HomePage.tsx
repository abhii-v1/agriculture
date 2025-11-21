import React from "react";
import Ballpit from "../components/Ballpit";
import CardNav from "../components/CardNav";
import GradientText from "../components/GradientText";
import ParticleMorph from "../components/Partical";
// import Carded from "../components/Card";

const HomePage: React.FC = () => {
  const items = [
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
        height: "100vh", // 👈 Fix height instead of minHeight
        backgroundColor: "black",
        position: "relative",
        overflow: "hidden", // 👈 Prevent Ballpit from overflowing
      }}
    >
      {/* Ballpit in background */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      >
        {/* <Ballpit
          colors={[
            0xff69b4, // Hot Pink
            0xba55d3, // Medium Orchid (Soft Purple)
            0xdb7093, // Pale Violet Red
            0xe6e6fa, // Lavender
            0xf08080, // Light Coral
            0xf5b7b1, // Rose Pink
            0xffc0cb, // Classic Pink
            0xb0e0e6, // Powder Blue (Soft, calm tone)
            0xdda0dd, // Plum (Elegant)
            0xfafad2, // Light Goldenrod Yellow
            0x00ffff,
          ]}
          count={40}
          gravity={0.1}
          friction={1}
          wallBounce={0.95}
          followCursor={true}
          ambientColor={0x1a1a2e}
          ambientIntensity={2}
          lightIntensity={30}
        /> */}
      </div>

      {/* Foreground content */}
      <main
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          color: "white",
        }}
      >
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
          <div
            style={{
              position: "fixed",
              top: 10,
              left: 0,
              width: "100%",
              zIndex: 1000,
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <CardNav
              items={items}
              baseColor="rgba(235, 222, 222, 0)"
              menuColor="#0e0c0cff"
              buttonBgColor="#111"
              buttonTextColor="#fff"
              ease="power3.out"
              showSearch={true}
              onSearch={(query) => console.log("Search for:", query)}
            />
          </div>
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
            <div style={{ paddingTop: "1px", textAlign: "center" }}>
              {/* 👆 paddingTop prevents navbar from overlapping the hero */}
              <span style={{ fontSize: "4rem", fontWeight: "800" }}>
                WELCOME
              </span>
            </div>
          </GradientText>
        </section>
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
          <div
            style={{
              position: "relative",
              width: "100%",
              zIndex: 100,
              display: "fix",
              justifyContent: "center",
            }}
          >
          <ParticleMorph/>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
