import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required!"],
        minLength: [3, "Name must be at least 3 characters long!"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is required!"],
        validate: {
            validator: validator.isEmail,
            message: "Invalid email address!"
        },
    },
    subject: {
        type: String,
        required: [true, "Subject is required!"],
        minLength: [5, "Subject must be at least 5 characters long!"],
    },
    message: {
        type: String,
        required: [true, "Message is required!"],
        minLength: [10, "Message must be at least 10 characters long!"],
    },
});

export const Message = mongoose.model("Message", messageSchema);