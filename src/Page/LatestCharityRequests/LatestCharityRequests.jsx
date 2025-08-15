import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';


const LatestCharityRequests = () => {
  const [requests, setRequests] = useState([]);
  

  useEffect(() => {
    axios
      .get('http://localhost:3000/charity-requests?limit=3')
      .then((res) => setRequests(res.data))
      .catch(() => toast.error('Failed to load charity requests'));
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-6 text-green-700">
        Latest Charity Requests
      </h2>

      {requests.length === 0 ? (
        <p className="text-center text-gray-600">No charity requests found.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {requests.map((req) => (
            <div
              key={req._id}
              className="bg-white shadow-md rounded-lg p-4 border hover:shadow-xl transition"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={req.charityImage || '../../../public/images (2).jpg'}
                  alt={req.charityName}
                  className="w-14 h-14 rounded-full object-cover border"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {req.charityName}
                  </h3>
                  <p className="text-sm text-gray-500">{req.donationTitle}</p>
                </div>
              </div>
              <p className="text-gray-700">{req.
requestDescription}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LatestCharityRequests;
