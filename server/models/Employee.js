import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema(
	{
		userId: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		surname: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		phone: {
			type: String,
			required: true,
		},
		company: {
			type: String,
			required: true,
		},
		salary: {
			type: String,
			required: true,
		},
		position: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.model("Employee", EmployeeSchema);
