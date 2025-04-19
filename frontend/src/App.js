import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home'; // Assuming you will create this component
import Navbar from './components/Navbar'; // Navbar component for navigation
import ProfilePage from './components/profilePage'; // Import ProfilePage component

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<ProfilePage />} /> {/* Correctly capitalized */}
      </Routes>
    </Router>
  );
};

export default App;
