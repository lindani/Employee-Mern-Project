import { createError } from "../error.js";
import User from "../models/User.js";
import Employee from "../models/Employee.js";

export const addEmployee = async (req, res, next) => {
	const newEmployee = new Employee({ userId: req.user.id, ...req.body });
	try {
		const savedEmployee = await newEmployee.save();
		res.status(200).json(savedEmployee);
	} catch (err) {
		next(err);
	}
};

export const getEmployees = async (req, res, next) => {
	try {
		const employees = await Employee.find({ userId: req.user.id });
		res.status(200).json(employees);
	} catch (err) {
		next(err);
	}
};

export const getEmployee = async (req, res, next) => {
	try {
		const employee = await Employee.findById(req.params.id);
		if (!employee) return createError(403, "Employee not found!");

		if (req.user.id === employee.userId) {
			res.status(200).json(employee);
		} else {
			return next(
				createError(404, "You can only find your own Employee information!")
			);
		}
	} catch (err) {
		next(err);
	}
};

export const updateEmployee = async (req, res, next) => {
	console.log(req.body);
	try {
		const employee = await Employee.findById(req.params.id);
		if (!employee) return createError(403, "Employee not found!");
		if (req.user.id === employee.userId) {
			const updatedEmployee = await Employee.findByIdAndUpdate(
				req.params.id,
				{
					$set: req.body,
				},
				{ new: true }
			);
			res.status(200).json(updatedEmployee);
		} else {
			return next(
				createError(403, "You can only update your own Employee information!")
			);
		}
	} catch (err) {
		next(err);
	}
};

export const deleteEmployee = async (req, res, next) => {
	try {
		const employee = await Employee.findById(req.params.id);
		if (!employee)
			return next(createError(403, "Employee information not found!"));
		if (req.user.id === employee.userId) {
			await Employee.findByIdAndDelete(req.params.id);
			res.status(200).json("Employee information deleted successfully");
		} else {
			return next(
				createError(403, "You can only delete your own Employee information!")
			);
		}
	} catch (err) {
		next(err);
	}
};
