import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const TopNavBar = () => {
	const { navigate, handleLogout, cookies } = useContext(AppContext);
	return (
		<nav className="bg-gray-800 text-white px-6 py-4">
			<div className="flex justify-between items-center">
				<button
					className="text-lg font-bold"
					onClick={() => navigate("/dashboard")}
				>
					Home
				</button>
				<div className="flex space-x-4">
					{cookies.adm && (
						<a href="/maintenance" className="hover:text-gray-300">
							Maintenance
						</a>
					)}

					<a href="/reports" className="hover:text-gray-300">
						Reports
					</a>
					<a href="/transactions" className="hover:text-gray-300">
						Transactions
					</a>
				</div>
				<button
					onClick={handleLogout}
					className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition duration-300"
				>
					Log Out
				</button>
			</div>
		</nav>
	);
};

export default TopNavBar;
