import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CookiesProvider, useCookies } from "react-cookie";
import axios from "axios";

export const AppContext = createContext();

function AppContextProvider({ children }) {
	const [loading, setLoading] = useState(false);
	// const [user, setUser] = useState({});
	const [isAdmin, setIsAdmin] = useState(false);
	const [items, setItems] = useState([]);
	const [masterMemberships, setMasterMemberships] = useState([]);
	const [issueRequests, setIssueRequests] = useState([]);
	const [activeIssues, setActiveIssues] = useState([]);
	const [overdue, setOverDue] = useState([]);
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
				setCookie("adm", true, { path: "/" });

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

	async function handleLogout() {
		removeCookie("token");
		removeCookie("adm");
		navigate("/");
	}

	//Reports
	const getHomeData = async () => {
		setLoading(true);
		try {
			const response = await axios.get(`${BASE_URL}/getAllItemByType`);
			if (response.data.success) {
				const fetchedItems = response.data.data.map((item) => ({
					itemId: item.bid,
					itemType: item.itemType,
					name: item.name,
					author: item.authorName || "N/A",
					category: item.category,
					status: item.availability ? "Available" : "Issued",
					cost: `$${item.cost.toFixed(2)}`,
					procurementDate: new Date(item.dateOfProcurement)
						.toISOString()
						.split("T")[0],
					quantity:item.quantity,
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

	const getMemberships = async () => {
		setLoading(true);
		try {
			const res = await axios.get(`${BASE_URL}/getAllMembership`);
			if (res.data.success) {
				const memberships = res.data.data.map((item) => ({
					id: item.membershipId,
					name: `${item.firstName}\u00A0${item.lastName}`,
					contactNumber: item.contactNo,
					address: item.contactAddress,
					startDate: new Date(item.startDate).toISOString().split("T")[0],
					endDate: new Date(item.endDate).toISOString().split("T")[0],
					amountPending: item.amountPending,
					status: item.status,
				}));
				setMasterMemberships(memberships);
			}
		} catch (err) {
			console.error(
				"Error in fetching Membership:",
				err.response?.data || err.message
			);
			alert(err.response?.data.message || "Error fetching items");
		} finally {
			setLoading(false);
		}
	};

	const getIssueReuest = async () => {
		setLoading(true);
		try {
			const res = await axios.get(`${BASE_URL}/requestIssue`);
			if (res.data.success) {
				const requests = res.data.data.map((item) => ({
					id: item.issueId,
					name: item.nameOfItem,
					requestedDate: new Date(item.requestedDate)
						.toISOString()
						.split("T")[0],
					requestFullfiled: item.requestFulfilled,
				}));
				setIssueRequests(requests);
			}
		} catch (err) {
			console.error(
				"Error in fetching Issue Request:",
				err.response?.data || err.message
			);
			alert(err.response?.data.message || "Error fetching items");
		} finally {
			setLoading(false);
		}
	};

	const getActiveIssue = async () => {
		setLoading(true);
		try {
			const res = await axios.get(`${BASE_URL}/activeIssue`);
			if (res.data.success) {
				const active = res.data.data.map((item) => ({
					id: item.issueId,
					name: item.nameOfItem,
					itemId: item.bookId,
					dateOfIssue: new Date(item.dateOfIssue).toISOString().split("T")[0],
					dateOfReturn: new Date(item.dateOfReturn).toISOString().split("T")[0],
				}));
				setActiveIssues(active);
			}
		} catch (err) {
			console.error(
				"Error in fetching Active Issue:",
				err.response?.data || err.message
			);
			alert(err.response?.data.message || "Error fetching items");
		} finally {
			setLoading(false);
		}
	};

	const getOverDue = async () => {
		setLoading(true);
		try {
			const res = await axios.get(`${BASE_URL}/overdueIssue`);
			if (res.data.success) {
				const overdue = res.data.data.map((item) => ({
					id: item.issueId,
					name: item.nameOfItem,
					itemId: item.bookId,
					dateOfIssue: new Date(item.dateOfIssue).toISOString().split("T")[0],
					dateOfReturn: new Date(item.dateOfReturn).toISOString().split("T")[0],
					fine: item.fineAmount,
					finePaid: item.finePaid,
				}));
				setOverDue(overdue);
			}
		} catch (err) {
			console.error(
				"Error in fetching Active Issue:",
				err.response?.data || err.message
			);
			alert(err.response?.data.message || "Error fetching items");
		} finally {
			setLoading(false);
		}
	};

	//Maintaince
	const addUser = async (data) => {
		// console.log(data);
		setLoading(true);
		try {
			data.token = cookies.token;
			const response = await axios.post(`${BASE_URL}/addUser`, data);
			if (response.data.success === "success") {
				alert(`User succesfully added: ${response.data.user.uid}`);
			}
		} catch (err) {
			console.error(err);
			alert(err);
		} finally {
			setLoading(false);
		}
	};

	const updateUser = async (data) => {
		// console.log(data);

		setLoading(true);
		try {
			data.token = cookies.token;
			const response = await axios.put(`${BASE_URL}/updateUser`, data);
			if (response.data.success === "success") {
				alert(`User updated succesfully: ${response.data.user.uid}`);
			}
		} catch (err) {
			console.error(err);
			alert(err);
		} finally {
			setLoading(false);
		}
	};

	const addMembership = async (data) => {
		// console.log(data);
		setLoading(true);
		try {
			data.token = cookies.token;
			const response = await axios.post(`${BASE_URL}/addMembership`, data);
			if (response.data.success === "success") {
				alert(
					`Membership succesfully added: ${response.data.data.membershipId}`
				);
			}
		} catch (err) {
			console.error(err);
			alert(err);
		} finally {
			setLoading(false);
		}
	};

	const updateMembership = async (data) => {
		setLoading(true);
		try {
			data.token = cookies.token;
			const response = await axios.put(`${BASE_URL}/updateMembership`, data);
			if (response.data.success === "success") {
				alert(
					`Membership updated succesfully: ${response.data.data.membershipId}`
				);
			}
		} catch (err) {
			console.error(err);
			alert(err);
		} finally {
			setLoading(false);
		}
	};

	const addItem = async (data) => {
		// console.log(data);
		setLoading(true);
		try {
			data.token = cookies.token;
			const response = await axios.post(`${BASE_URL}/addItem`, data);
			if (response.data.success === "success") {
				alert(`Item succesfully added: ${response.data.data.bid}`);
			}
		} catch (err) {
			console.error(err);
			alert(err);
		} finally {
			setLoading(false);
		}
	};

	const updateItem = async (data) => {
		setLoading(true);
		try {
			data.token = cookies.token;
			const response = await axios.put(`${BASE_URL}/updateItem`, data);
			if (response.data.success === "success") {
				alert(`Item updated succesfully: ${response.data.data.bid}`);
			}
		} catch (err) {
			console.error(err);
			alert(err);
		} finally {
			setLoading(false);
		}
	};

	//transactions
	const issueItem = async (data) => {
		// console.log(data);
		setLoading(true);
		try {
			data.token = cookies.token;
			const response = await axios.post(`${BASE_URL}/issueItem`, data);
			if (response.data.success === "success") {
				alert(
					`Item issued succesfully: ${response.data.data.issueId}`
				);
			}
		} catch (err) {
			console.error(err);
			alert(err);
		} finally {
			setLoading(false);
		}
	};

	const returnItem = async (data) => {
		// console.log(data);
		setLoading(true);
		try {
			data.token = cookies.token;
			const response = await axios.post(`${BASE_URL}/returnItem`, data);
			if (response.data.success === "success") {
				alert(
					`Item returned succesfully: ${response.data.data.issueId}`
				);
			}
		} catch (err) {
			console.error(err);
			alert(err);
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
		items,
		setItems,
		handleLogin,
		getHomeData,
		handleLogout,
		//
		masterMemberships,
		setMasterMemberships,
		getMemberships,
		activeIssues,
		setActiveIssues,
		getActiveIssue,
		overdue,
		setOverDue,
		getOverDue,
		issueRequests,
		setIssueRequests,
		getIssueReuest,
		//
		addUser,
		updateUser,
		addMembership,
		updateMembership,
		addItem,
		updateItem,
		issueItem,returnItem
	};

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
export default AppContextProvider;
