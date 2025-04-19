import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./login.css";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Toaster, toast } from "react-hot-toast";

import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      toast.success("🎉 Login successful!");
  
      // Navigate to home after short delay
      setTimeout(() => navigate("/Home"), 2000);
    } catch (error) {
      console.error("Login error:", error);
      toast.error("❌ Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="login-container">
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className="login-text-container">
        <h1>Hello!</h1>
        <h1>Welcome Back!</h1>
        <p>
          Welcome back! Log in to continue making a positive difference in your
          community. Every contribution counts.
        </p>
        <div className="login-form-container">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="login-button"
            onClick={() => handleLogin(email, password)}
          >
            Login
          </button>
          <button
            className="register-button"
            onClick={() => navigate("/register")}
          >
            Go to Register
          </button>
        </div>
      </div>
      <div className="login-image-container">
        <img
          src="images/masjid2.jpg"
          alt="Login Visual"
          className="login-image"
        />
      </div>
    </div>
  );
};

export default Login;
