import { useEffect, useState } from 'react';
import axios from 'axios';
import CountUp from 'react-countup';

const ImpactStats = () => {
  const [stats, setStats] = useState([]); // Fixed typo: statas -> stats
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:3000/donations')
      .then((res) => {
        console.log('Impact stats from API:', res.data);
        setStats(res.data);
      })
      .catch((err) => {
        console.error('Impact API failed', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10 text-xl text-gray-500">
        Loading impact statistics...
      </div>
    );
  }

  // Calculate aggregate statistics
  const totalQuantity = stats.reduce((sum, donation) => sum + parseInt(donation.quantity), 0);
  const totalDonations = stats.length;
  const pickedUpDonations = stats.filter(donation => donation.status === "Picked Up").length;

  return (
    <div className="py-12 px-4 md:px-10 rounded-xl shadow-lg max-w-6xl mx-auto my-10">
      <h2 className="text-3xl font-bold text-center text-green-800 mb-8">
        Our Impact
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
        <div>
          <h3 className="text-4xl font-bold text-green-700">
            <CountUp end={totalQuantity} duration={7} /> kg
          </h3>
          <p className="text-gray-600 mt-2">Total Food Donated</p>
        </div>
        <div>
          <h3 className="text-4xl font-bold text-green-700">
            <CountUp end={totalDonations} duration={7} separator="," />
          </h3>
          <p className="text-gray-600 mt-2">Total Donations</p>
        </div>
        <div>
          <h3 className="text-4xl font-bold text-green-700">
            <CountUp end={pickedUpDonations} duration={7} />
          </h3>
          <p className="text-gray-600 mt-2">Successfully Picked Up</p>
        </div>
      </div>
    </div>
  );
};

export default ImpactStats;