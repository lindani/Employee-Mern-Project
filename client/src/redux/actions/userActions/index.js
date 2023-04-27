import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import {
	AUTH_START,
	AUTH_SIGNIN_SUCCESS,
	AUTH_FAIL,
	AUTH_SIGNOUT_SUCCESS,
} from "../actionTypes";

const API_URL = "http://localhost:3002/api";

const token = localStorage.getItem("token");

export const authStart = () => ({
	type: AUTH_START,
});

export const authSuccess = (response) => ({
	type: AUTH_SIGNIN_SUCCESS,
	payload: response.data,
});

export const authFail = (error) => ({
	type: AUTH_FAIL,
	payload:
		error.response && error.response.data.message
			? error.response.data.message
			: error.message,
});

// export const logout = () => ({
//   type: AUTH_LOGOUT,
// });

// export const authSignOut = () => async (dispatch, getState) => {
//    try {
//       const res = await axios.post(`${API_URL}/auth/signout`, null, tokenConfig(getState));
//       dispatch({
//          type: AUTH_SIGNOUT_SUCCESS,
//       });
//    } catch (err) {
//       dispatch(
//          err.response.data, err.response.status, "LOGOUT_FAIL"
//       );
//    }
// };

// export const authSignout = () => async (dispatch, getState) => {
//   try {
//     const token = await localStorage.getItem('token');
//     if (!token) {
//       console.log('Token not found in localStorage');
//       return;
//     }
//     const response = await axios.post(`${API_URL}/auth/signout`, null, tokenConfig(getState));
//     localStorage.removeItem("token")
//     console.log('token', localStorage.getItem("token"));
//     return dispatch({ type: AUTH_SIGNOUT_SUCCESS, payload: response });

//   } catch (error) {
//     return dispatch({
//       type: "LOGOUT_FAIL",
//       payload: { errorMessage: error.response.data, errorCode: error.response.status}
//     });
//   }
// };

// export const authSignin = (data) => async (dispatch, getState) => {
//   console.log('my data', data);
//   try {
//       dispatch(authStart());
//       const response = await axios.post(`${API_URL}/auth/signin`, data, tokenConfig(getState));
//       const { token } = response.data;
//       localStorage.setItem('token', token);
//       return dispatch(authSuccess(token));

//       // dispatch({ type: LOGIN_SUCCESS, payload: token });

//   } catch (error) {
//       console.log('my error', error);
//       return dispatch(authFail(error.response.data.message));
//   }
// };

export const authSignup = (formData) => async (dispatch) => {
	console.log("authSignup", formData);
	try {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		const response = await axios.post(
			`${API_URL}/auth/signup`,
			formData,
			config
		);
		const { token } = response.data;

		localStorage.setItem("token", token);
		// return response;
		return dispatch(authSuccess(response));
	} catch (error) {
		dispatch(authFail(error));
	}
};

export const authSignin = createAsyncThunk(
	"auth/signin",
	async (data, { rejectWithValue, dispatch }) => {
		console.log("haibo", data);
		try {
			const config = {
				headers: {
					"Content-Type": "application/json",
				},
			};
			const response = await axios.post(`${API_URL}/auth/signin`, data, config);
			const { token } = response.data;

			localStorage.setItem("token", token);
			// return response;
			return dispatch(authSuccess(response));
			// return dispatch();
		} catch (error) {
			// return custom error message from backend if present
			if (error.response && error.response.data.message) {
				return rejectWithValue(error.response.data.message);
			} else {
				return rejectWithValue(error.message);
			}
		}
	}
);

export const authSignout = () => async (dispatch) => {
	try {
		if (token && typeof window !== "undefined") {
			localStorage.removeItem("token");
			localStorage.removeItem("user");
			axios.defaults.headers.common = {};
			window.google?.accounts.id.revoke(token, () => {
				return {};
			});

			return dispatch({
				type: AUTH_SIGNOUT_SUCCESS,
				payload: "You've signed out successfuly",
			});
		}
	} catch (error) {
		dispatch(authFail(error));
	}
};

export const tokenConfig = (getState) => {
	const { auth } = getState().auth;
	console.log(auth);
	const headers = {
		"Content-Type": "application/json",
	};

	// If authenticated, add the token to the headers
	if (auth && auth.token) {
		headers["Authorization"] = `Bearer ${auth.token}`;
	}

	const config = {
		headers,
	};
	console.log(JSON.stringify(config));
	return config;
};

// export const signup = (name, email, password) => async (dispatch) => {
// 	try {
// 		const res = await axios.post("/signup", { name, email, password });
// 		dispatch({ type: "SIGNUP_SUCCESS", payload: res.data });
// 	} catch (err) {
// 		dispatch({ type: "SIGNUP_FAILURE", payload: err.response.data });
// 	}
// };
