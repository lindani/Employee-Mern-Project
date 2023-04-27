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

import { updateEmployee } from "../redux/actions/employeeActions";

const EmployeeDialogForm = ({ open, handleClose, employee, title }) => {
	const dispatch = useDispatch();

	const [formData, setFormData] = useState({
		name: "",
		surname: "",
		email: "",
		company: "",
		phone: "",
		position: "",
		salary: "",
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
		dispatch(updateEmployee(formData));
	};

	return (
		<>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle component="h1" variant="h5">
					{title}
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
						margin="dense"
						name="name"
						label="Name"
						type="text"
						fullWidth
						value={employee.name}
						onChange={handleInputChange}
						required
					/>
					<TextField
						margin="dense"
						name="surname"
						label="Surname"
						type="text"
						fullWidth
						value={employee.surname}
						onChange={handleInputChange}
						required
					/>
					<TextField
						margin="dense"
						name="email"
						label="Email"
						type="email"
						fullWidth
						value={employee.email}
						onChange={handleInputChange}
						required
					/>
					<TextField
						margin="dense"
						name="company"
						label="Company"
						type="text"
						fullWidth
						value={employee.company}
						onChange={handleInputChange}
						required
					/>
					<TextField
						margin="dense"
						name="phone"
						label="Phone Number"
						type="text"
						fullWidth
						value={employee.phone}
						onChange={handleInputChange}
						required
					/>
					<TextField
						margin="dense"
						name="position"
						label="Position"
						type="text"
						fullWidth
						value={employee.position}
						onChange={handleInputChange}
						required
					/>
					<TextField
						margin="dense"
						name="salary"
						label="Salary"
						type="text"
						fullWidth
						value={employee.salary}
						onChange={handleInputChange}
						required
					/>
				</DialogContent>

				<Button
					type="submit"
					variant="contained"
					sx={{ mt: 3, mb: 3 }}
					size="small"
					onClick={handleSubmit}
				>
					Submit
				</Button>
			</Dialog>
		</>
	);
};

export default EmployeeDialogForm;
