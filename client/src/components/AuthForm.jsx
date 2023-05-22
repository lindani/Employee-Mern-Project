import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Close } from "@mui/icons-material";
import {
	TextField,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	IconButton,
	Snackbar,
	Alert,
} from "@mui/material";
import { Send } from "@mui/icons-material";
import { Formik } from "formik";
import * as yup from "yup";

import {
	authSignin,
	authSignup,
	authStart,
} from "../redux/actions/userActions";

const signinSchema = yup.object().shape({
	name: yup.string().required("Name is required"),
	password: yup.string().required("Password is required"),
});

const signupSchema = yup.object().shape({
	name: yup.string().required("Name is required"),
	email: yup.string().email("Invalid email").required("Email is required"),
	password: yup.string().required("Password is required"),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref("password"), null], "Passwords must match"),
});

const initialSigninValues = {
	name: "",
	password: "",
};

const initialSignupValues = {
	name: "",
	email: "",
	password: "",
	confirmPassword: "",
};

const AuthForm = ({ open, handleClose, authType }) => {
	const dispatch = useDispatch();

	const [authError, setAuthError] = useState("");
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const { error } = useSelector((state) => state.auth);

	const isSignIn = authType === "signin";
	const isSignUp = authType === "signup";

	const handleFormSubmit = (values, onSubmitProps) => {
		authStart();
		if (isSignIn) dispatch(authSignin(values));
		if (isSignUp) dispatch(authSignup(values));
		onSubmitProps.resetForm();

		if (error) {
			setAuthError(error);
			setOpenSnackbar(true);
			open = false;
		}
		handleClose();
	};

	const handleCloseSnackbar = () => {
		setOpenSnackbar(false);
	};

	return (
		<Formik
			onSubmit={handleFormSubmit}
			initialValues={isSignIn ? initialSigninValues : initialSignupValues}
			validationSchema={isSignIn ? signinSchema : signupSchema}
		>
			{({
				values,
				errors,
				touched,
				handleBlur,
				handleChange,
				handleSubmit,
				setFieldValue,
				resetForm,
			}) => (
				<form onSubmit={handleSubmit}>
					{/* {isSignUp && ( */}
					<Dialog open={open} onClose={handleClose}>
						<DialogTitle component="h1" variant="h5">
							{isSignUp ? "Sign Up" : "Sign In"}
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
							{isSignUp && (
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
							)}
							<TextField
								sx={{ mt: 2 }}
								label="Password"
								type="password"
								name="password"
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.password}
								fullWidth
								required
								error={Boolean(touched.password) && Boolean(errors.password)}
								helperText={touched.password && errors.password}
							/>

							{isSignUp && (
								<TextField
									sx={{ mt: 2 }}
									label="Confirm Password"
									type="password"
									name="confirmPassword"
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.confirmPassword}
									fullWidth
									required
									error={
										Boolean(touched.confirmPassword) &&
										Boolean(errors.confirmPassword)
									}
									helperText={touched.confirmPassword && errors.confirmPassword}
								/>
							)}
							<Snackbar
								anchorOrigin={{ vertical: "top", horizontal: "center" }}
								open={openSnackbar}
								autoHideDuration={5000}
								onClose={handleCloseSnackbar}
							>
								<Alert severity="error" onClose={handleCloseSnackbar}>
									{authError}
								</Alert>
							</Snackbar>
						</DialogContent>
						<DialogActions>
							<Button onClick={handleClose} sx={{ mt: 3, mb: 3 }}>
								Cancel
							</Button>
							<Button
								type="submit"
								variant="contained"
								sx={{ mt: 3, mb: 3 }}
								onClick={handleSubmit}
								endIcon={<Send />}
							>
								{isSignUp ? "REGISTER" : "LOGIN"}
							</Button>
						</DialogActions>
					</Dialog>
					{/* )} */}
				</form>
			)}
		</Formik>
	);
};

export default AuthForm;
