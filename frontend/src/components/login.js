import React from 'react';
import { useNavigate } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './login.css';

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <div className="login-text-container">
        <h1>Hello!</h1>
        <h1>Welcome Back!</h1>
        <p>
          Welcome back! Log in to continue making a positive difference in your
          community. Every contribution counts.
        </p>
        <div className="login-form-container">
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
          <button className="login-button">Login</button>
          <button className="register-button" onClick={() => navigate('/register')}>
            Go to Register
          </button>
        </div>
      </div>

      <div className="login-image-container">
        <img src="images/masjid2.jpg" alt="Login Visual" className="login-image" />
      </div>
    </div>
  );
};

export default Login;

