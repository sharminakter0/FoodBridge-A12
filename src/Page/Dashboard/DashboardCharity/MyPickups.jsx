import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../Context/AuthContext';
import { use } from 'react';

const MyPickups = () => {
  const [pickups, setPickups] = useState([]);
  const {user} = use(AuthContext)
  //console.log(user.email)
  useEffect(() => {
    if (user.email) {
      axios
        .get(`http://localhost:3000/donations/picked-up/${user.email}`)
        .then(res => setPickups(res.data))
        .catch(() => toast.error('Failed to load pickup donations'));
    }
  }, [user.email]);
//  console.log(pickups)
  const handleConfirmPickup = async (id) => {
    try {
      await axios.patch(`http://localhost:3000/donation-pickups/${id}/confirm`);
      toast.success('Pickup confirmed');
      setPickups(prev => prev.map(item =>
        item._id === id ? { ...item, status: 'Picked Up' } : item
      ));
    } catch {
      toast.error('Failed to confirm pickup');
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold mb-4">My Assigned Pickups</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pickups.map(pickup => (
          <div key={pickup._id} className="border p-4 rounded-lg shadow-md bg-white space-y-2">
            <h3 className="text-lg font-semibold">{pickup.donationTitle}</h3>
            <p><strong>Restaurant:</strong> {pickup.restaurantName}</p>
            <p><strong>Location:</strong> {pickup.location}</p>
            <p><strong>Food Type:</strong> {pickup.foodType}</p>
            <p><strong>Quantity:</strong> {pickup.quantity}</p>
            <p><strong>Pickup Time:</strong> {pickup.pickupTime}</p>
            <p>
              <strong>Status:</strong>{' '}
              <span className={`font-medium ${pickup.status === 'Picked Up' ? 'text-green-600' : 'text-blue-600'}`}>
                {pickup.status === 'Picked Up' ? 'Picked Up' : 'Assigned'}
              </span>
            </p>

            {pickup.status !== 'Picked Up' && (
              <button
                onClick={() => handleConfirmPickup(pickup._id)}
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
              >
                Confirm Pickup
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPickups;
