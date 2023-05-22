import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
	Container,
	Box,
	Typography,
	Dialog,
	DialogTitle,
	DialogContent,
	IconButton,
	TextField,
	Button,
	Snackbar,
	Alert,
} from "@mui/material";
import { Add, Close } from "@mui/icons-material";
import { Formik } from "formik";
import * as yup from "yup";

import EmployeeTable from "../components/EmployeeTable";

import { addEmployee, employeeStart } from "../redux/actions/employeeActions";

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

const initialValues = {
	name: "",
	surname: "",
	email: "",
	company: "",
	phone: "",
	position: "",
	salary: "",
};
const HomePage = () => {
	const dispatch = useDispatch();
	const [employeeError, setEmployeeError] = useState("");
	const [openSnackbar, setOpenSnackbar] = useState(false);

	const { error } = useSelector((state) => state.auth);

	const [open, setOpen] = useState(false);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handleFormSubmit = (values) => {
		dispatch(employeeStart());
		dispatch(addEmployee(values));
		handleClose();
		if (error) {
			setEmployeeError(error);
			setOpenSnackbar(true);
		}
	};

	const handleCloseSnackbar = () => {
		setOpenSnackbar(false);
	};

	return (
		<Container>
			<Box
				sx={{
					boxShadow: 8,
					borderRadius: 2,
					px: 4,
					py: 6,
					marginTop: 20,
					display: "flex",
					flexDirection: "column",
				}}
			>
				{" "}
				<Typography component="h1" variant="h5" align="center">
					Employees Infomation
				</Typography>
				<EmployeeTable />
				<Button
					variant="contained"
					style={{ marginTop: 20 }}
					size="large"
					onClick={handleOpen}
				>
					<Add /> Add Employee
				</Button>
				<Formik
					initialValues={{
						name: "",
						surname: "",
						email: "",
						company: "",
						phone: "",
						position: "",
						salary: "",
					}}
					validationSchema={employeeSchema}
					onSubmit={handleFormSubmit}
					validator={() => ({})}
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
							<Snackbar
								anchorOrigin={{ vertical: "top", horizontal: "center" }}
								open={openSnackbar}
								autoHideDuration={3000}
								onClose={handleCloseSnackbar}
							>
								<Alert severity="error" onClose={handleCloseSnackbar}>
									{employeeError}
								</Alert>
							</Snackbar>
							<DialogTitle component="h1" variant="h5">
								Employee Details{" "}
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
									value={values.name}
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
									value={values.surname}
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
									value={values.email}
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
									value={values.company}
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
									value={values.phone}
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
									value={values.position}
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
									value={values.salary}
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
									Submit
								</Button>
							</DialogContent>
						</Dialog>
					)}
				</Formik>
			</Box>
		</Container>
	);
};

export default HomePage;
