import React from "react";
import "./landing.css";

const RightSection = ({ onGetStarted }) => (
  <div className="landing-right">
    <div className="landing-getstarted">
      <h1>Get started</h1>
      <div className="landing-btn-row">
        <button className="landing-btn landing-btn-bubble" onClick={onGetStarted}>
          Log in
        </button>
        <button className="landing-btn landing-btn-bubble">Sign up for free</button>
      </div>
      <div className="landing-tryfirst-row">
        <div className="landing-tryfirst">Try it first</div>
      </div>
    </div>
    {/* Cat logo above the footer */}
    <div className="landing-logo-bottom">
      <img src="/cat.png" alt="Cat Logo" className="cat-logo-bottom" />
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