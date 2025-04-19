import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Home from "./components/Home"; // Assuming you will create this component
import Login from "./components/login";
import Register from "./components/register";
import AddProject from "./components/addproject";
import Projectpage from "./components/projectpage";
import EditProject from "./components/editproject";

import Navbar from "./components/Navbar"; // Navbar component for navigation


const AppWrapper = () => {
  const location = useLocation();
  const hideNavbarRoutes = ["/login", "/register"]; // Add '/register' if you make one

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/projectpage/:id" element={<Projectpage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/addproject" element={<AddProject />} />
        <Route path="/editproject" element={<EditProject />} />
        
        
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
};

export default App;
