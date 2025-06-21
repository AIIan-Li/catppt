import React, { useState } from 'react';
import './auth.css';

const Landing = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-bg">
      <div className="auth-container">
        <div className="auth-header">
          <img
            src="https://chat.openai.com/favicon-32x32.png"
            alt="ChatGPT Logo"
            className="auth-logo"
          />
          <h2>{isLogin ? 'Welcome back' : 'Create your account'}</h2>
        </div>
        <form className="auth-form">
          {!isLogin && (
            <div className="auth-field">
              <label>Name</label>
              <input type="text" placeholder="Your name" autoComplete="name" />
            </div>
          )}
          <div className="auth-field">
            <label>Email address</label>
            <input type="email" placeholder="Email address" autoComplete="email" />
          </div>
          <div className="auth-field">
            <label>Password</label>
            <input type="password" placeholder="Password" autoComplete={isLogin ? "current-password" : "new-password"} />
          </div>
          <button type="submit" className="auth-btn">
            {isLogin ? 'Log in' : 'Sign up'}
          </button>
        </form>
        <div className="auth-footer">
          <span>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </span>
          <button
            className="auth-switch"
            onClick={() => setIsLogin(!isLogin)}
            type="button"
          >
            {isLogin ? 'Sign up' : 'Log in'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;