import React, { useState } from "react";
import MasterListItems from "../components/MasterListItems";
import IssueRequests from "../components/IssueRequests";
import MasterListOfMemberships from "../components/MasterListOfMemberships";
import ActiveIssues from "../components/ActiveIssues";
import OverdueIssues from "../components/overdue";

const ReportsBar = () => {
	const [selectedReport, setSelectedReport] = useState("masterListBooks");

	const handleSelection = (report) => {
		setSelectedReport(report); // Set the selected report to display content
	};

	return (
		<div>
			<div className="min-h-screen bg-gray-100 flex">
				{/* Sidebar */}
				<aside className="w-64 bg-white shadow-md">
					<div className="p-4 border-b border-gray-300">
						<h1 className="text-lg font-bold text-gray-800">Reports</h1>
					</div>
					<nav>
						<ul>
							<li className="border-b border-gray-200">
								<button
									onClick={() => handleSelection("masterListBooks")}
									className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
								>
									Master List of Books
								</button>
							</li>
							<li className="border-b border-gray-200">
								<button
									onClick={() => handleSelection("masterListMovies")}
									className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
								>
									Master List of Movies
								</button>
							</li>
							<li className="border-b border-gray-200">
								<button
									onClick={() => handleSelection("masterListMemberships")}
									className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
								>
									Master List of Memberships
								</button>
							</li>
							<li className="border-b border-gray-200">
								<button
									onClick={() => handleSelection("activeIssues")}
									className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
								>
									Active Issues
								</button>
							</li>
							<li className="border-b border-gray-200">
								<button
									onClick={() => handleSelection("overdueReturns")}
									className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
								>
									Overdue Returns
								</button>
							</li>
							<li>
								<button
									onClick={() => handleSelection("issueRequests")}
									className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
								>
									Issue Requests
								</button>
							</li>
						</ul>
					</nav>
				</aside>

				{/* Main Content */}
				<div className="flex-1 flex justify-center h-[80%] p-8">
					<div className="w-full bg-white rounded-lg ">
						{selectedReport === "masterListBooks" && (
							<MasterListItems itemType={"Book"} />
						)}
						{selectedReport === "masterListMovies" && (
							<MasterListItems itemType={"Movie"} />
						)}
						{selectedReport === "masterListMemberships" && (
							<MasterListOfMemberships />
						)}
						{selectedReport === "activeIssues" && <ActiveIssues />}
						{selectedReport === "overdueReturns" && <OverdueIssues />}
						{selectedReport === "issueRequests" && <IssueRequests />}

						{!selectedReport && (
							<h2 className="text-2xl font-bold text-gray-700 text-center">
								Select a report from the sidebar
							</h2>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ReportsBar;
