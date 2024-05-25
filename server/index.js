import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import configDB from "./config/mongoDBconfig.js";
import taskRouter from "./routes/taskRoutes.js";
const app = express();
app.use(cors());
app.use(express.json());
app.use("/tasks", taskRouter);
// dot env
dotenv.config();
app.use(morgan("dev"));
const mongoDBURI = process.env.MONGO_URI;
const port = process.env.PORT;

configDB(mongoDBURI);

app.listen(port, console.log(`Backend running on ${port}`));
