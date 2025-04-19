import React from 'react';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import CardSlider1 from "./Slider1.js";
import CardSlider2 from "./Slider2.js";
import './home.css';

  

const Home = () => {
  return (
    <div>
      <div className="banner">
        <img src="images/masjid2.jpg" alt="Banner" className="banner-image" />
        <div className="image-gradient"></div>
        <div className="image-overlay">
          <h1>Welcome to Easy2Wakaf</h1>
          <p>Empowering communities through consistent and meaningful giving.</p>
          <button>Get Started</button>
        </div>
      </div>
      <div className="ongoing-projects-container">
        <h2>Ongoing projects</h2>
          <div>
            <CardSlider1 />
          </div>
      </div>
      <div className="about-us-container">
          <div className="about-us-block">
            <h2>About us</h2>
            <p>
              Easy2Wakaf is a modern, user-friendly platform designed to simplify the way you contribute to waqf. Our mission is to make giving effortless, fully trackable, and completely transparent. With Easy2Waqf, you can make your waqf payments in just a few clicks while easily monitoring where your contributions go and how they’re being used. We believe in building trust through clarity, ensuring every donor stays informed and connected to the causes they support.
            </p>
            <button>Learn More</button>
          </div>

          <div className="about-us-image">
            <img src="images/masjid.jpg" alt="About Us" />
          </div>
        </div>

      <div className = "completed-projects-container">
        <h2>Completed Projects</h2>
        <CardSlider2 />
      </div>
    </div>
    
  );
};

export default Home;