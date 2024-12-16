import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "./context/AppContext";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login.jsx";
import AddMembership from "./pages/AddMembership.jsx";
import UpdateMembership from "./pages/UpdateMembership.jsx";
import AddItem from "./pages/Additem.jsx";
import UpdateItem from "./pages/Updateitem.jsx";
import UserManagement from "./pages/UserManagement.jsx";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Login />} />
			<Route path="/usermanagement" element={<UserManagement />} />
			<Route path="/addmembership" element={<AddMembership />} />
			<Route path="/updatemembership" element={<UpdateMembership />} />
			<Route path="/additem" element={<AddItem />} />
			<Route path="/updateitem" element={<UpdateItem />} />

			{/* <Route
				path="/edit-car/:id"
				element={<ProtectedRoute element={EditCarPage} />}
			/> */}
		</Routes>
	);
}

export default App;
