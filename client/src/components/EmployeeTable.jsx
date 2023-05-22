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
	Pagination,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import { DeleteOutlined, BorderColor, Close } from "@mui/icons-material";
import { Formik } from "formik";
import * as yup from "yup";

import LinearWithValueLabel from "../components/LinearProgressBar";
import EmployeeDialogForm from "../components/EmployeeDialogForm";

import {
	employeeStart,
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

const EmployeeTable = () => {
	const dispatch = useDispatch();

	const [open, setOpen] = useState(false);
	const [selectedEmployee, setSelectedEmployee] = useState(null);

	const [currentPage, setCurrentPage] = useState(1);
	const classes = useStyles();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(employeeStart());
		dispatch(fetchEmployees());
		navigate(`/?page=${currentPage}`);
	}, [dispatch, navigate, currentPage]);

	const { loading, employees } = useSelector((state) => state.employee);

	const handleClose = () => {
		setSelectedEmployee(null);
		setOpen(false);
	};

	const handleDelete = (id) => {
		if (window.confirm("Are you sure you want to delete this employee?")) {
			dispatch(deleteEmployee(id));
			dispatch(employeeStart());
		}
	};

	const handleFormSubmit = (values) => {
		dispatch(employeeStart());
		dispatch(updateEmployee(values));
		handleClose();
	};

	const pageSize = 5;
	const startIndex = (currentPage - 1) * pageSize;
	const endIndex = startIndex + pageSize;
	const visibleEmployees = employees?.slice(startIndex, endIndex);

	const handlePageChange = (event, value) => {
		setCurrentPage(value);
	};

	const handleOpen = (employee) => {
		setSelectedEmployee(employee);

		setOpen(true);
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
							<TableRow key={employee?._id}>
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
									<Tooltip title="Edit employee">
										<IconButton
											size="large"
											color="inherit"
											onClick={() => handleOpen(employee)}
										>
											<BorderColor />
										</IconButton>
									</Tooltip>

									<Tooltip title="Delete Employee">
										<IconButton
											aria-label="Delete a Employee"
											size="large"
											color="inherit"
											onClick={() => handleDelete(employee?._id)}
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
				<EmployeeDialogForm
					open={open}
					handleClose={handleClose}
					initialValues={selectedEmployee}
				/>
			}
			{
				<div className={classes.pagination}>
					<Pagination
						count={Math.ceil(employees?.length / pageSize) || 0}
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
