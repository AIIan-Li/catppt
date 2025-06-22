import React, { useState } from "react";
import "./login.css";
import googleLogo from '../../google.jpg';
import microsoftLogo from '../../microsoft.webp';
import appleLogo from '../../apple.png';
import phoneLogo from '../../phone.png';

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email address.");
      return;
    }
    setError("");
    setShowPassword(true);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (email === "spurs@gmail.com" && password === "123456") {
      setError("");
      if (onLoginSuccess) onLoginSuccess();
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="login-root">
      <div className="login-header">Cat Phisher</div>
      <div className="login-center-box">
        <h1 className="login-title">Welcome back</h1>
        <form
          className="login-form"
          onSubmit={showPassword ? handlePasswordSubmit : handleEmailSubmit}
        >
          <div className={`login-float-label ${email ? "active" : ""}`}>
            <input
              id="email"
              type="email"
              className="login-input"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="off"
              required
              style={{ background: "transparent" }}
              disabled={showPassword}
            />
            <label htmlFor="email" className="login-label">Email address</label>
          </div>
          {showPassword && (
            <>
              <div className={`login-float-label ${password ? "active" : ""}`}>
                <input
                  id="password"
                  type="password"
                  className="login-input"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoComplete="off"
                  required
                  style={{ background: "transparent" }}
                />
                <label htmlFor="password" className="login-label">Password</label>
              </div>
              <div style={{marginTop: "8px", textAlign: "left", width: "100%"}}>
                <a href="#" className="login-forgot-link">Forgot password?</a>
              </div>
            </>
          )}
          {error && <div style={{color: "red", marginBottom: "8px"}}>{error}</div>}
          <button className="login-continue" type="submit">
            Continue
          </button>
        </form>
        {/* These always show, regardless of showPassword */}
        <div className="login-signup-row">
          Don&apos;t have an account?{" "}
          <a href="#" className="login-signup-link">
            Sign up
          </a>
        </div>
        <div className="login-or-row">
          <span className="login-or-line"></span>
          <span className="login-or-text">or</span>
          <span className="login-or-line"></span>
        </div>
        <div className="login-socials">
          <button className="login-social-btn google">
            <img src={googleLogo} alt="Google" className="login-social-img" />
            Continue with Google
          </button>
          <button className="login-social-btn microsoft">
            <img src={microsoftLogo} alt="Microsoft" className="login-social-img" />
            Continue with Microsoft Account
          </button>
          <button className="login-social-btn apple">
            <img src={appleLogo} alt="Apple" className="login-social-img" />
            Continue with Apple
          </button>
          <button className="login-social-btn phone">
            <img src={phoneLogo} alt="Phone" className="login-social-img" />
            Continue with phone
          </button>
        </div>
      </div>
      <div className="login-footer">
        <a href="#" className="login-footer-link">
          Terms of Use
        </a>
        <span> | </span>
        <a href="#" className="login-footer-link">
          Privacy Policy
        </a>
      </div>
    </div>
  );
};

export default Login;