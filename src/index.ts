import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./config/db";
import type { Request, Response } from "express";
import authRoutes from "./routes/auth.routes";
import contentRoutes from "./routes/content.routes";
import linkRoutes from "./routes/link.routes";
dotenv.config();
const app= express();
const allowedOrigins = [
  "http://localhost:5173",
  "https://frontendbrainly.onrender.com"
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

app.use(express.json());
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/content", contentRoutes);
app.use("/api/v1/link", linkRoutes);
connectDB();
app.get("/", (req: Request, res: Response) => {
    res.send("API is running...");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});