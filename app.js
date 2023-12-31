import express from "express";
import dotenv from "dotenv";
import connect from "./src/db/connect.js";
import userRoutes from "./src/routes/users.js";
import commentRoutes from "./src/routes/comments.js";
import videoRoutes from "./src/routes/videos.js";
import authRoutes from "./src/routes/auth.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

const port = process.env.PORT || 8080;

app.use(cookieParser());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/auth", authRoutes);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.listen(port, () => {
  connect();
  console.log("connected to server!");
});
