import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CookiesProvider, useCookies } from "react-cookie";
import axios from "axios";

export const AppContext = createContext();

function AppContextProvider({ children }) {
	const [loading, setLoading] = useState(false);
	// const [user, setUser] = useState({});
	const [isAdmin, setIsAdmin] = useState(false);
	const [items, setItems] = useState([]);
	const navigate = useNavigate();
	const BASE_URL = "http://localhost:5500/api/v1";
	const [cookies, setCookie, removeCookie] = useCookies();

	async function handleLogin(data) {
		setLoading(true);

		try {
			const response = await axios.post(`${BASE_URL}/login`, data);
			console.log("Login successful:", response.data);
			setCookie("token", response.data.token, { path: "/" });

			if (response.data.exisitingUser.role === "admin") {
				setIsAdmin(true);
				alert("Login Success");

				// navigate("/adminHomePage");
			} else if (response.data.exisitingUser.role === "user") {
				// navigate("/userHomePage");
			}

			navigate("/dashboard");
		} catch (err) {
			console.log("Login error:", err.response?.data || err.message);
			alert(err.response?.data.message);
		} finally {
			setLoading(false);
		}
	}

	const getHomeData = async () => {
		setLoading(true);
		try {
			const response = await axios.get(`${BASE_URL}/getAllItemByType`);
			if (response.data.success) {
				const fetchedItems = response.data.data.map((item) => ({
					itemType: item.itemType,
					name: item.name,
					author: item.authorName || "N/A",
					category: item.category,
					status: item.availability ? "Available" : "Issued",
					cost: `$${item.cost.toFixed(2)}`,
					procurementDate: new Date(item.dateOfProcurement)
						.toISOString()
						.split("T")[0],
				}));
				setItems(fetchedItems);
			}
		} catch (err) {
			console.error("Home Page error:", err.response?.data || err.message);
			alert(err.response?.data.message || "Error fetching items");
		} finally {
			setLoading(false);
		}
	};


	const value = {
		loading,
		BASE_URL,
		setLoading,
		isAdmin,
		setIsAdmin,
		navigate,
		cookies,
		handleLogin,
		items,
		setItems,
		getHomeData,
	};
	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
export default AppContextProvider;
