import React from 'react'
import './footer.css';

export const Footer = () => {
  return (
  <div className="footer-container">

  {/* Logo */}
  <div className="footer-logo">
    <div className="logo-icon">
      <i className="fas fa-bolt"></i>
    </div>
    <span className="logo-text">AI Summarizer</span>
  </div>

  {/* Copyright */}
  <div className="footer-copy">
    © {new Date().getFullYear()} AI Summarizer. Powered by Vaddempudi Raja.
  </div>

  {/* Links */}
  <div className="footer-links">
    <a href="#">Privacy</a>
    <a href="#">Terms</a>
    <a href="#">Contact</a>
  </div>

</div>

  )
}
