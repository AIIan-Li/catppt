import React from "react";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";
import "./landing.css";

const Landing = ({ onGetStarted }) => (
  <div className="landing-root">
    <div className="login-header">CatPhiser</div>
    <LeftSection />
    <RightSection onGetStarted={onGetStarted} />
  </div>
);

export default Landing;