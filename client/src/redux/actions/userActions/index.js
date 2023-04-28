import { createAsyncThunk } from "@reduxjs/toolkit";

import apiConfig from "../apiConfig";
// import { persistor } from "../../store";

import {
	AUTH_START,
	AUTH_SIGNIN_SUCCESS,
	AUTH_FAIL,
	AUTH_SIGNOUT_SUCCESS,
} from "../actionTypes";

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

export const authSignup = (formData) => async (dispatch) => {
	console.log("authSignup", formData);
	try {
		const response = await apiConfig.post("/auth/signup", formData);
		const { token } = response.data;
		localStorage.setItem("token", token);
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
			const response = await apiConfig.post("/auth/signin", data);
			const { token } = response.data;
			localStorage.setItem("token", token);
			return dispatch(authSuccess(response));
		} catch (error) {
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
		const token = localStorage.getItem("token");

		if (token && typeof window !== "undefined") {
			localStorage.removeItem("token");
			localStorage.removeItem("persist:root");
			dispatch({
				type: AUTH_SIGNOUT_SUCCESS,
				payload: "You've signed out successfuly",
			});
		}
	} catch (error) {
		dispatch(authFail(error));
	}
};
