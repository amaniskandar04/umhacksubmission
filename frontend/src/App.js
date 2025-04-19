
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home'; // Assuming you will create this component
import Projectpage from './components/projectpage'
import Navbar from './components/Navbar'; // Navbar component for navigation
import DonationSuccess from './components/donation-success'

const App = () => {
  return (
    
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projectpage" element = {<Projectpage/>} />
        <Route path="/donation-success" element={<DonationSuccess />} />
      </Routes>
    </Router>
  );
};

export default App;