import React from "react";
import About from "./About";
import Footer from "./Footer";
import Navbar from "./Navbar";

const AboutPage = ({ user, onLogout }) => (
  <>
    <Navbar user={user} onLogout={onLogout} />
    <About />
    <Footer />
  </>
);

export default AboutPage;