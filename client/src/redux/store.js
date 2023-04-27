// import { createStore, combineReducers, applyMiddleware } from "redux";
// import thunk from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";
// import employeeReducer from "./reducers/employeeReducer";
// import authReducer from "./reducers/authReducer";
// import asyncMiddleware from "./asyncMiddleware";

// const reducer = combineReducers({
// 	auth: authReducer,
// 	employee: employeeReducer,
// });

// const middleware = [thunk];

// const store = createStore(
// 	reducer,
// 	composeWithDevTools(applyMiddleware(thunk, ...middleware))
// );

// export default store;

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import employeeReducer from "./reducers/employeeReducer";
import authReducer from "./reducers/authReducer";
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";

const persistConfig = {
	key: "root",
	version: 1,
	storage,
};

const rootReducer = combineReducers({
	auth: authReducer,
	employee: employeeReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const reducerStore = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

export const persistor = persistStore(reducerStore);
