import React, { useState } from "react";
import ItemIssueForm from "../components/issueItem";
import ItemReturnForm from "../components/returnItem";
import BookAvailability from "../components/bookAvailable";

const TransactionBar = () => {
  const [selectedOption, setSelectedOption] = useState("isAvailable");

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
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Conditional Content */}
        {selectedOption === "isAvailable" && (
          <div>
            <h2 className="text-2xl font-bold text-gray-700 mb-4">
              <BookAvailability/>
            </h2>
           
          </div>
        )}

        {selectedOption === "issueBook" && (
          <div>
            <h2 className="text-2xl font-bold text-gray-700 mb-4">
              <ItemIssueForm/>
            </h2>
          </div>
        )}

        {selectedOption === "returnBook" && (
          <div>
            <h2 className="text-2xl font-bold text-gray-700 mb-4">
              <ItemReturnForm/>
            </h2>
            
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
