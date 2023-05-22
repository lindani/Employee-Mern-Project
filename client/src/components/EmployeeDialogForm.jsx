import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Close } from "@mui/icons-material";
import {
	TextField,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	IconButton,
	Typography,
} from "@mui/material";

import { Send } from "@mui/icons-material";
import { Formik } from "formik";
import * as yup from "yup";

import {
	employeeStart,
	updateEmployee,
	addEmployee,
} from "../redux/actions/employeeActions";

const phoneRegExp =
	/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const employeeSchema = yup.object().shape({
	name: yup.string().required("Name is required"),
	surname: yup.string().required("Surname is required"),

	email: yup.string().email("Must be a valid email"),
	company: yup.string().required("Company is required"),
	phone: yup.string().matches(phoneRegExp, "Phone number is not valid"),
	position: yup.string().required("Position is required"),
	salary: yup.string().required("Salary is required"),
});

const initialEmployeeValues = {
	name: "",
	surname: "",
	email: "",
	company: "",
	phone: "",
	position: "",
	salary: "",
};

const EmployeeDialogForm = ({ open, handleClose, initialValues }) => {
	const dispatch = useDispatch();

	useEffect(() => {
		if (!initialValues) {
			handleClose();
		}
	}, [initialValues, handleClose]);

	const handleFormSubmit = (values) => {
		dispatch(employeeStart());

		if (initialValues) {
			dispatch(updateEmployee(values));
		} else {
			dispatch(addEmployee(values));
		}

		handleClose();
	};

	const getTitle = () => {
		return initialValues ? "Edit Employee" : "Add Employee";
	};

	if (!initialValues) {
		return null;
	}

	return (
		<Formik
			initialValues={initialValues ? initialValues : initialEmployeeValues}
			validationSchema={employeeSchema}
			onSubmit={handleFormSubmit}
			// validator={() => ({})}
		>
			{({
				handleSubmit,
				handleChange,
				handleBlur,
				values,
				touched,
				errors,
			}) => (
				<Dialog open={open} onClose={handleClose}>
					<DialogTitle component="h1" variant="h5">
						<Typography>{getTitle()}</Typography>
						<IconButton
							sx={{
								position: "absolute",
								top: 8,
								right: 8,
							}}
							onClick={handleClose}
						>
							{" "}
							<Close />
						</IconButton>
					</DialogTitle>
					<DialogContent dividers>
						<TextField
							sx={{ mt: 2 }}
							label="Name"
							type="text"
							name="name"
							onBlur={handleBlur}
							onChange={handleChange}
							value={values?.name}
							fullWidth
							required
							error={Boolean(touched.name) && Boolean(errors.name)}
							helperText={touched.name && errors.name}
						/>
						<TextField
							sx={{ mt: 2 }}
							label="Surname"
							type="text"
							name="surname"
							onBlur={handleBlur}
							onChange={handleChange}
							value={values?.surname}
							fullWidth
							required
							error={Boolean(touched.surname) && Boolean(errors.surname)}
							helperText={touched.surname && errors.surname}
						/>

						<TextField
							sx={{ mt: 2 }}
							label="Email"
							type="email"
							name="email"
							onBlur={handleBlur}
							onChange={handleChange}
							value={values?.email}
							fullWidth
							required
							error={Boolean(touched.email) && Boolean(errors.email)}
							helperText={touched.email && errors.email}
						/>

						<TextField
							sx={{ mt: 2 }}
							label="Company"
							type="text"
							name="company"
							onBlur={handleBlur}
							onChange={handleChange}
							value={values?.company}
							fullWidth
							required
							error={Boolean(touched.company) && Boolean(errors.company)}
							helperText={touched.company && errors.company}
						/>
						<TextField
							sx={{ mt: 2 }}
							label="Phone Number"
							type="text"
							name="phone"
							onBlur={handleBlur}
							onChange={handleChange}
							value={values?.phone}
							fullWidth
							required
							error={Boolean(touched.phone) && Boolean(errors.phone)}
							helperText={touched.phone && errors.phone}
						/>
						<TextField
							sx={{ mt: 2 }}
							label="Position"
							type="text"
							name="position"
							onBlur={handleBlur}
							onChange={handleChange}
							value={values?.position}
							fullWidth
							required
							error={Boolean(touched.position) && Boolean(errors.position)}
							helperText={touched.position && errors.position}
						/>
						<TextField
							sx={{ mt: 2 }}
							label="Salary"
							type="text"
							name="salary"
							onBlur={handleBlur}
							onChange={handleChange}
							value={values?.salary}
							fullWidth
							required
							error={Boolean(touched.salary) && Boolean(errors.salary)}
							helperText={touched.salary && errors.salary}
						/>
						<Button
							type="submit"
							variant="contained"
							sx={{ mt: 3, mb: 3 }}
							size="large"
							fullWidth
							onClick={handleSubmit}
						>
							{initialValues ? "Update" : "Add"}
						</Button>
					</DialogContent>
				</Dialog>
			)}
		</Formik>
	);
};

export default EmployeeDialogForm;
