import { useState } from 'react';

const MasterListMovies = () => {
  const [movies] = useState([
    {
      serialNo: 1,
      name: 'Inception',
      author: 'Christopher Nolan',
      category: 'Science Fiction',
      status: 'Available',
      cost: '$12.99',
      procurementDate: '2020-05-12',
    },
    {
      serialNo: 2,
      name: 'The Godfather',
      author: 'Francis Ford Coppola',
      category: 'Drama',
      status: 'Issued',
      cost: '$15.00',
      procurementDate: '2019-08-25',
    },
  ]);

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold text-center mb-6">Master List of Movies</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Serial No</th>
              <th className="py-3 px-6 text-left">Name of Movie</th>
              <th className="py-3 px-6 text-left">Author Name</th>
              <th className="py-3 px-6 text-left">Category</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-left">Cost</th>
              <th className="py-3 px-6 text-left">Procurement Date</th>
            </tr>
          </thead>

          <tbody className="text-gray-600 text-sm font-light">
            {movies.map((movie, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">{movie.serialNo}</td>
                <td className="py-3 px-6 text-left">{movie.name}</td>
                <td className="py-3 px-6 text-left">{movie.author}</td>
                <td className="py-3 px-6 text-left">{movie.category}</td>
                <td className="py-3 px-6 text-left">{movie.status}</td>
                <td className="py-3 px-6 text-left">{movie.cost}</td>
                <td className="py-3 px-6 text-left">{movie.procurementDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <a href="/" className="text-blue-500 hover:underline">
          Home
        </a>
        <a href="/logout" className="text-blue-500 hover:underline">
          Log Out
        </a>
      </div>
    </div>
  );
};

export default MasterListMovies;
