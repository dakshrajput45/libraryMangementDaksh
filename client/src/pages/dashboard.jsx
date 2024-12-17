import { useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";

const Dashboard = () => {
  const { items, getHomeData, navigate, loading } = useContext(AppContext);

  useEffect(() => {
    getHomeData();
  }, []);

  return (
    <div>
      <nav className="bg-gray-800 text-white px-6 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-bold cursor-pointer" onClick={() => navigate("/dashboard")}>Home</h1>
          <div className="flex space-x-4">
            <a href="/maintenance" className="hover:text-gray-300">Maintenance</a>
            <a href="/reports" className="hover:text-gray-300">Reports</a>
            <a href="/transactions" className="hover:text-gray-300">Transactions</a>
          </div>
          <a href="#logout" className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition duration-300">Log Out</a>
        </div>
      </nav>

      <h3 className="m-10 flex justify-center uppercase">Item Details</h3>

      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Item Type</th>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Author</th>
                <th className="py-3 px-6 text-left">Category</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Cost</th>
                <th className="py-3 px-6 text-left">Procurement Date</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {items.map((item, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left whitespace-nowrap">{item.itemType}</td>
                  <td className="py-3 px-6 text-left">{item.name}</td>
                  <td className="py-3 px-6 text-left">{item.author}</td>
                  <td className="py-3 px-6 text-left">{item.category}</td>
                  <td className="py-3 px-6 text-left">{item.status}</td>
                  <td className="py-3 px-6 text-left">{item.cost}</td>
                  <td className="py-3 px-6 text-left">{item.procurementDate}</td>
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
