import React from "react";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";
import "./landing.css";

const Landing = () => (
  <div className="landing-root">
    <LeftSection />
    <RightSection />
  </div>
);

export default Landing;