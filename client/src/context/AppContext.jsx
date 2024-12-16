import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CookiesProvider, useCookies } from "react-cookie";
import axios from "axios";

export const AppContext = createContext();

function AppContextProvider({ children }) {
	const [loading, setLoading] = useState(false);
	// const [user, setUser] = useState({});
	const [isAdmin, setIsAdmin] = useState(false);
	const navigate = useNavigate();
	const BASE_URL = "http://localhost:5500/api/v1";
	const [cookies, setCookie, removeCookie] = useCookies();

	async function handleLogin(data) {
		setLoading(true);

		try {
			const response = await axios.post(`${BASE_URL}/login`, data);
			console.log("Login successful:", response.data);

			setUser(response.data.exisitingUser);
			setCookie("token", response.data.token, { path: "/" });

			if (response.data.exisitingUser.role === "admin") {
				setIsAdmin(true);
				alert("Login Success");

				// navigate("/adminHomePage");
			} else if (response.data.exisitingUser.role === "user") {
				// navigate("/userHomePage");
			}

			// navigate("/dashboard");
		} catch (err) {
			console.log("Login error:", err.response?.data || err.message);
			alert(err.response?.data.message);
		} finally {
			setLoading(false);
		}
	}

	// async function handleRegister(data) {
	// 	setLoading(true);
	// 	try {
	// 		data.role = "User";
	// 		const response = await axios.post(`${BASE_URL}/register`, data);
	// 		console.log("Register:", response);

	// 		navigate("/login");
	// 	} catch (err) {
	// 		console.error("Register error:", err.response?.data || err.message);
	// 	} finally {
	// 		setLoading(false);
	// 	}
	// }

	// function handleLogout() {
	// 	setLoading(true);
	// 	try {
	// 		setUser({});
	// 		removeCookie("token");
	// 		removeCookie("user");
	// 		setIsAdmin(false);
	// 		navigate("/login");

	// 		console.log("User logged out successfully");
	// 	} catch (err) {
	// 		console.error("Logout error:", err);
	// 	} finally {
	// 		setLoading(false);
	// 	}
	// }

	// async function getAllCars() {
	// 	setLoading(true);
	// 	try {
	// 		const res = await axios.get(`${BASE_URL}/getallcars`);
	// 		setCars(res.data);
	// 		// console.log(res);
	// 	} catch (err) {
	// 		console.error("Error getting cars data", err);
	// 	} finally {
	// 		setLoading(false);
	// 	}
	// }

	// async function addCar(carData) {
	// 	try {
	// 		carData.capacity = Number(carData.capacity);
	// 		carData.rentPerHour = Number(carData.rentPerHour);
	// 		const response = await axios.post(`${BASE_URL}/addCar`, carData);
	// 		console.log(response);

	// 		if (response.statusText === "OK") {
	// 			return response;
	// 		} else {
	// 			console.error("Failed to add car.");
	// 		}
	// 	} catch (error) {
	// 		console.error("Error:", error);
	// 	}
	// }
	// async function editCar(carData) {
	// 	console.log(carData);

	// 	try {
	// 		carData.capacity = Number(carData.capacity);
	// 		carData.rentPerHour = Number(carData.rentPerHour);
	// 		const response = await axios.post(`${BASE_URL}/editcar`, carData);

	// 		if (response.status === 200) {
	// 			return response;
	// 		} else {
	// 			console.error("Failed to edir car.");
	// 		}
	// 	} catch (error) {
	// 		console.error("Error:", error);
	// 	}
	// }
	// async function makeBooking(bookingData) {
	// 	console.log(bookingData);
	// 	setLoading(true);
	// 	try {
	// 		const res = await axios.post(`${BASE_URL}/bookCar`, bookingData);
	// 		setCars(res.data);
	// 		console.log(res);
	// 	} catch (err) {
	// 		console.error("Error getting cars data", err);
	// 	} finally {
	// 		setLoading(false);
	// 	}
	// }
	// async function getAllBookings() {
	// 	setLoading(true);
	// 	try {
	// 		const res = await axios.get(`${BASE_URL}/getAllBookings`);
	// 		setBookings(res.data);
	// 	} catch (err) {
	// 		console.error("Error getting booking data", err);
	// 	} finally {
	// 		setLoading(false);
	// 	}
	// }

	// const value = {
	// 	loading,
	// 	setLoading,
	// 	user,
	// 	setUser,
	// 	isAdmin,
	// 	setIsAdmin,
	// 	navigate,
	// 	handleLogin,
	// 	handleRegister,
	// 	handleLogout,
	// 	cars,
	// 	setCars,
	// 	getAllCars,
	// 	cookies,
	// 	setCookie,
	// 	removeCookie,
	// 	addCar,
	// 	makeBooking,
	// 	getAllBookings,
	// 	bookings,
	// 	setBookings,
	// 	editCar,
	// };
	const value = { loading, setLoading, isAdmin, setIsAdmin, navigate, cookies };
	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
export default AppContextProvider;
