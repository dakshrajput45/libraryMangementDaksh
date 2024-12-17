import React, { useState } from "react";

const MaintenanceBar = () => {
	const [dropdowns, setDropdowns] = useState({
		membership: false,
		booksMovies: false,
		userManagement: false,
	});
	const [selectedSection, setSelectedSection] = useState(null); // State to track the selected section

	const toggleDropdown = (section) => {
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
							<li className="border-b border-gray-200 transition ease-in-out ">
								<button
									onClick={() => {
										toggleDropdown("membership");
									}}
									className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex justify-between items-center"
								>
									Membership
									<span>{dropdowns.membership ? "▲" : "▼"}</span>
								</button>
								{dropdowns.membership && (
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
								)}
							</li>

							{/* Books/Movies */}
							<li className="border-b border-gray-200">
								<button
									onClick={() => {
										toggleDropdown("booksMovies"); // Set "booksMovies" as selected
									}}
									className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex justify-between items-center"
								>
									Books/Movies
									<span>{dropdowns.booksMovies ? "▲" : "▼"}</span>
								</button>
								{dropdowns.booksMovies && (
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
								)}
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
								{dropdowns.userManagement && (
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
								)}
							</li>
						</ul>
					</nav>
				</aside>

				<div className="flex-1 flex items-center justify-center p-8">
					{selectedSection === "addMembership" && (
						<h2 className="text-2xl font-bold text-gray-700">
							Add Membership Section
						</h2>
					)}
					{selectedSection === "updateMembership" && (
						<h2 className="text-2xl font-bold text-gray-700">
							Update Membership Section
						</h2>
					)}
					{selectedSection === "addItems" && (
						<h2 className="text-2xl font-bold text-gray-700">
							Add Books/Movies Section
						</h2>
					)}
					{selectedSection === "updateItems" && (
						<h2 className="text-2xl font-bold text-gray-700">
							Update Books/Movies Section
						</h2>
					)}
					{selectedSection === "addUser" && (
						<h2 className="text-2xl font-bold text-gray-700">
							Add User Section
						</h2>
					)}
					{selectedSection === "updateUser" && (
						<h2 className="text-2xl font-bold text-gray-700">
							Update User Section
						</h2>
					)}

					{!selectedSection && (
						<h2 className="text-2xl font-bold text-gray-700">
							Select an option from the sidebar
						</h2>
					)}
				</div>
			</div>
		</div>
	);
};

export default MaintenanceBar;
