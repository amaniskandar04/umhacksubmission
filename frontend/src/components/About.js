import React from "react";
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1 className="about-title">About Easy2Waqf</h1>
        <p className="about-description">
        Easy2Waqf is a digital platform that modernizes the practice of waqf to be more transparent, accessible, and inclusive—especially for Malay youths in Malaysia. We aim to empower the younger generation to participate in charitable endowments through a tech-driven, user-friendly solution.
        </p>

        <div className="about-sections">
          <div className="about-section-card">
            <h2 className="about-section-title">🌍 Our Mission</h2>
            <p className="about-section-description">
            To bridge tradition and technology by redefining waqf through innovation—making it engaging, trustworthy, and impactful for the youth of today.
            </p>
          </div>

          <div className="about-section-card">
            <h2 className="about-section-title">💡 What We Offer</h2>
            <ul className="about-list">
              <li>Blockchain-Powered Records</li>
              <li>Project Progress Tracker</li>
              <li>Gamification Elements</li>
              <li>Project Validation System</li>
            </ul>
          </div>

          <div className="about-section-card">
            <h2 className="about-section-title">🤝 Why Easy2Waqf?</h2>
            <p className="about-section-description">
            Unlike conventional waqf platforms, Easy2Waqf integrates technology to ensure real-time transparency, build user trust, and encourage active participation. We go beyond just collecting funds—we help you see the impact.
            </p>
          </div>

          <div className="about-section-card">
            <h2 className="about-section-title">📍 Get Involved</h2>
            <p className="about-section-description">
              Whether you're a donor, project manager, or simply passionate about giving back—there's a place for you here. Join us in building a better tomorrow, one Waqf at a time.
            </p>
          </div>
        </div>

        <div className="about-image-container">
          <img
            src="images/masjid2.jpg"
            alt="Waqf Community"
            className="about-image"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
