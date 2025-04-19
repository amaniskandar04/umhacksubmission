
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home'; // Assuming you will create this component
import Projectpage from './components/projectpage'
import Navbar from './components/Navbar'; // Navbar component for navigation

const App = () => {
  return (
    
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projectpage/:id" element={<Projectpage />} />

       
      </Routes>
    </Router>
  );
};

export default App;