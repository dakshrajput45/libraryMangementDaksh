import React, { useState } from "react";
import UserManagement from "./UserManagement.jsx";
import AddMembership from "./AddMembership.jsx";
import UpdateMembership from "./UpdateMembership.jsx";
import AddItem from "./AddItem.jsx";
import UpdateItem from "./UpdateItem.jsx";

const MaintenanceBar = () => {
	const [dropdowns, setDropdowns] = useState({
		membership: false,
		booksMovies: false,
		userManagement: false,
	});
	const [selectedSection, setSelectedSection] = useState(null); // State to track the selected section

	const toggleDropdown = (section) => {
		setDropdowns({
			membership: false,
			booksMovies: false,
			userManagement: false,
		});
		setDropdowns((prev) => ({
			...prev,
			[section]: !prev[section],
		}));
	};

	const handleSelection = (section) => {
		setSelectedSection(section); // Set the selected section
	};

	return (
		<div>
			<div className="min-h-screen bg-gray-100 flex">
				{/* Sidebar */}
				<aside className="w-64 bg-white shadow-md">
					<div className="p-4 border-b border-gray-300">
						<h1 className="text-lg font-bold text-gray-800">Maintenance</h1>
					</div>
					<nav>
						<ul>
							{/* Membership */}
							<li className="border-b border-gray-200">
								<button
									onClick={() => {
										toggleDropdown("membership");
									}}
									className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex justify-between items-center"
								>
									Membership
									<span>{dropdowns.membership ? "▲" : "▼"}</span>
								</button>
								<div
									className={`overflow-hidden transition-all duration-300 ease-in-out ${
										dropdowns.membership
											? "max-h-40 opacity-100"
											: "max-h-0 opacity-0"
									}`}
								>
									<div className="px-3">
										<button
											className="block w-full text-blue-600 py-1 text-left hover:underline p-1 rounded-md hover:bg-blue-100"
											onClick={() => handleSelection("addMembership")}
										>
											Add
										</button>
										<button
											className="block w-full text-blue-600 py-1 text-left hover:underline p-1 rounded-md hover:bg-blue-100"
											onClick={() => handleSelection("updateMembership")}
										>
											Update
										</button>
									</div>
								</div>
							</li>

							{/* Books/Movies */}
							<li className="border-b border-gray-200">
								<button
									onClick={() => {
										toggleDropdown("booksMovies");
									}}
									className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex justify-between items-center"
								>
									Books/Movies
									<span>{dropdowns.booksMovies ? "▲" : "▼"}</span>
								</button>
								<div
									className={`overflow-hidden transition-all duration-300 ease-in-out ${
										dropdowns.booksMovies
											? "max-h-40 opacity-100"
											: "max-h-0 opacity-0"
									}`}
								>
									<div className="px-3">
										<button
											className="block w-full text-blue-600 py-1 text-left hover:underline p-1 rounded-md hover:bg-blue-100"
											onClick={() => handleSelection("addItems")}
										>
											Add
										</button>
										<button
											className="block w-full text-blue-600 py-1 text-left hover:underline p-1 rounded-md hover:bg-blue-100"
											onClick={() => handleSelection("updateItems")}
										>
											Update
										</button>
									</div>
								</div>
							</li>

							{/* User Management */}
							<li>
								<button
									onClick={() => {
										toggleDropdown("userManagement");
									}}
									className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex justify-between items-center"
								>
									User Management
									<span>{dropdowns.userManagement ? "▲" : "▼"}</span>
								</button>
								<div
									className={`overflow-hidden transition-all duration-300 ease-in-out ${
										dropdowns.userManagement
											? "max-h-40 opacity-100"
											: "max-h-0 opacity-0"
									}`}
								>
									<div className="px-3">
										<button
											className="block w-full text-blue-600 py-1 text-left hover:underline p-1 rounded-md hover:bg-blue-100"
											onClick={() => handleSelection("addUser")}
										>
											Add
										</button>
										<button
											className="block w-full text-blue-600 py-1 text-left hover:underline p-1 rounded-md hover:bg-blue-100"
											onClick={() => handleSelection("updateUser")}
										>
											Update
										</button>
									</div>
								</div>
							</li>
						</ul>
					</nav>
				</aside>

				<div className="flex-1 flex justify-center h-[80%] p-8">
					<div className="w-full max-w-lg bg-white rounded-lg ">
						{selectedSection === "addMembership" && <AddMembership />}
						{selectedSection === "updateMembership" && <UpdateMembership />}
						{selectedSection === "addItems" && <AddItem />}
						{selectedSection === "updateItems" && <UpdateItem />}
						{selectedSection === "addUser" && <UserManagement update={false} />}
						{selectedSection === "updateUser" && (
							<UserManagement update={true} />
						)}

						{!selectedSection && (
							<h2 className="text-2xl font-bold text-gray-700 text-center">
								Select an option from the sidebar
							</h2>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default MaintenanceBar;
