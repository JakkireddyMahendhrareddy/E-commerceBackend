import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectToMongoDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
const app = express();
app.use(express.json()); // to parse JSON bodies
dotenv.config();
connectToMongoDB();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

//routes

app.use("/api/users", userRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
