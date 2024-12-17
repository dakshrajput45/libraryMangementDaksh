import "react";

const MasterListOfMemberships = () => {
  const memberships = [
    {
      id: "001",
      name: "John Doe",
      contactNumber: "1234567890",
      status: "Active",
    },
    {
      id: "002",
      name: "Jane Smith",
      contactNumber: "9876543210",
      status: "Inactive",
    },
    {
      id: "003",
      name: "Alice Johnson",
      contactNumber: "4567891230",
      status: "Active",
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">
        Master List of Memberships
      </h2>

      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead>
          <tr>
            <th className="py-2 px-4 text-left border-b">Membership Id</th>
            <th className="py-2 px-4 text-left border-b">Name</th>
            <th className="py-2 px-4 text-left border-b">Contact Number</th>
            <th className="py-2 px-4 text-left border-b">Status</th>
            <th className="py-2 px-4 text-left border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {memberships.map((membership) => (
            <tr key={membership.id}>
              <td className="py-2 px-4 border-b">{membership.id}</td>
              <td className="py-2 px-4 border-b">{membership.name}</td>
              <td className="py-2 px-4 border-b">{membership.contactNumber}</td>
              <td className="py-2 px-4 border-b">{membership.status}</td>
              <td className="py-2 px-4 border-b">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-blue-600">
                  Edit
                </button>
                <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Member Button */}
      <div className="mt-6 text-center">
        <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">
          Add Member
        </button>
      </div>
    </div>
  );
};

export default MasterListOfMemberships;
