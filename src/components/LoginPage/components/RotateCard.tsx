import React from "react";

const RotateCard: React.FC = () => {
  const styles = `
    .rotate-card {
      width: 170px;
      height: 150px;
      position: relative;
      animation: rotate360 5s linear infinite;
      transform-style: preserve-3d;
      perspective: 1000px;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0);
      margin: 100px auto;
      left: 23%;
      margin: 10px;
      padding: 10px;
    }

    .card-front, .card-back {
      position: absolute;
      width: 100%;
      height: 100%;
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
    }

    .card-front img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .card-back {
      transform: rotateY(180deg);
      background: linear-gradient(135deg, #1205052e, #1a1a1a2d);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      font-weight: bold;
    }

    @keyframes rotate360 {
      from { transform: rotateY(0deg); }
      to { transform: rotateY(360deg); }
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div className="rotate-card">
        <div className="card-front">
          {/* Make sure this image exists in your public/ folder */}
          <img src="./app_logo.png" alt="Front Side" />
        </div>
        <div className="card-back">Back Side Content</div>
      </div>
    </>
  );
};

export default RotateCard;
