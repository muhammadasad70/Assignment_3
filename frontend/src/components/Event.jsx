import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
//import "./Event.css";

const Event = ({ user }) => {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [editingEvent, setEditingEvent] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/v1/event");
      setEvents(res.data);
    } catch (error) {
      toast.error("Failed to fetch events");
    }
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:4000/api/v1/event/create",
        {
          title,
          description,
          date,
          location,
        },
        {
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        }
      );
      toast.success(res.data.message);
      setTitle("");
      setDescription("");
      setDate("");
      setLocation("");
      fetchEvents(); // Refresh the event list
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleUpdateEvent = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `http://localhost:4000/api/v1/event/update/${editingEvent._id}`,
        {
          title,
          description,
          date,
          location,
        },
        {
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        }
      );
      toast.success(res.data.message);
      setTitle("");
      setDescription("");
      setDate("");
      setLocation("");
      setEditingEvent(null);
      fetchEvents(); // Refresh the event list
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete(`http://localhost:4000/api/v1/event/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(res.data.message);
      fetchEvents(); // Refresh the event list
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleEditClick = (event) => {
    setEditingEvent(event);
    setTitle(event.title);
    setDescription(event.description);
    setDate(new Date(event.date).toISOString().split("T")[0]);
    setLocation(event.location);
  };

  return (
    <div className="event container">
      {user && user.role === "admin" && (
        <>
          <h2>Logged in as Admin</h2>
          <h2>{editingEvent ? "Update Event" : "Create Event"}</h2>
          <form onSubmit={editingEvent ? handleUpdateEvent : handleCreateEvent}>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
            <button type="submit">{editingEvent ? "Update Event" : "Create Event"}</button>
          </form>
        </>
      )}

      <h2>Events</h2>
      <ul>
        {events.map((event) => (
          <li key={event._id}>
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <p>{new Date(event.date).toLocaleDateString()}</p>
            <p>{event.location}</p>
            {user && user.role === "admin" && (
              <>
                <button onClick={() => handleEditClick(event)}>Edit</button>
                <button className="delete" onClick={() => handleDeleteEvent(event._id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Event;