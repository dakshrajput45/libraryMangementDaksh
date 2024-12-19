import Spinner from '../assets/Spinner';
import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";

const ActiveIssues = () => {
    const { activeIssues, getActiveIssue, loading } = useContext(AppContext);

    useEffect(() => {
        if (activeIssues.length == 0) {
            getActiveIssue();
        }
    }, [activeIssues, getActiveIssue]);

    return (
        <div className="max-w-7xl p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-3xl font-semibold text-center mb-6">Active Issues</h1>

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
                        </tr>
                    </thead>

                    <tbody className="text-gray-600 text-sm font-light">
                        {activeIssues.map((item, index) => (
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

                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ActiveIssues;
