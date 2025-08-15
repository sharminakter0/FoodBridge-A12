import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import axios from 'axios';
import toast from 'react-hot-toast';

const UpdateDonationForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [donation, setDonation] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/donations`)
      .then(res => {
        const found = res.data.find(item => item._id === id);
        if (found) setDonation(found);
        else toast.error('Donation not found');
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       const {_id, ...safeDonation} =donation
      await axios.put(`http://localhost:3000/donations/${id}`, safeDonation);
      toast.success('Donation updated');
      navigate('/dashboard/my-donations');
    } catch {
      toast.error('Update failed');
    }
  };

  if (!donation) return <p>Loading...</p>;

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Update Donation</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" value={donation.title} onChange={e => setDonation({ ...donation, title: e.target.value })} className="input input-bordered w-full" required placeholder="Donation Title" />
        <input type="text" value={donation.foodType} onChange={e => setDonation({ ...donation, foodType: e.target.value })} className="input input-bordered w-full" required placeholder="Food Type" />
        <input type="text" value={donation.quantity} onChange={e => setDonation({ ...donation, quantity: e.target.value })} className="input input-bordered w-full" required placeholder="Quantity" />
        <input type="text" value={donation.image} onChange={e => setDonation({ ...donation, image: e.target.value })} className="input input-bordered w-full" placeholder="Image URL" />
        <button type="submit" className="btn btn-primary w-full">Update</button>
      </form>
    </div>
  );
};

export default UpdateDonationForm;
