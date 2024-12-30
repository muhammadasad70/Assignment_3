import React from "react";
//import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <p>&copy; 2025 EventEase. All rights reserved.</p>
      <div className="newsletter">
        <input type="email" placeholder="Enter your email" />
        <button>Subscribe</button>
        <p>Stay updated with our latest events and offers</p>
      </div>
    </footer>
  );
};

export default Footer;