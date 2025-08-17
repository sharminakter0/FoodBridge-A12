import {  useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';






import getAxiosWithFirebaseToken from '../../../hook/useAxiosWithToken';


const FeatureDonations = () => {
  const [donations, setDonations] = useState([]);
  


 
  useEffect(() => {
    async function fetchDonations() {
      const axiosInstance = await getAxiosWithFirebaseToken();

      if (!axiosInstance) {
        toast.error('Please login first');
        return;
      }

      try {
        const res = await axiosInstance.get('/donations');
        setDonations(res.data);
      } catch  {
        toast.error('Failed to load verified donations');
      }
    }

    fetchDonations();
  }, []);
  const handleFeature = async (id) => {
    try {
      const res = await axios.put(`https://food-donation-server-mu.vercel.app/donations/feature/${id}`);
      toast.success(res.data.message);
      setDonations(prev => prev.map(d => d._id === id ? { ...d, isFeatured: true } : d));
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to feature donation');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-green-700">Feature Donations</h2>

      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead className="">
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Food Type</th>
              <th>Restaurant</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {donations.map(donation => (
              <tr key={donation._id}>
                <td>
                  <img src={donation.image} alt={donation.title} className="w-20 h-14 object-cover rounded" />
                </td>
                <td className="font-medium">{donation.title}</td>
                <td>{donation.foodType}</td>
                <td>{donation.restaurantName}</td>
                <td>
                  {donation.isFeatured ? (
                    <span className="text-green-500 font-semibold">Featured</span>
                  ) : (
                    <button
                      onClick={() => handleFeature(donation._id)}
                      className="btn btn-sm btn-outline btn-success"
                    >
                      Feature
                    </button>
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

export default FeatureDonations;
