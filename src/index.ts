import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import type { Request, Response } from "express";
import authRoutes from "./routes/auth.routes"
dotenv.config();
const app= express();
app.use(cors());
app.use(express.json());
app.use("/api/v1/auth", authRoutes);
connectDB();
app.get("/", (req: Request, res: Response) => {
    res.send("API is running...");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});