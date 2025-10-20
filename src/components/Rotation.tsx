import React from "react";
import "./Rotation.css";

const Rotation = () => (
  <div className="rotate-card">
    <div className="card-front">
      {/* Use public folder image path */}
      <img src="./app_logo.png" alt="Anime Front" />
    </div>
    <div className="card-back">
      {/* Optional back side */}
      Back Side Content
    </div>
  </div>
);

export default Rotation;
