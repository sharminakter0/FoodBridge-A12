import { useEffect, useState } from 'react';

import axios from 'axios';
import { Link } from 'react-router';
import toast from 'react-hot-toast';
import useAuth from '../../../Hooks/UseAuth';

const Favorites = () => {
  const { user } =useAuth ();
  const [favorites, setFavorites] = useState([]);

  // Load favorites
  useEffect(() => {
    if (user?.email) {
      axios.get(`https://food-donation-server-mu.vercel.app/favorites/${user.email}`)
        .then(res => setFavorites(res.data))
        .catch(() => toast.error('Failed to load favorites'));
    }
  }, [user?.email]);

  const handleRemove = async (donationId) => {
  try {
    await axios.delete('https://food-donation-server-mu.vercel.app/favorites', {
      data: {
        userEmail: user.email,
        donationId,
      },
    });
    setFavorites(favorites.filter(fav => fav._id !== donationId));
    toast.success('Removed from favorites');
  } catch {
    toast.error('Failed to remove');
  }
};

  return (
    <div className="p-4">
      <h2 className="text-2xl text-center  bg-gradient-to-r from-green-500  to-blue-400 bg-clip-text text-transparent font-bold mb-4">My Favorites</h2>
      {favorites.length === 0 ? (
        <p>No favorites added.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map(donation => (
            <div key={donation._id} className="border p-4 rounded shadow space-y-2">
              <img src={donation.image} alt={donation.title} className="w-full h-48 object-cover rounded" />
              <h3 className="text-lg font-semibold">{donation.title}</h3>
              <p><strong>Restaurant:</strong> {donation.restaurantName}</p>
              <p><strong>Location:</strong> {donation.location}</p>
              <p><strong>Status:</strong> {donation.status}</p>
              <p><strong>Quantity:</strong> {donation.quantity}</p>
              <div className="flex gap-2">
                <Link to={`/donations/${donation._id}`}>
                  <button className="btn btn-info btn-sm">Details</button>
                </Link>
                <button onClick={() => handleRemove(donation._id)} className="btn btn-error btn-sm">
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
