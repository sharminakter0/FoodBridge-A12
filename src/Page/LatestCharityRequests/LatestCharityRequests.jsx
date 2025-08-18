import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react'; 

const LatestCharityRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios
      .get('https://food-donation-server-mu.vercel.app/charity-requests?limit=3')
      .then((res) => setRequests(res.data))
      .catch(() => toast.error('Failed to load charity requests'));
  }, []);

  return (
    <div className="  py-10">
      <h2 className="text-3xl font-bold text-center mb-4  bg-gradient-to-r from-green-500  to-blue-400 bg-clip-text text-transparent">
        Latest Charity Requests
      </h2>
      <p className='text-center text-sm mb-7'>See the most recent requests from local charities. <br /> Your support can help them continue their mission of feeding communities in need.</p>

      {requests.length === 0 ? (
        <p className="text-center text-gray-600">No charity requests found.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {requests.map((req, i) => (
            <motion.div
              key={req._id}
              className="bg-base-100 shadow-md rounded-lg p-4 border hover:shadow-xl transition"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: i * 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={req.charityImage || '/images (2).jpg'}
                  alt={req.charityName}
                  className="w-14 h-14 rounded-full object-cover border"
                />
                <div>
                  <h3 className="text-lg font-semibold ">
                    {req.charityName}
                  </h3>
                  <p className="text-sm ">{req.donationTitle}</p>
                </div>
              </div>

              {/* Review / Description with opening quote */}
              <div className="relative ">
                <Quote className="w-5 h-5 text-green-400 absolute -top-1  opacity-70" />
                <p className="pl-6">{req.requestDescription}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LatestCharityRequests;
