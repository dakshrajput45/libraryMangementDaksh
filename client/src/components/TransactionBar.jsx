import React, { useState } from "react";

const TransactionBar = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4 border-b border-gray-300">
          <h1 className="text-lg font-bold text-gray-800">Transactions</h1>
        </div>
        <nav>
          <ul>
            {/* Is Book Available */}
            <li className="border-b border-gray-200">
              <button
                onClick={() => setSelectedOption("isAvailable")}
                className="w-full text-left px-4 py-2 text-blue-600 hover:bg-gray-100"
              >
                Is book available?
              </button>
            </li>
            {/* Issue Book */}
            <li className="border-b border-gray-200">
              <button
                onClick={() => setSelectedOption("issueBook")}
                className="w-full text-left px-4 py-2 text-blue-600 hover:bg-gray-100"
              >
                Issue book?
              </button>
            </li>
            {/* Return Book */}
            <li className="border-b border-gray-200">
              <button
                onClick={() => setSelectedOption("returnBook")}
                className="w-full text-left px-4 py-2 text-blue-600 hover:bg-gray-100"
              >
                Return book?
              </button>
            </li>
            {/* Pay Fine */}
            <li>
              <button
                onClick={() => setSelectedOption("payFine")}
                className="w-full text-left px-4 py-2 text-blue-600 hover:bg-gray-100"
              >
                Pay Fine?
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Conditional Content */}
        {selectedOption === "isAvailable" && (
          <div>
            <h2 className="text-2xl font-bold text-gray-700 mb-4">
              Book Availability
            </h2>
           
          </div>
        )}

        {selectedOption === "issueBook" && (
          <div>
            <h2 className="text-2xl font-bold text-gray-700 mb-4">
              Issue Book
            </h2>
            <p className="text-gray-600">
              Select a book from the available list to issue it.
            </p>
          </div>
        )}

        {selectedOption === "returnBook" && (
          <div>
            <h2 className="text-2xl font-bold text-gray-700 mb-4">
              Return Book
            </h2>
            <p className="text-gray-600">
              Enter the book details to return the issued book.
            </p>
          </div>
        )}

        {selectedOption === "payFine" && (
          <div>
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Pay Fine</h2>
            <p className="text-gray-600">
              Check for overdue books and pay the fine amount.
            </p>
          </div>
        )}

        {!selectedOption && (
          <div>
            <h2 className="text-2xl font-bold text-gray-700 mb-4">
              Select a transaction from the sidebar
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionBar;
