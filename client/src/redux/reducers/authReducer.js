// authReducer.js

import {
	AUTH_START,
	AUTH_SIGNIN_SUCCESS,
	AUTH_FAIL,
	AUTH_SIGNOUT_SUCCESS,
} from "../actions/actionTypes";

const initialState = {
	payload: null,
	error: null,
	loading: false,
};

const authStart = (state) => ({
	...state,
	loading: true,
});

const authSuccess = (state, action) => ({
	...state,
	payload: action.payload,
	error: null,
	loading: false,
});

const authFail = (state, action) => ({
	...state,
	error: action.error,
	loading: false,
});

const authSignoutSuccess = (state) => {
	return {
		...state,
	};
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case AUTH_START:
			return authStart(state);
		case AUTH_SIGNIN_SUCCESS:
			return authSuccess(state, action);
		case AUTH_FAIL:
			return authFail(state, action);
		case AUTH_SIGNOUT_SUCCESS:
			return authSignoutSuccess(initialState);
		default:
			return state;
	}
};

export default authReducer;
