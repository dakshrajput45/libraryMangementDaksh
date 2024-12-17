

const IssueRequests = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Issue Requests</h2>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead>
          <tr>
            <th className="py-2 px-4 text-left border-b">Membership Id</th>
            <th className="py-2 px-4 text-left border-b">Name of Book/Movie</th>
            <th className="py-2 px-4 text-left border-b">Requested Date</th>
            <th className="py-2 px-4 text-left border-b">Request Fulfilled Date</th>
          </tr>
        </thead>
        <tbody>
          {/* Add request data dynamically here */}
          <tr>
            <td className="py-2 px-4 border-b">001</td>
            <td className="py-2 px-4 border-b">The Great Gatsby</td>
            <td className="py-2 px-4 border-b">2024-12-10</td>
            <td className="py-2 px-4 border-b">2024-12-12</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default IssueRequests;
