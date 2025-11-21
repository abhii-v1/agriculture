import React, { useEffect, useRef, useState } from "react";
import GradientText from "../components/GradientText";
import LaserFlow from "../components/LaserFlow";
import SignIn from "../components/LoginPage/SignIn";
import SubscriptionCards from "../components/SubscriptionCard";

const CombinedPage: React.FC = () => {
  const revealImgRef = useRef<HTMLImageElement>(null);

  // 👇 State to handle authentication
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // ✅ Callback to trigger after successful sign-in
  const handleSignInSuccess = () => {
    setIsAuthenticated(true);
    
  };
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const auth = params.get("auth");
    if (auth === "success") {
      setIsAuthenticated(true);
      // optional: store token or flag
      localStorage.setItem("isAuthenticated", "true");
    } else {
      const savedAuth = localStorage.getItem("isAuthenticated");
      if (savedAuth === "true") setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
  localStorage.clear();
  setIsAuthenticated(false);
  window.location.reload();
};

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "black",
      }}
    >
      {/* ===== BACKGROUND (Subscription Page Visuals) ===== */}
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          overflow: "hidden",
        }}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const el = revealImgRef.current;
          if (el) {
            el.style.setProperty("--mx", `${x}px`);
            el.style.setProperty("--my", `${y + rect.height * 0.1}px`);
          }
        }}
        onMouseLeave={() => {
          const el = revealImgRef.current;
          if (el) {
            el.style.setProperty("--mx", "-9999px");
            el.style.setProperty("--my", "-9999px");
          }
        }}
      >
        <LaserFlow
          horizontalBeamOffset={0.18}
          verticalBeamOffset={0.22}
          color="#f96565ff"
        />

        <img
          ref={revealImgRef}
          src="./subscriptionbg.png"
          alt="Reveal effect"
          style={
            {
              position: "absolute",
              width: "100%",
              height: "100%",
              top: 0,
              left: 0,
              mixBlendMode: "lighten",
              opacity: 0.8,
              pointerEvents: "none",
              WebkitMaskImage:
                "radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.95) 60px, rgba(255,255,255,0.6) 120px, rgba(255,255,255,0.25) 180px, rgba(255,255,255,0) 240px)",
              maskImage:
                "radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.95) 60px, rgba(255,255,255,0.6) 120px, rgba(255,255,255,0.25) 180px, rgba(255,255,255,0) 240px)",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              // @ts-ignore
              "--mx": "-999px",
              // @ts-ignore
              "--my": "-999px",
            } as React.CSSProperties
          }
        />
      </div>

      {/* ===== FOREGROUND TEXT (Subscription Title + Card) ===== */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 5,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "2rem",
          transition: "filter 1s ease",
          filter: isAuthenticated ? "none" : "blur(10px)",
          pointerEvents: isAuthenticated ? "auto" : "none",
        }}
      >
        <GradientText
          colors={[
            "#31e8df8e",
            "#112bec9e",
            "#1648c5be",
            "#dfdfdf56",
            "#0b8dffe6",
          ]}
          animationSpeed={10}
          showBorder={false}
        >
          <div style={{ paddingTop: "1px", textAlign: "center" }}>
            <span style={{ fontSize: "4rem", fontWeight: "800" }}>
              Subscription
            </span>
          </div>
        </GradientText>

        <div>
          <SubscriptionCards />
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>

      {/* ===== SIGN-IN OVERLAY (visible until authenticated) ===== */}
      {!isAuthenticated && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.44)",
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: isAuthenticated ? 0 : 1,
          }}
        >
          <SignIn onSuccess={handleSignInSuccess} />
          

        </div>
      )}
    </div>
  );
};

export default CombinedPage;
