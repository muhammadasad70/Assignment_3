import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator"; // Import the validator library

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required!"],
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: "Invalid email address!",
    },
  },
  password: {
    type: String,
    required: [true, "Password is required!"],
    minLength: [6, "Password must be at least 6 characters long!"],
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

export const User = mongoose.model("User", userSchema);