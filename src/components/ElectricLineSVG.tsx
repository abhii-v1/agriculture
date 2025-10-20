import React from "react";
import "./ElectricLineSVG.css";

interface ElectricLArrowProps {
  flip?: number; // rotation angle (0, 90, 180, 270)
}

const ElectricLArrow: React.FC<ElectricLArrowProps> = ({ flip = 0 }) => {
  return (
    <div className="electric-l-container">
      <svg
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        className="electric-l"
        style={{
          transform: `rotate(${flip}deg)`,
          transition: "transform 0.5s ease",
        }}
      >
        {/* Electric L shape + arrow */}
        <path
          d="M 40 40 L 40 140 L 160 140 L 140 120 M 160 140 L 140 160"
          fill="none"
          stroke="url(#electric-gradient)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="electric-path"
        />

        <defs>
          <linearGradient id="electric-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f90105ff" />
            <stop offset="50%" stopColor="#fcfc00ff" />
            <stop offset="100%" stopColor="#1100ffff" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default ElectricLArrow;
