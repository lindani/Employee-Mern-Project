import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Button,
	IconButton,
	Tooltip,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	TextField,
} from "@mui/material";
import { DeleteOutlined, MoreVert, BorderColor } from "@mui/icons-material";

import EmployeeDialogForm from "../components/EmployeeDialogForm";
import LinearWithValueLabel from "../components/LinearProgressBar";

import {
	fetchEmployees,
	deleteEmployee,
	updateEmployee,
} from "../redux/actions/employeeActions";

const EmployeeTable = () => {
	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		surname: "",
		email: "",
		company: "",
		phone: "",
		position: "",
		salary: "",
	});

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	useEffect(() => {
		dispatch(fetchEmployees());
	}, [dispatch]);

	const { loading, employees } = useSelector((state) => state.employee);

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleUpdate = (event) => {
		event.preventDefault();
		dispatch(updateEmployee(formData));
		handleClose();
	};

	const handleDelete = (id) => {
		dispatch(deleteEmployee(id));
	};

	return (
		<>
			{loading ? (
				<LinearWithValueLabel />
			) : (
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>ID</TableCell>
							<TableCell>Name</TableCell>
							<TableCell>Position</TableCell>
							<TableCell>Salary</TableCell>
							<TableCell>Action</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{employees?.map((employee) => (
							<TableRow key={employee._id}>
								<TableCell>{employee._id}</TableCell>
								<TableCell>{employee.name}</TableCell>
								<TableCell>{employee.position}</TableCell>
								<TableCell>{employee.salary}</TableCell>
								<TableCell>
									<Tooltip title="Edit Employee">
										<IconButton onClick={handleClickOpen}>
											<BorderColor />
										</IconButton>
									</Tooltip>
									<Dialog open={open} onClose={handleClose}>
										<DialogTitle>Edit Employee Details</DialogTitle>
										<DialogContent>
											<DialogContentText>
												To subscribe to this website, please enter your email
												address here. We will send updates occasionally.
											</DialogContentText>
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
												name="surname"
												label="Surname"
												type="text"
												fullWidth
												value={formData.surname}
												onChange={handleInputChange}
												required
											/>
											<TextField
												margin="dense"
												name="email"
												label="Email"
												type="email"
												fullWidth
												value={formData.email}
												onChange={handleInputChange}
												required
											/>
											<TextField
												margin="dense"
												name="company"
												label="Company"
												type="text"
												fullWidth
												value={formData.company}
												onChange={handleInputChange}
												required
											/>
											<TextField
												margin="dense"
												name="phone"
												label="Phone Number"
												type="text"
												fullWidth
												value={formData.phone}
												onChange={handleInputChange}
												required
											/>
											<TextField
												margin="dense"
												name="position"
												label="Position"
												type="text"
												fullWidth
												value={formData.position}
												onChange={handleInputChange}
												required
											/>
											<TextField
												margin="dense"
												name="salary"
												label="Salary"
												type="text"
												fullWidth
												value={formData.salary}
												onChange={handleInputChange}
												required
											/>
										</DialogContent>
										<DialogActions>
											<Button onClick={handleClose}>Cancel</Button>
											{/* <Button variant="contained" onClick={handleUpdate}> */}
											<Button
												variant="contained"
												onClick={() =>
													updateEmployee({ employee, ...formData })
												}
											>
												Update
											</Button>
										</DialogActions>
									</Dialog>
									<Tooltip title="Delete Employee">
										<IconButton
											aria-label="Delete a todo"
											onClick={() => handleDelete(employee._id)}
										>
											<DeleteOutlined />
										</IconButton>
									</Tooltip>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			)}
		</>
	);
};

export default EmployeeTable;
