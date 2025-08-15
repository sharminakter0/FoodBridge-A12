import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from '../../Hooks/UseAxiosSecure';
import { Link } from 'react-router';
import { useState } from 'react';

const AllDonations = () => {
  const axiosSecure = UseAxiosSecure();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');

  const { data: donations = [], isLoading, error } = useQuery({
    queryKey: ['donations'],
    queryFn: async () => {
      const res = await axiosSecure.get('/donations');
      return res.data;
    }
  });

  if (isLoading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error loading data</p>;

  // Filter donations by location
  let filteredDonations = donations.filter(donation =>
    donation.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort based on selected option
  if (sortOption === 'quantity-asc') {
    filteredDonations.sort((a, b) => a.quantity - b.quantity);
  } else if (sortOption === 'quantity-desc') {
    filteredDonations.sort((a, b) => b.quantity - a.quantity);
  } else if (sortOption === 'pickup-asc') {
    filteredDonations.sort((a, b) => new Date(a.pickupTime) - new Date(b.pickupTime));
  } else if (sortOption === 'pickup-desc') {
    filteredDonations.sort((a, b) => new Date(b.pickupTime) - new Date(a.pickupTime));
  }

  return (
    <div className="px-4 py-6">
      {/* Search + Sort Controls */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by city or zip code"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered w-full md:w-1/2"
        />

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="select select-bordered w-full md:w-1/4"
        >
          <option value="">Sort By</option>
          <option value="quantity-asc">Quantity (Low to High)</option>
          <option value="quantity-desc">Quantity (High to Low)</option>
          <option value="pickup-asc">Pickup Time (Earliest First)</option>
          <option value="pickup-desc">Pickup Time (Latest First)</option>
        </select>
      </div>

      {/* Donations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredDonations.map(donation => (
          <div key={donation._id} className="border rounded-lg p-4 shadow">
            <img
              src={donation.image}
              alt={donation.title}
              className="w-full h-48 object-cover rounded mb-2"
            />
            <h2 className="text-xl font-semibold">{donation.title}</h2>
            <p><strong>Food Type:</strong> {donation.foodType}</p>
            <p><strong>Restaurant:</strong> {donation.restaurantName}, {donation.location}</p>
            <p><strong>Charity:</strong> {donation.charityName || 'Unassigned'}</p>
            <p><strong>Status:</strong> {donation.status}</p>
            <p><strong>Quantity:</strong> {donation.quantity}</p>
            <p><strong>Pickup Time:</strong> {new Date(donation.pickupTime).toLocaleString()}</p>
            <Link to={`/donations/${donation._id}`}>
              <button className="btn btn-success mt-2">Details</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllDonations;
