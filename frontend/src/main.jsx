import React, { useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./assets/components/landing/landing.css";

// PROMPTS
const prompts = [
  ["Write a text", "asking a friend to be my plus-one at a wedding"],
  ["Brainstorm names", "for my fantasy football team"],
  ["Draft an email", "to request vacation days"],
  ["Suggest a recipe", "using only potatoes and cheese"],
  ["Summarize this article", "in one sentence"],
];

const TYPING_SPEED = 40;
const PAUSE_AFTER_TYPING = 1200;

// Blinking ball cursor for typing
function BlinkingBallCursor({ show }) {
  return show ? <span className="blinking-ball" /> : null;
}

// LEFT SECTION
const LeftSection = () => {
  const [promptIndex, setPromptIndex] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const [typed, setTyped] = useState("");
  const [animating, setAnimating] = useState(false);
  const [slideUp, setSlideUp] = useState(false);
  const typingTimeout = useRef();

  useEffect(() => {
    setShowTop(false);
    setTyped("");
    setSlideUp(false);

    const topTimeout = setTimeout(() => {
      setShowTop(true);

      typingTimeout.current = setTimeout(() => {
        setAnimating(true);
        let i = 0;
        function typeChar() {
          setTyped(prompts[promptIndex][1].slice(0, i + 1));
          i++;
          if (i < prompts[promptIndex][1].length) {
            typingTimeout.current = setTimeout(typeChar, TYPING_SPEED);
          } else {
            setAnimating(false);
            typingTimeout.current = setTimeout(() => {
              setSlideUp(true);
              setTimeout(() => {
                setPromptIndex((prev) => (prev + 1) % prompts.length);
              }, 500);
            }, PAUSE_AFTER_TYPING);
          }
        }
        typeChar();
      }, 400);
    }, 200);

    return () => {
      clearTimeout(topTimeout);
      clearTimeout(typingTimeout.current);
    };
  }, [promptIndex]);

  return (
    <div className="landing-left">
      <div className="landing-logo">Cat Phishing</div>
      <div className={`landing-prompt-outer ${slideUp ? "slide-up" : ""}`}>
        {showTop && (
          <div className="landing-prompt-top">
            {prompts[promptIndex][0]}
          </div>
        )}
        {showTop && (
          <div className="landing-prompt-bottom">
            {typed}
            <BlinkingBallCursor show={animating} />
          </div>
        )}
      </div>
    </div>
  );
};

// RIGHT SECTION
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

// LANDING PAGE
const Landing = () => (
  <div className="landing-root">
    <LeftSection />
    <RightSection />
  </div>
);

createRoot(document.getElementById("root")).render(<Landing />);
