import React from "react";
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1 className="about-title">About Us</h1>
        <p className="about-description">
          We believe in empowering communities through transparency and ease of giving. Our Waqf platform is designed to centralize donation efforts, inspire participation, and ensure every contribution makes a lasting impact.
        </p>

        <div className="about-sections">
          <div className="about-section-card">
            <h2 className="about-section-title">🌍 Our Mission</h2>
            <p className="about-section-description">
              To make Waqf more accessible, trackable, and engaging for all. We aim to connect donors with meaningful causes, fostering sustainable charitable projects across regions.
            </p>
          </div>

          <div className="about-section-card">
            <h2 className="about-section-title">💡 What We Offer</h2>
            <ul className="about-list">
              <li>Real-time donation tracking</li>
              <li>Pooled contributions for bigger impact</li>
              <li>Verified and transparent Waqf projects</li>
              <li>Gamified donor experience</li>
            </ul>
          </div>

          <div className="about-section-card">
            <h2 className="about-section-title">🤝 Our Community</h2>
            <p className="about-section-description">
              This platform is built for donors, by a community that values trust and transparency. We work with local leaders and trusted organizations to ensure your donations are used wisely.
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
