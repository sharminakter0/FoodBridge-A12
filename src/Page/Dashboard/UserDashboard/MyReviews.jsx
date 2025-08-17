import {  useEffect, useState } from 'react';

import axios from 'axios';
import toast from 'react-hot-toast';
import moment from 'moment'; // For formatting time
import useAuth from '../../../Hooks/UseAuth';
// import useAuth from '../../../Hooks/UseAuth';


const MyReviews = () => {
  const { user } = useAuth()
  const [reviews, setReviews] = useState([]);

  // useEffect(() => {
  //   if (user?.email) {
  //     axios.get(`https://food-donation-server-mu.vercel.app/reviews/${user.email}`)
  //       .then(res => setReviews(res.data))
  //       .catch(() => toast.error('Failed to load reviews'));
  //   }
  // }, [user?.email]);

  useEffect(() => {
  const fetchReviews = async () => {
    if (!user?.email) return;

    try {
      const res = await axios.get(`https://food-donation-server-mu.vercel.app/reviews/${user.email}`);
      const baseReviews = res.data;

      // Fetch restaurant names from donation IDs
      const enrichedReviews = await Promise.all(
        baseReviews.map(async review => {
          const donationRes = await axios.get(`https://food-donation-server-mu.vercel.app/donations/${review.donationId}`);
          return {
            ...review,
            restaurantName: donationRes.data.restaurantName || 'Unknown'
          };
        })
      );

      setReviews(enrichedReviews);
    } catch {
      toast.error('Failed to load reviews');
    }
  };

  fetchReviews();
}, [user?.email]);


  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://food-donation-server-mu.vercel.app/reviews/${id}`);
      setReviews(reviews.filter(review => review._id !== id));
      toast.success('Review deleted');
    } catch {
      toast.error('Failed to delete');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews submitted.</p>
      ) : (
        <div className="space-y-4">
          {reviews.map(review => (
            <div key={review._id} className="border p-4 rounded shadow">
              <h3 className="text-lg font-semibold">{review.donationTitle}</h3>
              <p><strong>Restaurant:</strong> {review.restaurantName}</p>
              <p><strong>Time:</strong> {moment(review.time).format('LLL')}</p>
              <p><strong>Review:</strong> {review.description}</p>
              <button
                onClick={() => handleDelete(review._id)}
                className="btn btn-error btn-sm mt-2"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReviews;
