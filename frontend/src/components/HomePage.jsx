import React from "react";
import HeroSection from "./HeroSection";
import Footer from "./Footer";
import Navbar from "./Navbar";

const HomePage = ({ user, onLogout }) => (
  <>
    <Navbar user={user} onLogout={onLogout} />
    <HeroSection />
    <Footer />
  </>
);

export default HomePage;