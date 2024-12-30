import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import dotenv from "dotenv";
import messageRouter from "./router/messageRouter.js";
import eventRouter from "./router/eventRouter.js";
import authRouter from "./router/authRouter.js";
import cors from "cors";

dotenv.config({ path: "./config/.env" }); // Load environment variables

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/message", messageRouter);
app.use("/api/v1/event", eventRouter);
app.use("/api/v1/auth", authRouter);

dbConnection();

export default app;