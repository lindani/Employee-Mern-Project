import express from "express";
import session from "express-session";

import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/users.js";
import employeesRoutes from "./routes/employee.js";
import authRoutes from "./routes/auth.js";

const app = express();

const corsOptions = {
	credentials: true,
	exposeHeaders: ["authorization"],
};
app.use(cors(corsOptions));

app.set("trust proxy", 1); // trust first proxy

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

dotenv.config();

/* MONGOOSE */
const PORT = process.env.PORT || 6001;

const connect = () => {
	mongoose
		.connect(process.env.MONGO_URL)
		.then(() => {
			console.log("MongoDB database connection established successfully");
		})
		.catch((error) => console.log(`${error} did not connect`));
};
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/employees", employeesRoutes);
app.use((err, req, res, next) => {
	const status = err.status || 500;
	const message = err.message || "Something went wrong";
	return res.status(status).json({
		success: false,
		status,
		message,
	});
});

app.listen(PORT, () => {
	connect();
	console.log(`connected to ${PORT}`);
});
