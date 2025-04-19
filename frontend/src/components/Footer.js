import React from "react";
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-column">
          <h3 className="footer-title">Easy2Wakaf</h3>
          <p className="footer-description">Empowering Communities through Waqf</p>
        </div>

        <div className="footer-column">
          <h3 className="footer-title">Site</h3>
          <ul className="footer-nav">
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/projects">Projects</a></li>
            <li><a href="/blogs">Blogs</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3 className="footer-title">Company</h3>
          <ul className="footer-nav">
            <li><a href="/about-us">About Us</a></li>
            <li><a href="/team">Our Team</a></li>
            <li><a href="/style-guide">Style Guide</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3 className="footer-title">Our Projects</h3>
          <ul className="footer-nav">
            <li><a href="/projects">Latest Projects</a></li>
            <li><a href="/donations">Donate</a></li>
            <li><a href="/fundraising">Fundraising</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3 className="footer-title">Resources</h3>
          <ul className="footer-nav">
            <li><a href="/terms">Terms of Service</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/faq">FAQ</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3 className="footer-title">Contact</h3>
          <ul className="footer-nav">
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/support">Support</a></li>
            <li><a href="/feedback">Feedback</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
