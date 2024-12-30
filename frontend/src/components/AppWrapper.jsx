import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import HomePage from "./HomePage";
import ServicesPage from "./ServicesPage";
import ContactPage from "./ContactPage";
import AboutPage from "./AboutPage";
import Login from "./Login";
import Signup from "./Signup";
import App from "../App";

const AppWrapper = () => {
  const [user, setUser] = useState(null);

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup setUser={setUser} />} />
        <Route path="/home" element={<App component={HomePage} user={user} setUser={setUser} />} />
        <Route path="/services" element={<App component={ServicesPage} user={user} setUser={setUser} />} />
        <Route path="/contact" element={<App component={ContactPage} user={user} setUser={setUser} />} />
        <Route path="/about" element={<App component={AboutPage} user={user} setUser={setUser} />} />
        <Route path="/" element={user ? <Navigate to="/home" /> : <Navigate to="/login" />} />
      </Routes>
      <Toaster />
    </>
  );
};

const AppWrapperWithRouter = () => (
  <Router>
    <AppWrapper />
  </Router>
);

export default AppWrapperWithRouter;