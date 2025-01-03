import { useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";

const Dashboard = () => {
	const { items, loading } = useContext(AppContext);
	

	return (
		<div>
			<h3 className="m-10 flex justify-center uppercase">Item Details</h3>

			{loading ? (
				<div className="flex justify-center items-center min-h-screen">
					<div className="loader"></div>
				</div>
			) : (
				<div className="overflow-x-auto">
					<table className="w-[95%] mx-auto bg-white border">
						<thead>
							<tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
								<th className="py-3 px-6 text-left text-white bg-black">Item ID</th>
								<th className="py-3 px-6 text-left bg-gray-50">Item Type</th>
								<th className="py-3 px-6 text-left text-white bg-black">Name</th>
								<th className="py-3 px-6 text-left">Author</th>
								<th className="py-3 px-6 text-left text-white bg-black">Category</th>
								<th className="py-3 px-6 text-left">Status</th>
								<th className="py-3 px-6 text-left text-white bg-black">Cost</th>
								<th className="py-3 px-6 text-left">Procurement Date</th>
								<th className="py-3 px-6 text-left text-white bg-black">Quantity</th>
							</tr>
						</thead>
						<tbody className="text-gray-600 text-sm font-light">
							{items.map((item, index) => (
								<tr
									key={index}
									className="border-b border-gray-200 hover:bg-gray-100"
								>
									<td className="py-3 px-6 text-left whitespace-nowrap text-white bg-black">
										{item.itemId}
									</td>
									<td className="py-3 px-6 text-left whitespace-nowrap">
										{item.itemType}
									</td>
									<td className="py-3 px-6 text-left text-white bg-black">{item.name}</td>
									<td className="py-3 px-6 text-left">{item.author}</td>
									<td className="py-3 px-6 text-left text-white bg-black">{item.category}</td>
									<td className="py-3 px-6 text-left">{item.status}</td>
									<td className="py-3 px-6 text-left text-white bg-black">{item.cost}</td>
									<td className="py-3 px-6 text-left">
										{item.procurementDate}
									</td>
									<td className="py-3 px-6 text-left text-white bg-black">{item.quantity}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
};

export default Dashboard;
