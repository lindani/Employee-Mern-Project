import React, { useState } from "react";
import { useDispatch } from "react-redux";

import {
	Container,
	Box,
	Typography,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	IconButton,
	TextField,
	Button,
} from "@mui/material";
import { Add, Close } from "@mui/icons-material";
import EmployeeTable from "../components/EmployeeTable";

import { addEmployee, employeeStart } from "../redux/actions/employeeActions";

const Home = () => {
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
	const [open, setOpen] = useState(false);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		dispatch(addEmployee(formData));
		// dispatch(employeeStart());
		// const { name, value } = event.target;
		// setFormData((prevState) => ({
		// 	...prevState,
		// 	[name]: value,
		// }));
		// showSnackbar("success", "Todo added successfully.");
		handleClose();
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
				<Dialog open={open} onClose={handleClose}>
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
							margin="dense"
							name="name"
							label="Name"
							type="text"
							fullWidth
							onChange={handleInputChange}
							required
						/>
						<TextField
							margin="dense"
							name="surname"
							label="Surname"
							type="text"
							fullWidth
							onChange={handleInputChange}
							required
						/>
						<TextField
							margin="dense"
							name="email"
							label="Email"
							type="email"
							fullWidth
							onChange={handleInputChange}
							required
						/>
						<TextField
							margin="dense"
							name="company"
							label="Company"
							type="text"
							fullWidth
							onChange={handleInputChange}
							required
						/>
						<TextField
							margin="dense"
							name="phone"
							label="Phone Number"
							type="text"
							fullWidth
							onChange={handleInputChange}
							required
						/>
						<TextField
							margin="dense"
							name="position"
							label="Position"
							type="text"
							fullWidth
							onChange={handleInputChange}
							required
						/>
						<TextField
							margin="dense"
							name="salary"
							label="Salary"
							type="text"
							fullWidth
							onChange={handleInputChange}
							required
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
			</Box>
		</Container>
	);
};

export default Home;
