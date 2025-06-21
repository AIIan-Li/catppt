import React from "react";
import "./landing.css";

const RightSection = () => (
  <div className="landing-right">
    <div className="landing-getstarted">
      <h1>Get started</h1>
      <div className="landing-btn-row">
        <button className="landing-btn landing-btn-bubble">Log in</button>
        <button className="landing-btn landing-btn-bubble">Sign up for free</button>
      </div>
      <div className="landing-tryfirst">Try it first</div>
    </div>
    <div className="landing-logo-bottom">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/0/04/OpenAI_Logo.svg"
        alt="OpenAI Logo"
        className="landing-openai-logo"
      />
    </div>
    <div className="landing-footer">
      <div>
        <a href="#" className="landing-footer-link">Terms of use</a>
        <span> | </span>
        <a href="#" className="landing-footer-link">Privacy policy</a>
      </div>
    </div>
  </div>
);

export default RightSection;