import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
	TextField,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	IconButton,
	Tooltip,
	Avatar,
	Dialog,
	DialogTitle,
	DialogContent,
	Button,
} from "@mui/material";
import Pagination from "@mui/lab/Pagination";
import { makeStyles } from "@mui/styles";

import { DeleteOutlined, BorderColor, Close } from "@mui/icons-material";

import LinearWithValueLabel from "../components/LinearProgressBar";

import {
	fetchEmployees,
	deleteEmployee,
	updateEmployee,
} from "../redux/actions/employeeActions";

const useStyles = makeStyles((theme) => ({
	root: {
		"& > *": {
			marginTop: theme.spacing(2),
		},
	},
	pagination: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		margin: theme.spacing(2, 0),
	},
}));

const EmployeeTable = () => {
	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);
	const [selectedEmployee, setSelectedEmployee] = useState();
	const [pageSize, setPageSize] = useState(5);
	const [currentPage, setCurrentPage] = useState(1);
	const classes = useStyles();
	const navigate = useNavigate();

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setSelectedEmployee((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	useEffect(() => {
		dispatch(fetchEmployees());
		navigate(`/?page=${currentPage}`);
	}, [dispatch, navigate, currentPage]);

	const { loading, employees } = useSelector((state) => state.employee);

	const handleOpen = (employee) => {
		setOpen(true);
		setSelectedEmployee(employee);
	};
	const handleClose = () => setOpen(false);

	const handleDelete = (id) => {
		dispatch(deleteEmployee(id));
	};

	const handleUpdate = () => {
		dispatch(updateEmployee(selectedEmployee));
	};

	const startIndex = (currentPage - 1) * pageSize;
	const endIndex = startIndex + pageSize;
	const visibleEmployees = employees?.slice(startIndex, endIndex);

	const handlePageChange = (event, value) => {
		setCurrentPage(value);
	};

	return (
		<>
			{loading ? (
				<LinearWithValueLabel />
			) : (
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Avatar</TableCell>
							<TableCell>Name</TableCell>
							<TableCell>Surname</TableCell>

							<TableCell>Position</TableCell>
							<TableCell>Company</TableCell>
							<TableCell>Action</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{visibleEmployees?.map((employee) => (
							<TableRow key={employee._id}>
								<TableCell>
									{" "}
									<IconButton>
										<Avatar src="" alt={employee?.name}>
											{employee?.name?.charAt(0).toUpperCase()}
										</Avatar>
									</IconButton>
								</TableCell>
								<TableCell>{employee.name}</TableCell>
								<TableCell>{employee.surname}</TableCell>

								<TableCell>{employee.position}</TableCell>
								<TableCell>{employee.company}</TableCell>
								<TableCell>
									<Tooltip title="Edit Employee">
										<IconButton
											size="large"
											color="inherit"
											onClick={() => handleOpen(employee)}
										>
											<BorderColor />
										</IconButton>
									</Tooltip>
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
												value={selectedEmployee?.name}
												onChange={handleInputChange}
												required
											/>
											<TextField
												margin="dense"
												name="surname"
												label="Surname"
												type="text"
												fullWidth
												value={selectedEmployee?.surname}
												onChange={handleInputChange}
												required
											/>
											<TextField
												margin="dense"
												name="email"
												label="Email"
												type="email"
												fullWidth
												value={selectedEmployee?.email}
												onChange={handleInputChange}
												required
											/>
											<TextField
												margin="dense"
												name="company"
												label="Company"
												type="text"
												fullWidth
												value={selectedEmployee?.company}
												onChange={handleInputChange}
												required
											/>
											<TextField
												margin="dense"
												name="phone"
												label="Phone Number"
												type="text"
												fullWidth
												value={selectedEmployee?.phone}
												onChange={handleInputChange}
												required
											/>
											<TextField
												margin="dense"
												name="position"
												label="Position"
												type="text"
												fullWidth
												value={selectedEmployee?.position}
												onChange={handleInputChange}
												required
											/>
											<TextField
												margin="dense"
												name="salary"
												label="Salary"
												type="text"
												fullWidth
												value={selectedEmployee?.salary}
												onChange={handleInputChange}
												required
											/>
											<Button
												type="submit"
												variant="contained"
												sx={{ mt: 3, mb: 3 }}
												size="large"
												fullWidth
												onClick={handleUpdate}
											>
												Submit
											</Button>
										</DialogContent>
									</Dialog>
									<Tooltip title="Delete Employee">
										<IconButton
											aria-label="Delete a Employee"
											size="large"
											color="inherit"
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
			{
				<div className={classes.pagination}>
					<Pagination
						count={Math.ceil(employees?.length / pageSize)}
						page={currentPage}
						onChange={handlePageChange}
						shape="rounded"
						size="large"
					/>
				</div>
			}
		</>
	);
};

export default EmployeeTable;
