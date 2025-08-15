import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ManageDonations = () => {
  const [donations, setDonations] = useState([]);


  useEffect(() => {
    axios.get('http://localhost:3000/donations')
      .then(res => setDonations(res.data))
      .catch(() => toast.error('Donation Load Error'));
  }, []);

  
  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:3000/donations/${id}`, { status });
      toast.success(`The Donation has been ${status === 'Verified' ? 'Verified' : 'Rejected'}`);
      setDonations(prev => 
        prev.map(d => d._id === id ? { ...d, status } : d)
      );
    } catch  {
      toast.error('Status Update Error');
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-5">Manage Donations</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Food Type</th>
              <th className="px-4 py-2 text-left">Restaurant Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-center">Quantity</th>
              <th className="px-4 py-2 text-center">Status</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {donations.map(donation => (
              <tr key={donation._id} className="border-t">
                <td className="px-4 py-2">{donation.title}</td>
                <td className="px-4 py-2">{donation.foodType}</td>
                <td className="px-4 py-2">{donation.restaurantName}</td>
                <td className="px-4 py-2">{donation.restaurantEmail}</td>
                <td className="px-4 py-2 text-center">{donation.quantity}</td>
                <td className="px-4 py-2 text-center">
                  <span className={`font-semibold ${
                    donation.status === 'Verified'
                      ? 'text-green-600'
                      : donation.status === 'Rejected'
                      ? 'text-red-600'
                      : 'text-yellow-600'
                  }`}>
                    {donation.status}
                  </span>
                </td>
                <td className="px-4 py-2 text-center space-x-2">
                  {donation.status === 'Pending' && (
                    <>
                      <button
                        onClick={() => updateStatus(donation._id, 'Verified')}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                      >
                        Verify
                      </button>
                      <button
                        onClick={() => updateStatus(donation._id, 'Rejected')}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageDonations;
