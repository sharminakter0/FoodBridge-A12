import { useEffect, useState } from 'react';

import axios from 'axios';
import { Link } from 'react-router';
import toast from 'react-hot-toast';
import useAuth from '../../../Hooks/UseAuth';

const MyDonations = () => {
  const { user } = useAuth();
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axios.get(`https://food-donation-server-mu.vercel.app/donations/restaurant/${user.email}`)
        .then(res => setDonations(res.data))
        .catch(() => toast.error('Failed to load donations'));
    }
  }, [user?.email]);

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this donation?')) {
      try {
        await axios.delete(`https://food-donation-server-mu.vercel.app/donations/${id}`);
        setDonations(donations.filter(item => item._id !== id));
        toast.success('Donation deleted');
      } catch {
        toast.error('Failed to delete donation');
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Donations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {donations.map(donation => (
          <div key={donation._id} className="border p-4 rounded shadow space-y-2">
            <img src={donation.image} alt={donation.title} className="w-full h-48 object-cover rounded" />
            <h3 className="text-lg font-semibold">{donation.title}</h3>
            <p><strong>Food Type:</strong> {donation.foodType}</p>
            <p><strong>Quantity:</strong> {donation.quantity}</p>
            <p><strong>Restaurant:</strong> {donation.restaurantName}</p>
            <p><strong>Status:</strong> {donation.status}</p>
            <div className="flex gap-2">
              {donation.status !== 'Rejected' && (
                <Link to={`/dashboard/update-donation/${donation._id}`}>
                  <button className="btn btn-info btn-sm">Update</button>
                </Link>
              )}
              <button onClick={() => handleDelete(donation._id)} className="btn btn-error btn-sm">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyDonations;
