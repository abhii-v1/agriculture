import React, { useLayoutEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { GoArrowUpRight } from "react-icons/go";
import "./CardNav.css";
import { useNavigate } from "react-router-dom";

// import {
//   createBrowserRouter,
//   Navigate,
//   RouterProvider,
//   useNavigate,
// } from "react-router-dom";
// import HomePage from "./HomePage";

type CardNavLink = {
  label: string;
  href: string;
  ariaLabel?: string;
};

export type CardNavItem = {
  label: string;
  bgColor: string;
  textColor: string;
  links: CardNavLink[];
};

export interface CardNavProps {
  logoAlt?: string;
  items: CardNavItem[];
  ease?: string;
  baseColor?: string;
  menuColor?: string;
  className?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
}
// export const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <HomePage />,
//   },
// ]);

const CardNav: React.FC<CardNavProps> = ({
  items,
  className = "",
  buttonBgColor = "#111",
  buttonTextColor = "#fff",
}) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const navRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | undefined)[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const navigate = useNavigate();
  // const navigate = useNavigate();

  // calculate height for mobile
  const calculateHeight = useCallback(() => {
    const navEl = navRef.current;
    if (!navEl) return 60;

    const contentEl = navEl.querySelector(".card-nav-content") as HTMLElement;
    if (!contentEl) return 60;

    const oldStyles = {
      visibility: contentEl.style.visibility,
      pointerEvents: contentEl.style.pointerEvents,
      position: contentEl.style.position,
      height: contentEl.style.height,
    };

    contentEl.style.visibility = "visible";
    contentEl.style.pointerEvents = "auto";
    contentEl.style.position = "static";
    contentEl.style.height = "auto";

    const height = contentEl.scrollHeight + 60; // top bar + content

    Object.assign(contentEl.style, oldStyles);
    return height;
  }, []);

  const createTimeline = useCallback(() => {
    const navEl = navRef.current;
    if (!navEl) return null;

    const visibleCards = cardsRef.current.filter(Boolean);

    gsap.set(navEl, { height: 60, overflow: "hidden" });
    gsap.set(visibleCards, { y: 20, autoAlpha: 0 });

    const tl = gsap.timeline({ paused: true });
    tl.to(navEl, {
      height: calculateHeight(),
      duration: 0.3,
      ease: "power3.out",
    });
    tl.to(
      visibleCards,
      { y: 0, autoAlpha: 1, duration: 0.15, stagger: 0.05 },
      "-=0.15",
    );

    return tl;
  }, [calculateHeight]);

  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;
    return () => {
      tl?.kill();
    };
  }, [createTimeline]);

  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;

    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      tl.play(0);
    } else {
      setIsHamburgerOpen(false);
      tl.eventCallback("onReverseComplete", () => setIsExpanded(false));
      tl.reverse();
    }
  };

  const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
    cardsRef.current[i] = el || undefined;
  };

  return (
    <div className={`card-nav-container ${className}`}>
      <nav ref={navRef} className={`card-nav ${isExpanded ? "open" : ""}`}>
        <div className="card-nav-top">
          <div
            className={`hamburger-menu ${isHamburgerOpen ? "open" : ""}`}
            onClick={toggleMenu}
            role="button"
            aria-label={isExpanded ? "Close menu" : "Open menu"}
            tabIndex={0}
          >
            <div className="hamburger-line" />

            <div className="hamburger-line" />
          </div>

          <div className="logo-container"></div>

          <button
            type="button"
            className="card-nav-cta-button"
            style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
            onClick={() => navigate("/HomePage")}
          >
            Get Start 
          </button>
        </div>

        <div className="card-nav-content" aria-hidden={!isExpanded}>
          {items?.map((item, idx) => (
            <div
              key={idx}
              className="nav-card"
              ref={setCardRef(idx)}
              style={{ backgroundColor: item.bgColor, color: item.textColor }}
            >
              <div className="nav-card-label">{item.label}</div>
              <div className="nav-card-links">
                {item.links?.map((lnk, i) => (
                  <a
                    key={i}
                    className="nav-card-link"
                    href={lnk.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GoArrowUpRight />
                    {lnk.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default CardNav;
