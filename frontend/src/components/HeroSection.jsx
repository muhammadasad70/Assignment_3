import React from "react";
import { useNavigate } from "react-router-dom";
import "./HeroSection.css";

const HeroSection = () => {
  const navigate = useNavigate();

  const handlePlanNowClick = () => {
    navigate("/contact");
  };

  return (
    <section className="hero">
      <img src="/background.png" alt="background" className="background-image" />
      <div className="card">
        <h3>Vibe Creator</h3>
        <div>
          <h1>Your Ultimate Vibe Curator</h1>
          <p>
            We believe it's all about the UNFORGETTABLE EXPERIENCES and the perfect details!
          </p>
          <button className="plan-now-button" onClick={handlePlanNowClick}>PLAN NOW</button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;