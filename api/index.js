import express from "express";
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import morgan from "morgan";
import cors from "cors";
import userRoutes from "../routes/user_routes.js";

dotenv.config();

connectDB();

const app = express();

app.use(cors())
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/user", userRoutes);


const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
    console.log(
        `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
            .white
    );
});