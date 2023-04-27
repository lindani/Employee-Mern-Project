import React from "react";
import ReactDOM from "react-dom/client";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import App from "./App";
// import reportWebVitals from './reportWebVitals';

// import store from "./redux/store";
// import persistor from "./redux/store";

import { persistor, reducerStore } from "./redux/store";

const theme = createTheme({
	palette: {
		primary: {
			main: "#006064",
		},
		secondary: {
			main: "#e91e63",
		},
		palette: {
			type: "dark",
		},
	},
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<Provider store={reducerStore}>
		<PersistGate loading={null} persistor={persistor}>
			<React.StrictMode>
				<ThemeProvider theme={theme}>
					<App />
				</ThemeProvider>
			</React.StrictMode>
		</PersistGate>
	</Provider>
);
