import { useEffect, useState } from 'react';
import axios from 'axios';
import CountUp from 'react-countup';
import Lottie from 'lottie-react';
import line from "../../assets/Lottie/GTawCz5eK9.json"

const ImpactStats = () => {
  const [stats, setStats] = useState([]); // Fixed typo: statas -> stats
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('https://food-donation-server-mu.vercel.app/donations')
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
    <div className=" bg-base-300 py-6  my-10">
      <h2 className="text-3xl font-bold text-center  bg-gradient-to-r from-green-500  to-blue-400 bg-clip-text text-transparent  mb-8">
        Our Impact
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center py-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-300 ">

        
        <div >
          <h3 className="text-4xl  font-bold bg-gradient-to-r from-blue-700 to-blue-400 bg-clip-text text-transparent">
            <CountUp end={totalQuantity} duration={7} /> kg
          </h3>
          <p className="text-blue-400 mt-2">Total Food Donated</p>
          
        </div>

       
        <div >
          <h3 className="text-4xl bg-gradient-to-r from-green-700 to-green-400 bg-clip-text text-transparent font-bold ">
            <CountUp end={totalDonations} duration={7} separator="," />
          </h3>
          <p className="text-green-400 mt-2">Total Donations</p>
        </div>
        <div>
          <h3 className="text-4xl font-bold bg-gradient-to-r from-blue-700 to-blue-400 bg-clip-text text-transparent">
            <CountUp end={pickedUpDonations} duration={7} />
          </h3>
          <p className="text-blue-400 mt-2">Successfully Picked Up</p>
        </div>
        </div>
      </div>
   
  );
};

export default ImpactStats;