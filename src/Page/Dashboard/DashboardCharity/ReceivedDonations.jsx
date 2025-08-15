import {  useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../Context/AuthContext';

const ReceivedDonations = () => {
  const {user}=useContext(AuthContext)
  const [donations, setDonations] = useState([]);
  const [selected, setSelected] = useState(null);
  const [review, setReview] = useState('');

  useEffect(() => {
    if (user.email) {
      axios
        .get(`http://localhost:3000/donation-requests`)
        .then(res => setDonations(res.data))
        .catch(() => toast.error('Failed to load received donations'));
    }
  }, [user.email]);
 const result = donations.filter((item)=>item.status == 'Accepted')
 console.log(result)
  const handleSubmitReview = async () => {
    if (!review.trim()) return toast.error('Review cannot be empty');

    try {
      await axios.post('http://localhost:3000/reviews', {
       email:user.email,
        donationTitle: selected.donationTitle,
        restaurantName: selected.restaurantName,
        description: review,
      });

      toast.success('Review submitted');
      setReview('');
      setSelected(null);
    } catch {
      toast.error('Failed to submit review');
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold mb-4">Received Donations</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {result.map(d => (
          <div key={d._id} className="border p-4 rounded-lg shadow-md bg-white space-y-2">
            <h3 className="text-lg font-semibold">{d.donationTitle}</h3>
            <p><strong>Restaurant:</strong> {d.restaurantName}</p>
            <p><strong>Food Type:</strong> {d.foodType}</p>
            <p><strong>Quantity:</strong> {d.quantity}</p>
            <p><strong>Status:</strong> <span className="text-green-600 font-medium">{d.status}</span></p>
            <p><strong>Pickup Time:</strong> {d.pickupTime}</p>
            <button
              onClick={() => setSelected(d)}
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
            >
              Review
            </button>
          </div>
        ))}
      </div>

      {/* Review Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded p-6 w-full max-w-md space-y-4">
            <h3 className="text-xl font-bold">Leave a Review</h3>
            <p className="text-sm text-gray-600">
              Donation: <strong>{selected.donationTitle}</strong> from <strong>{selected.restaurantName}</strong>
            </p>
            <textarea
              rows={4}
              className="w-full border px-3 py-2 rounded"
              placeholder="Write your review..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSelected(null)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitReview}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReceivedDonations;
