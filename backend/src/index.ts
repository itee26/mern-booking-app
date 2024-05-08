import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import cookiePareser from "cookie-parser";
import path from "path";

const uri =
  "mongodb+srv://ADMIN:<password>@cluster0.dbxiqky.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  
const app = express();
app.use(cookiePareser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.static(path.join(__dirname,"../../frontend/dist")));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.listen(7001, () => {
  console.log("server running is on localhost 7001");
});
