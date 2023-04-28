import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	IconButton,
	Tooltip,
	Avatar,
} from "@mui/material";
import { DeleteOutlined, BorderColor } from "@mui/icons-material";

import EmployeeDialogForm from "../components/EmployeeDialogForm";
import LinearWithValueLabel from "../components/LinearProgressBar";

import {
	fetchEmployees,
	deleteEmployee,
} from "../redux/actions/employeeActions";

const EmployeeTable = () => {
	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	useEffect(() => {
		dispatch(fetchEmployees());
	}, [dispatch]);

	const { loading, employees } = useSelector((state) => state.employee);

	const randomColor = () => {
		const hex = Math.floor(Math.random() * 0xffffff);
		const color = "#" + hex.toString(16);
		return color;
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
							<TableCell>Avatar</TableCell>
							<TableCell>Name</TableCell>
							<TableCell>Surname</TableCell>

							<TableCell>Position</TableCell>
							<TableCell>Company</TableCell>
							<TableCell>Action</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{employees?.map((employee) => (
							<TableRow key={employee._id}>
								<TableCell>
									{" "}
									<IconButton>
										<Avatar
											src=""
											alt={employee?.name}
											style={{
												backgroundColor: randomColor(),
											}}
										>
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
											onClick={handleClickOpen}
										>
											<BorderColor />
										</IconButton>
									</Tooltip>
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
		</>
	);
};

export default EmployeeTable;
