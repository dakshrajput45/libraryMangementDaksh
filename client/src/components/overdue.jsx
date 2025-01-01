import Spinner from '../assets/Spinner';
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";

const OverdueIssues = () => {
    const { overdue, getOverDue, loading, payFine } = useContext(AppContext);
    const [refresh, setRefresh] = useState(false); // State to trigger refresh

    // Fetch overdue data on mount or when refresh is triggered
    useEffect(() => {
        getOverDue();
    }, [refresh]); // Re-run when `refresh` changes

    const handlePayFine = async (issueId) => {
        console.log(issueId);
        await payFine({ issueId }); // Ensure the fine is paid
        setRefresh(!refresh); // Trigger refresh after payment
    };

    // Determine if "Pay Fine" column should be shown
    const showPayFineColumn = overdue.some(item => !item.finePaid);

    return (
        <div className="max-w-7xl p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-3xl font-semibold text-center mb-6">Overdue Issues</h1>

            {loading ? (
                <div className="flex justify-center">
                    <Spinner />
                </div>
            ) : (
                <table className="min-w-full bg-white border">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">Issue Id</th>
                            <th className="py-3 px-6 text-left">Name</th>
                            <th className="py-3 px-6 text-left">Item id</th>
                            <th className="py-3 px-6 text-left">Date OF Issue</th>
                            <th className="py-3 px-6 text-left">Date OF Return</th>
                            <th className="py-3 px-6 text-left">Fine</th>
                            <th className="py-3 px-6 text-left">Fine Paid</th>
                            {showPayFineColumn && <th className="py-3 px-6 text-left">Pay Fine</th>}
                        </tr>
                    </thead>

                    <tbody className="text-gray-600 text-sm font-light">
                        {overdue.map((item, index) => (
                            <tr
                                key={index}
                                className="border-b border-gray-200 hover:bg-gray-100"
                            >
                                <td className="py-3 px-6 text-left whitespace-nowrap">
                                    {item.id}
                                </td>
                                <td className="py-3 px-6 text-left">{item.name}</td>
                                <td className="py-3 px-6 text-left">{item.itemId}</td>
                                <td className="py-3 px-6 text-left">{item.dateOfIssue}</td>
                                <td className="py-3 px-6 text-left">{item.dateOfReturn}</td>
                                <td className="py-3 px-6 text-left">{item.fine}</td>
                                <td className="py-3 px-6 text-left">
                                    {item.finePaid ? "Yes" : "No"}
                                </td>
                                {showPayFineColumn && (
                                    <td className="py-3 px-6 text-left">
                                        {!item.finePaid && (
                                            <button
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                                onClick={() => handlePayFine(item.id)}
                                            >
                                                Pay Fine
                                            </button>
                                        )}
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default OverdueIssues;
