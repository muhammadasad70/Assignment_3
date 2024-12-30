import React from "react";
import Contact from "./Contact";
import Footer from "./Footer";
import Navbar from "./Navbar";

const ContactPage = ({ user, onLogout }) => (
  <>
    <Navbar user={user} onLogout={onLogout} />
    <Contact />
    <Footer />
  </>
);

export default ContactPage;