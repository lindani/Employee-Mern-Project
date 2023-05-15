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

const persistConfig = {
	key: "root",
	version: 1,
	storage,
	whitelist: ["auth"],
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
