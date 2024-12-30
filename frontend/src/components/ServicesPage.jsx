import React from "react";
import Services from "./Services";
import Event from "./Event";
import Footer from "./Footer";
import Navbar from "./Navbar";

const ServicesPage = ({ user, onLogout }) => (
  <>
    <Navbar user={user} onLogout={onLogout} />
    <Services />
    <Event user={user} />
    <Footer />
  </>
);

export default ServicesPage;