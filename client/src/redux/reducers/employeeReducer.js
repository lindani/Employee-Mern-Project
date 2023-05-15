import {
	EMPLOYEE_START,
	ADD_EMPLOYEE,
	UPDATE_EMPLOYEE_SUCCESS,
	DELETE_EMPLOYEE_SUCCESS,
	FETCH_EMPLOYEES_SUCCESS,
} from "../actions/actionTypes";

const initialState = {
	loading: false,
	error: null,
};

const employeeStart = (state, action) => ({
	...state,
	loading: true,
	error: null,
});

const addEmployee = (state, action) => ({
	...state,
	loading: false,
	employees: [...state.employees, action.payload],
});

const updateEmployee = (state, action) => ({
	...state,
	loading: false,
	employees: state.employees.map((employee) =>
		employee._id === action.payload._id ? action.payload : employee
	),
});

const deleteEmployee = (state, action) => {
	return {
		...state,
		loading: false,
		employees: state.employees.filter(
			(employee) => employee._id !== action.payload
		),
	};
};

const fetchEmployeesSuccess = (state, action) => ({
	...state,
	employees: action.payload,
	loading: false,
	error: action.error,
});

const employeeReducer = (state = initialState, action) => {
	switch (action.type) {
		case EMPLOYEE_START:
			return employeeStart(state, action);
		case ADD_EMPLOYEE:
			return addEmployee(state, action);
		case UPDATE_EMPLOYEE_SUCCESS:
			return updateEmployee(state, action);
		case DELETE_EMPLOYEE_SUCCESS:
			return deleteEmployee(state, action);
		case FETCH_EMPLOYEES_SUCCESS:
			return fetchEmployeesSuccess(state, action);
		default:
			return state;
	}
};

export default employeeReducer;
