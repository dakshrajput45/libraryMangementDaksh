import { useState, useContext } from 'react';
import { AppContext } from "../context/AppContext";
import Spinner from "../assets/Spinner";

const BookAvailability = () => {
    const { items, loading } = useContext(AppContext);
    const [searchQuery, setSearchQuery] = useState("");
    const [book, setBook] = useState(null);

    const handleSearch = () => {
        const result = items.find(
            (item) =>
                item.name.toLowerCase() === searchQuery.toLowerCase() ||
                item.itemId.toLowerCase() === searchQuery.toLowerCase() ||
                (item.author && item.author.toLowerCase() === searchQuery.toLowerCase())
        );
        if (result) {
            setBook(result);
        } else {
            setBook(null);
            alert("No book found");
        }
    };

    return (
        <div className="max-w-7xl p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-3xl font-semibold text-center mb-6">Book Availability</h1>

            <div className="mb-6 flex items-center justify-center">
                <input
                    type="text"
                    placeholder="Enter Book Name, ID, or Author"
                    className="text-sm font-normal border border-gray-300 rounded-lg p-2 w-1/2"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                    className="bg-blue-500 hover:bg-blue-300 text-white font-medium py-1 px-4 rounded ml-4"
                    onClick={handleSearch}
                >
                    Search
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center">
                    <Spinner />
                </div>
            ) : (
                <>
                    {book && (
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border">
                                <thead>
                                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                        <th className="py-3 px-6 text-left">Item Id</th>
                                        <th className="py-3 px-6 text-left">Name</th>
                                        <th className="py-3 px-6 text-left">Author</th>
                                        <th className="py-3 px-6 text-left">Category</th>
                                        <th className="py-3 px-6 text-left">Status</th>
                                        <th className="py-3 px-6 text-left">Cost</th>
                                        <th className="py-3 px-6 text-left">Procurement Date</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-600 text-sm font-light">
                                    <tr className="border-b border-gray-200 hover:bg-gray-100">
                                        <td className="py-3 px-6 text-left whitespace-nowrap">{book.itemId}</td>
                                        <td className="py-3 px-6 text-left">{book.name}</td>
                                        <td className="py-3 px-6 text-left">{book.author}</td>
                                        <td className="py-3 px-6 text-left">{book.category}</td>
                                        <td className="py-3 px-6 text-left">{book.status}</td>
                                        <td className="py-3 px-6 text-left">{book.cost}</td>
                                        <td className="py-3 px-6 text-left">{book.procurementDate}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default BookAvailability;
