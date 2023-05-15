import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createError } from "../error.js";

export const signup = async function (req, res, next) {
	try {
		const { name, email, password, confirmPassword, profileImage } = req.body;

		if (!name || !email || !password || !confirmPassword) {
			return next(createError(400, "Please fill all fields."));
		}

		const existingUser = await User.findOne({ name });
		if (existingUser) {
			return next(createError(404, "User already exists"));
		}

		const salt = bcrypt.genSaltSync(10);
		const hashedPassword = bcrypt.hashSync(password, salt);

		const newUser = await User.create({
			name,
			email,
			password: hashedPassword,
			profileImage: profileImage ? `uploads/${profileImage}` : null,
		});

		const payload = { id: newUser._id, name: newUser.name };
		const token = jwt.sign(payload, process.env.JWT_TOKEN, { expiresIn: 3600 });

		const { hashedPassword: userPassword, ...includedUserDetails } =
			newUser._doc;

		res
			.cookie("access_token", token, { httpOnly: true })
			.status(200)
			.json({ ...includedUserDetails, token });
	} catch (error) {
		next(error);
	}
};

export const signin = async (req, res, next) => {
	try {
		const { name, password } = req.body;
		const user = await User.findOne({ name });
		if (!user) return next(createError(404, "User not found"));

		const isCorrect = await bcrypt.compare(password, user.password);
		if (!isCorrect) return next(createError(400, "Wrong credentials!"));

		const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN);
		const { password: userPassword, ...includedUserDetails } = user._doc;

		return res
			.cookie("access_token", token, {
				httpOnly: true,
			})
			.status(200)
			.json({ ...includedUserDetails, token });
	} catch (error) {
		next(error);
	}
};

export const signout = async (req, res, next) => {
	try {
		// Clear the token cookie
		res.clearCookie("token");

		// Destroy the session
		req.session.destroy((err) => {
			if (err) {
				console.log(err);
				return res.status(500).json({ message: "Server error" });
			}
			// Send a success message
			console.log("Logout successful", res.cookie);
			return res.status(200).json({ message: "Logout successful" });
		});
	} catch (error) {
		next(error);
	}
};
