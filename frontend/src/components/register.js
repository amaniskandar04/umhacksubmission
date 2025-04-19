import React from 'react';
import { useNavigate } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './register.css';

const Register = () => {
  const navigate = useNavigate();

  return (
    <div className="register-container">
      <div className="register-text-container">
        <h1>Join Us!</h1>
        
        <p>
          Sign up now and be part of a platform that makes giving easy, transparent, and impactful. Together, we can build a stronger, caring community.
        </p>
        <div className="register-form-container">
          <input type="text" placeholder="IC Number" />
          <input type="text" placeholder="Name" />
          <input type="tel" placeholder="Phone Number" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button className="register-button">Register</button>
          <button className="login-button" onClick={() => navigate('/login')}>
            Go to Login
          </button>
        </div>
      </div>

      <div className="register-image-container">
        <img src="images/masjid2.jpg" alt="Login Visual" className="register-image" />
      </div>
    </div>
  );
};

export default Register;
