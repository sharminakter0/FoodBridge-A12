import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import toast from 'react-hot-toast';

const FeaturedDonationsPage = () => {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    axios.get('https://food-donation-server-mu.vercel.app/donations')
      .then(res => setDonations(res.data.slice(0, 4))) // display only 4
      .catch(() => toast.error('Failed to load featured donations'));
  }, []);
 console.log(donations)
  return (
    <div className=" pb-10 pt-8 ">
      <h2 className="text-3xl font-bold  bg-gradient-to-r from-green-500  to-blue-400 bg-clip-text text-transparent  text-center mb-6">Featured Donations</h2>
      <p className="text-sm  text-center mb-7">"Fresh, nutritious meals generously donated by local restaurants to fight food waste and hunger. <br /> Join us in making a difference—one meal at a time."</p>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {donations.map(donation => (
          <div key={donation._id} className="card bg-base-100 shadow-lg border border-gray-100">
            <figure>
              <img src={donation.image} alt={donation.title} className="w-full h-40 object-cover" />
            </figure>
            <div className="card-body">
              <h3 className="font-semibold text-lg">{donation.title}</h3>
             
              <p><span className="font-medium">Restaurant:</span> {donation.restaurantName}</p>
             
              <p>
                <span className="font-medium ">Status:</span>{' '}
                <span className='bg-red-200 rounded-xl py-1 text-red-500 px-4'>
                  {donation.status}
                </span>
              </p>
              <div className="mt-3 ">
                <Link to={`/donations/${donation._id}`} className="px-4 py-2 rounded-xl hover:bg-gradient-to-r from-blue-600 to-blue-400 hover:text-white border-2 w-full mx-auto text-blue-400 border-blue-400">
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
