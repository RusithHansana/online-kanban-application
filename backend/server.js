//To use ES modules we need to add "type": "module" in package.json
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import boardRoutes from "./routes/boardRoutes.js";
import cardRoutes from "./routes/cardRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
//load env variables
dotenv.config();
const port = process.env.PORT || 8000;

connectDB();

const app = express();

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users/", userRoutes);
app.use("/api/boards/", boardRoutes);
app.use("/api/cards/", cardRoutes);
app.use("/api/tasks/", taskRoutes);

app.get("/", (req, res) => res.send("Server is Ready"));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));
