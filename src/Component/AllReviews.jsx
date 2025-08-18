import { useEffect, useState } from 'react';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';

const AllReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Initialize AOS
    AOS.init({ duration: 1000, once: true });

    axios
      .get('https://food-donation-server-mu.vercel.app/reviews')
      .then((res) => {
        console.log('Reviews from API:', res.data);
        setReviews(res.data);
      })
      .catch((err) => {
        console.error('Reviews API failed', err);
        setError('Failed to load reviews');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-lg ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
      >
        ★
      </span>
    ));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const actualReviews = reviews.filter((review) => review.donationId);

  if (loading) {
    return <div className="text-center py-10 text-xl text-gray-500">Loading reviews...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-xl text-red-500">{error}</div>;
  }

  return (
    <div className="mx-auto py-12">
      <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-green-500 to-blue-400 bg-clip-text text-transparent mb-8">
        All Reviews ({actualReviews.length})
      </h2>

      {actualReviews.length === 0 ? (
        <div className="text-center py-10">No reviews available yet.</div>
      ) : (
        <div className="grid grid-rows-1 gap-6">
          {actualReviews.map((review, index) => (
            <div
              key={review._id}
              data-aos="fade-left"
              data-aos-delay={index * 100} // delay for staggered animation
              className="bg-base-100 rounded-lg shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg text-blue-500">{review.reviewerName}</h3>
                  <p className="text-sm text-gray-500">{formatDate(review.time)}</p>
                </div>
                <div className="flex items-center">
                  {renderStars(review.rating)}
                  <span className="ml-2 text-sm">({review.rating}/5)</span>
                </div>
              </div>

              <div className="mb-4">
                <p className="leading-relaxed">{review.description}</p>
              </div>

              <div className="border-t pt-3">
                <p className="text-xs text-gray-500">
                  Donation ID: {review.donationId?.slice(-8) || 'N/A'}
                </p>
                {(review.userEmail || review.UserEmail) && (
                  <p className="text-xs text-gray-500 mt-1">
                    Email: {review.userEmail || review.UserEmail}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <div  data-aos="fade-up" className="mt-12 bg-base-300 border-2 border-blue-200 shadow-md shadow-blue-50 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-blue-700 mb-4 text-center">Review Summary</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-blue-700">{actualReviews.length}</p>
            <p>Total Reviews</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-700">
              {actualReviews.length > 0
                ? (
                    actualReviews.reduce((sum, review) => sum + review.rating, 0) /
                    actualReviews.length
                  ).toFixed(1)
                : '0'}
            </p>
            <p>Average Rating</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-700">
              {actualReviews.filter((review) => review.rating === 5).length}
            </p>
            <p>5-Star Reviews</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllReviews;
