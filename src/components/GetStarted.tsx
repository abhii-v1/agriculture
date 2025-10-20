import { useState } from "react";

const GetStartedButton = () => {
  const [message, setMessage] = useState("");

const handleGetStarted = async () => {
  try {
    const response = await fetch("http://127.0.0.1:8080");
    const data = await response.text();
    // setMessage(data);
    alert(data);
    setMessage(data);
  } catch (error) {
    alert("Connection failed: " + message);
  }
};
//  setMessage(data.message);

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <button
        type="button"
        className="card-nav-cta-button"
        style={{ backgroundColor: "#111", color: "#fff", padding: "10px 20px" }}
        onClick={handleGetStarted}
      >
        Get Started
      </button>

      {message && (
        <p style={{ marginTop: "1rem", color: "red" }}>
          {message} 
        </p>
      )}
    </div>
  );
};

export default GetStartedButton;
