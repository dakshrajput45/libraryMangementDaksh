import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AppContextProvider from "./context/AppContext.jsx";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";

createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		<AppContextProvider>
			<CookiesProvider>
				<App />
			</CookiesProvider>
		</AppContextProvider>
	</BrowserRouter>
);
