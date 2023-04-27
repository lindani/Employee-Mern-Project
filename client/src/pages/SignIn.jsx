import React, { useState } from "react";
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
} from "@mui/material";

import { Send } from "@mui/icons-material";

import { authSignin } from "../redux/actions/userActions";

const SignIn = ({ open, handleClose }) => {
	const dispatch = useDispatch();

	const [formData, setFormData] = useState({
		name: "",
		password: "",
	});

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		dispatch(authSignin(formData));
	};

	return (
		<>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle component="h1" variant="h5">
					SignIn{" "}
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
				<form onSubmit={handleSubmit}>
					<DialogContent dividers>
						<TextField
							margin="dense"
							name="name"
							label="Name"
							type="text"
							fullWidth
							value={formData.name}
							onChange={handleInputChange}
							required
						/>

						<TextField
							margin="dense"
							name="password"
							label="Password"
							type="password"
							fullWidth
							value={formData.password}
							onChange={handleInputChange}
							required
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} sx={{ mt: 3, mb: 3 }}>
							Cancel
						</Button>
						<Button
							type="submit"
							variant="contained"
							sx={{ mt: 3, mb: 3 }}
							onClick={handleClose}
							endIcon={<Send />}
						>
							Submit
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		</>
	);
};

export default SignIn;
