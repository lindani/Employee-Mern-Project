import { createError } from "../error.js";
import User from "../models/User.js";

export const updateUser = async (req, res, next) => {
	const { id } = req.params;
	const { id: userId } = req.user;

	if (id !== userId) {
		return next(createError(403, "You can only update your account"));
	}

	try {
		const updatedUser = await User.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body,
			},
			{ new: true }
		);

		res.status(200).json(updatedUser);
	} catch (error) {
		next(error);
	}
};
