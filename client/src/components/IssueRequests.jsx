import Spinner from '../assets/Spinner';
import { useContext,useEffect } from "react";
import { AppContext } from "../context/AppContext";

const IssueRequests = () => {
  const { issueRequests,getIssueReuest, loading } = useContext(AppContext);

  useEffect(()=>{
    if(issueRequests.length == 0){
      getIssueReuest();
    }
  },[issueRequests,getIssueReuest]);

  return (
    <div className="max-w-7xl p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold text-center mb-6">Issue Request</h1>

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
              <th className="py-3 px-6 text-left">Requested Date</th>
              <th className="py-3 px-6 text-left">Request Fulfilled</th>
            </tr>
          </thead>

          <tbody className="text-gray-600 text-sm font-light">
            {issueRequests.map((item, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {item.id}
                </td>
                <td className="py-3 px-6 text-left">{item.name}</td>
                <td className="py-3 px-6 text-left">{item.requestedDate}</td>
                <td className="py-3 px-6 text-left">
                  {item.requestFulfilled ? "Yes" : "No"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default IssueRequests;
