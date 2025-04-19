import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./register.css";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState(null); // Single image file

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
    console.log("Uploaded Image:", file);
  };

  const handleRegister = async () => {
    try {
      // Step 1: Register user on Firebase
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const idToken = await user.getIdToken();

      // Step 2: Convert image to base64 (or use Firebase Storage if you prefer)
      const profilePicBase64 = await toBase64(profilePic);

      // Step 3: Call Django backend to save user details in Firestore
      const response = await axios.post(
        "http://localhost:8000/api/authentication/SignUp/",
        {
          firstName,
          lastName,
          phoneNumber,
          profilePic: profilePicBase64,
          icPic: "", // Optional
          profilePicBanner: "",
          totDonatedAmount: 0,
          createdProjectsID: [],
          donatedProjectsID: [],
        },
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );

      console.log("Registration success:", response.data);
      toast.success("🎉 Registration successful!");
      setTimeout(() => navigate("/Home"), 2000);
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("❌ Registration failed. Please check your input.");
    }
  };

  const toBase64 = (file) => {
    return new Promise((resolve, reject) => {
      if (!file) return resolve(null);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <div className="register-container">
      <Toaster position="bottom-center" reverseOrder={false} />;
      <div className="register-text-container">
        <h1>Join Us!</h1>

        <p>
          Sign up now and be part of a platform that makes giving easy,
          transparent, and impactful. Together, we can build a stronger, caring
          community.
        </p>
        <div className="register-form-container">
          <input
            type="text"
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            type="tel"
            placeholder="Phone Number"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className="file-label">
            Upload Profile Image:
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          </label>
          <button className="register-button" onClick={handleRegister}>
            Register
          </button>
          <button className="login-button" onClick={() => navigate("/login")}>
            Go to Login
          </button>
        </div>
      </div>
      <div className="register-image-container">
        <img
          src="images/masjid2.jpg"
          alt="Login Visual"
          className="register-image"
        />
      </div>
    </div>
  );
};

export default Register;
