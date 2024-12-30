import React from "react";
import "./Services.css";

const Services = () => {
  const services = [
    {
      id: 1,
      url: "/concert.jpg",
      title: "Concert Planning",
    },
    {
      id: 2,
      url: "/qawali.jpg",
      title: "Qawali Night Planning",
    },
    {
      id: 3,
      url: "/camping.jpg",
      title: "Camping Trip Planning",
    },
    {
      id: 4,
      url: "/gamenight.jpg",
      title: "Game Night Planning",
    },
    {
      id: 5,
      url: "/party.jpg",
      title: "Party Planning",
    },
    {
      id: 6,
      url: "/autoshow.jpg",
      title: "AutoShow Planning",
    },
  ];

  return (
    <div className="services">
      <h2>Our Services</h2>
      <div className="service-cards">
        {services.map((service) => (
          <div key={service.id} className="service-card">
            <img src={service.url} alt={service.title} />
            <h3>{service.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;