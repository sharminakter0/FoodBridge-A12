import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import toast from 'react-hot-toast';

const FeaturedDonationsPage = () => {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/donations')
      .then(res => setDonations(res.data.slice(0, 4))) // display only 4
      .catch(() => toast.error('Failed to load featured donations'));
  }, []);
 console.log(donations)
  return (
    <div className="px-4 py-8 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">🍱 Featured Donations</h2>
      <p className="text-sm text-gray-500 text-center mb-5">"Fresh, nutritious meals generously donated by local restaurants to fight food waste and hunger. <br /> Join us in making a difference—one meal at a time."</p>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {donations.map(donation => (
          <div key={donation._id} className="card bg-base-100 shadow-lg border border-gray-100">
            <figure>
              <img src={donation.image} alt={donation.title} className="w-full h-40 object-cover" />
            </figure>
            <div className="card-body">
              <h3 className="font-semibold text-lg">{donation.title}</h3>
              <p><span className="font-medium">Food Type:</span> {donation.foodType}</p>
              <p><span className="font-medium">Restaurant:</span> {donation.restaurantName}</p>
              <p><span className="font-medium">Location:</span> {donation.location}</p>
              <p>
                <span className="font-medium">Status:</span>{' '}
                <span className={`badge ${donation.status === 'Available' ? 'badge-success' : 'badge-error'}`}>
                  {donation.status}
                </span>
              </p>
              <div className="mt-3">
                <Link to={`/donations/${donation._id}`} className="btn btn-outline btn-sm btn-success w-full">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedDonationsPage;
