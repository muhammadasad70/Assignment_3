import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required!"],
    minLength: [3, "Title must be at least 3 characters long!"],
    trim: true
  },
  description: {
    type: String,
    required: [true, "Description is required!"],
    minLength: [10, "Description must be at least 10 characters long!"],
  },
  date: {
    type: Date,
    required: [true, "Date is required!"],
  },
  location: {
    type: String,
    required: [true, "Location is required!"],
    minLength: [3, "Location must be at least 3 characters long!"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Event = mongoose.model("Event", eventSchema);