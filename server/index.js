import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";
import userRoutes from "./routes/user.routes.js";
import startupRoutes from "./routes/startup.routes.js";
import ratingRoutes from "./routes/rating.routes.js";
import feedbackRoutes from "./routes/feedback.routes.js";
import bookmarkRoutes from "./routes/bookmark.routes.js";

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());
connectDB();

app.use("/auth", userRoutes);
app.use("/startup", startupRoutes);
app.use('/rating', ratingRoutes); 
app.use('/feedback', feedbackRoutes); 
app.use("/bookmark", bookmarkRoutes);

app.get("/", (req, res) => {
    res.send("Server is running");
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
