import axios from "axios";

import {
	EMPLOYEE_START,
	ADD_EMPLOYEE,
	UPDATE_EMPLOYEE_SUCCESS,
	DELETE_EMPLOYEE_SUCCESS,
	FETCH_EMPLOYEES_SUCCESS,
} from "../actionTypes";

const API_URL = "http://localhost:3002/api";

export const employeeStart = () => async (dispatch) => {
	dispatch({ type: EMPLOYEE_START });
};

export const addEmployee = (formData) => async (dispatch) => {
	const token = localStorage.getItem("token");

	try {
		employeeStart();
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		};
		const response = await axios.post(`${API_URL}/employees`, formData, config);
		console.log("my response", response.data);
		dispatch({ type: ADD_EMPLOYEE, payload: response.data });
	} catch (error) {
		dispatch({
			type: "ADD_EMPLOYEE_FAIL",
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const fetchEmployees = () => async (dispatch) => {
	const token = localStorage.getItem("token");

	if (!token) {
		throw new Error("Access token not found");
	}
	try {
		employeeStart();
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		};
		const response = await axios.get(`${API_URL}/employees`, config);
		dispatch({ type: FETCH_EMPLOYEES_SUCCESS, payload: response.data });
	} catch (error) {
		dispatch({
			type: "FETCH_EMPLOYEES_FAIL",
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const deleteEmployee = (employeeId) => async (dispatch) => {
	const token = localStorage.getItem("token");

	try {
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		};

		await axios.delete(`${API_URL}/employees/${employeeId}`, config);
		dispatch({
			type: DELETE_EMPLOYEE_SUCCESS,
			payload: employeeId,
		});
	} catch (error) {
		dispatch({
			type: "DELETE_EMPLOYEE_FAILURE",
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const updateEmployee = (formData) => async (dispatch) => {
	const token = localStorage.getItem("token");

	try {
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		};

		const response = await axios.put(
			`${API_URL}/employees/${formData._id}`,
			formData,
			config
		);
		dispatch({
			type: UPDATE_EMPLOYEE_SUCCESS,
			payload: response.data,
		});
	} catch (error) {
		dispatch({
			type: "UPDATE_EMPLOYEE_FAILURE",
			payload: error.message,
		});
	}
};
