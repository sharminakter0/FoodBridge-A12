import { useEffect, useState } from 'react';
import axios from 'axios';

const AllReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:3000/reviews') // Replace with your actual reviews endpoint
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

  // Function to render stars
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-lg ${
          index < rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
      >
        ★
      </span>
    ));
  };

  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Filter out reviews that have donationId (actual reviews)
  const actualReviews = reviews.filter(review => review.donationId);

  if (loading) {
    return (
      <div className="text-center py-10 text-xl text-gray-500">
        Loading reviews...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-xl text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 md:px-10">
      <h2 className="text-3xl font-bold text-center text-green-800 mb-8">
        All Reviews ({actualReviews.length})
      </h2>
      
      {actualReviews.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No reviews available yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {actualReviews.map((review) => (
            <div
              key={review._id}
              className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300"
            >
              {/* Header with name and rating */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">
                    {review.reviewerName}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {formatDate(review.time)}
                  </p>
                </div>
                <div className="flex items-center">
                  {renderStars(review.rating)}
                  <span className="ml-2 text-sm text-gray-600">
                    ({review.rating}/5)
                  </span>
                </div>
              </div>

              {/* Review description */}
              <div className="mb-4">
                <p className="text-gray-700 leading-relaxed">
                  {review.description}
                </p>
              </div>

              {/* Footer with donation ID */}
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

      {/* Summary Statistics */}
      <div className="mt-12 bg-green-50 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-green-800 mb-4 text-center">
          Review Summary
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-green-700">
              {actualReviews.length}
            </p>
            <p className="text-gray-600">Total Reviews</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-700">
              {actualReviews.length > 0 
                ? (actualReviews.reduce((sum, review) => sum + review.rating, 0) / actualReviews.length).toFixed(1)
                : '0'
              }
            </p>
            <p className="text-gray-600">Average Rating</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-700">
              {actualReviews.filter(review => review.rating === 5).length}
            </p>
            <p className="text-gray-600">5-Star Reviews</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllReviews;