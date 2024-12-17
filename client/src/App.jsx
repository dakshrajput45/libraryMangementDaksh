import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/Login.jsx";
import AddMembership from "./components/AddMembership.jsx";
import UpdateMembership from "./components/UpdateMembership.jsx";
import AddItem from "./components/Additem.jsx";
import UpdateItem from "./components/Updateitem.jsx";
import UserManagement from "./components/UserManagement.jsx";
import MasterListOfMemberships from "./components/MasterListOfMemberships.jsx";
import IssueRequests from "./components/IssueRequests.jsx";
import MasterListMovies from "./components/MasterListMovies.jsx";
import Dashboard from "./pages/dashboard.jsx";
import MaintenanceBar from "./components/MaintenanceBar.jsx";
import TopNavBar from "./components/TopNavBar.jsx";
function App() {
	const location = useLocation();
	return (
		<div>
			{location.pathname !== "/" && <TopNavBar />}
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/maintenance" element={<MaintenanceBar />} />
				<Route path="/issuerequests" element={<IssueRequests />} />
				<Route
					path="/masterlistOfmemberships"
					element={<MasterListOfMemberships />}
				/>
				<Route path="/masterlistmovies" element={<MasterListMovies />} />
				<Route path="/usermanagement" element={<UserManagement />} />
				<Route path="/addmembership" element={<AddMembership />} />
				<Route path="/updatemembership" element={<UpdateMembership />} />
				<Route path="/additem" element={<AddItem />} />
				<Route path="/updateitem" element={<UpdateItem />} />
			</Routes>
		</div>
	);
}

export default App;
