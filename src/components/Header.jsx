import React from 'react';
import './header.css';
const Header = () => {
  return (
    <header className="header">
      <div className="header-container">

        {/* Logo Section */}
        <div className="logo-section">
          <div className="logo-icon">
            <i></i>
          </div>
          <h1 className="logo-text">AI Summarizer</h1>
        </div>

        {/* Navigation */}
        <nav className="nav-links">
          <a href="#">How it works</a>
          <a href="#">Pricing</a>
          <a href="#" className="pro-btn">Get Pro</a>
        </nav>

      </div>
    </header>
  );
};

export default Header;

