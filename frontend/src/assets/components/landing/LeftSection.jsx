import React, { useState, useEffect, useRef } from "react";
import "./landing.css";

const prompts = [
  ["Write a text", "asking a friend to be my plus-one at a wedding"],
  ["Brainstorm names", "for my fantasy football team"],
  ["Draft an email", "to request vacation days"],
  ["Suggest a recipe", "using only potatoes and cheese"],
  ["Summarize this article", "in one sentence"],
];

const TYPING_SPEED = 40;
const PAUSE_AFTER_TYPING = 1200;

function BlinkingBallCursor() {
  return <span className="blinking-ball" />;
}

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

    // Show top line first
    const topTimeout = setTimeout(() => {
      setShowTop(true);

      // Start typing after top line is shown
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
            // Pause, then slide up and go to next prompt
            typingTimeout.current = setTimeout(() => {
              setSlideUp(true);
              setTimeout(() => {
                setPromptIndex((prev) => (prev + 1) % prompts.length);
              }, 500); // Slide up duration
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
            {animating && <BlinkingBallCursor />}
          </div>
        )}
      </div>
    </div>
  );
};

export default LeftSection;