import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';


const Navbar = () => {
  return (
    <nav>
      <div className="navbar-container">
        <div className="navbar-left">
          <h3>Easy2Wakaf</h3>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </div>
        <div className="navbar-right">
          <button className="btnLogin">Login</button>
          <button className="btn Register">Register</button>
        </div>
      </div>
  </nav>
  );
};

export default Navbar;