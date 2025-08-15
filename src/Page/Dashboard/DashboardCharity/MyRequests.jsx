import { use, useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrashAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../Context/AuthContext';

const MyRequests = () => {
  const [requests, setRequests] = useState([]);
  const{ user} =use(AuthContext)

  useEffect(() => {
    if (user.email) {
      axios
        .get(`http://localhost:3000/donation-requests/charity/${user.email}`)
        .then(res => setRequests(res.data))
        .catch(() => toast.error('Failed to load requests'));
    }
  }, [user.email]);

  const handleCancel = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/donation-requests/${id}`);
      toast.success('Request cancelled successfully');
      setRequests(prev => prev.filter(req => req._id !== id));
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to cancel request');
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold mb-4">My Donation Requests</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {requests.map(request => (
          <div key={request._id} className="border p-4 rounded-lg shadow-md bg-white space-y-2">
            <h3 className="text-lg font-semibold">{request.donationTitle}</h3>
            <p><strong>Restaurant:</strong> {request.restaurantName}</p>
            <p><strong>Food Type:</strong> {request.foodType}</p>
            <p><strong>Quantity:</strong> {request.quantity}</p>
            <p><strong>Location:</strong>{request.location}</p>
            <p>
              <strong>Status:</strong>{' '}
              <span
                className={`font-medium ${
                  request.status === 'Pending' ? 'text-yellow-500' :
                  request.status === 'Accepted' ? 'text-green-600' :
                  'text-red-500'
                }`}
              >
                {request.status}
              </span>
            </p>

            {request.status === 'Pending' && (
              <button
                onClick={() => handleCancel(request._id)}
                className="flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
              >
                <FaTrashAlt /> Cancel
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyRequests;
