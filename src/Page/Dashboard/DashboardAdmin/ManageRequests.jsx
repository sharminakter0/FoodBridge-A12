import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrashAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';

const ManageRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios.get(`https://food-donation-server-mu.vercel.app/donation-requests`)
      .then(res => setRequests(res.data))
      .catch(() => toast.error('Failed to load donation requests'));
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://food-donation-server-mu.vercel.app/donation-requests/${id}`);
      toast.success('Request deleted successfully');
      setRequests(prev => prev.filter(req => req._id !== id));
    } catch (err) {
      toast.error(err.response?.data?.message || 'Delete failed');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Donation Requests</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-200">
          <thead className="">
            <tr>
              <th className="px-4 py-2 border">Donation Title</th>
              <th className="px-4 py-2 border">Charity Name</th>
              <th className="px-4 py-2 border">Charity Email</th>
              <th className="px-4 py-2 border">Description</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(request => (
              <tr key={request._id} className="text-center">
                <td className="px-4 py-2 border">{request.donationTitle}</td>
                <td className="px-4 py-2 border">{request.charityName}</td>
                <td className="px-4 py-2 border">{request.charityEmail}</td>
                <td className="px-4 py-2 border">{request.
requestDescription}</td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => handleDelete(request._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 flex items-center gap-1 mx-auto"
                  >
                    <FaTrashAlt /> Delete
                  </button>
                </td>
              </tr>
            ))}
            {requests.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4">No donation requests found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageRequests;
