import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100); // adjust scroll trigger as needed
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={isScrolled ? 'scrolled' : 'transparent'}>
      <div className="navbar-container">
        <div className="navbar-left">
          <h3>Easy2Wakaf</h3>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </div>
        <div className="navbar-right">
          <button className="btnLogin">Login</button>
          <button className="btnRegister">Register</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;