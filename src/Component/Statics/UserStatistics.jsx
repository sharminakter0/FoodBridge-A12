import React, { useEffect, useState } from 'react';
import { FaUsers, FaChartPie } from 'react-icons/fa';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';
import UseAxiosSecure from '../../Hooks/UseAxiosSecure';

const UserStatistics = () => {
  const [stats, setStats] = useState({
    total: 0,
    users: 0,
    admins: 0,
    restaurant: 0,
    charity: 0,
  });
  const [loading, setLoading] = useState(true);
  const axiosSecure = UseAxiosSecure();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axiosSecure.get('/users');
        const allUsers = res.data;

        setStats({
          total: allUsers.length,
          users: allUsers.filter(e => e.role === 'user').length,
          admins: allUsers.filter(e => e.role === 'admin').length,
          restaurant: allUsers.filter(e => e.role === 'restaurant').length,
          charity: allUsers.filter(e => e.role === 'charity').length,
        });

        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch user statistics', error);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const { total, users, admins, restaurant, charity } = stats;
  const userPercentage = total ? (users / total) * 100 : 0;
  const adminPercentage = total ? (admins / total) * 100 : 0;
  const restaurantPercentage = total ? (restaurant / total) * 100 : 0;
  const charityPercentage = total ? (charity / total) * 100 : 0;

  return (
    <div className=" py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-green-500 to-blue-400 bg-clip-text text-transparent mb-3">
          User Statistics
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Overview of our community members and their roles
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1  md:grid-cols-2 gap-8">
          {/* Statistics Cards */}
          <div className="grid grid-cols-2 gap-6">
            <StatCard title="Total Users" value={total} icon={<FaUsers size={24} />} />
            <StatCard title="Regular Users" value={users} icon={<FaUsers size={24} />} />
            <StatCard title="Admins" value={admins} icon={<FaUsers size={24} />} />
            <StatCard title="Restaurant" value={restaurant} icon={<FaUsers size={24} />} />
            <StatCard title="Charity" value={charity} icon={<FaUsers size={24} />} />
          </div>

          {/* Pie Chart */}
          <motion.div
            className="bg-base-100 p-6 rounded-xl shadow-lg border border-blue-200"
            whileHover={{ scale: 1.02, boxShadow: "0px 8px 20px rgba(59,130,246,0.25)" }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">User Distribution</h3>
              <FaChartPie className="text-blue-500" size={20} />
            </div>

            <div className="relative h-64 w-full">
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <div
                  className="rounded-full border-8 border-gray-200"
                  style={{
                    width: '200px',
                    height: '200px',
                    background: `conic-gradient(
                      #10B981 ${userPercentage}%,
                      #8B5CF6 ${userPercentage}% ${userPercentage + adminPercentage}%,
                      #F59E0B ${userPercentage + adminPercentage}% ${userPercentage + adminPercentage + restaurantPercentage}%,
                      #3B82F6 ${userPercentage + adminPercentage + restaurantPercentage}% ${userPercentage + adminPercentage + restaurantPercentage + charityPercentage}%
                    )`,
                  }}
                ></div>
              </motion.div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="rounded-full bg-white"
                  style={{ width: '120px', height: '120px' }}
                ></div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mt-4">
              <Legend color="#10B981" label="Users" percentage={userPercentage} />
              <Legend color="#8B5CF6" label="Admins" percentage={adminPercentage} />
              <Legend color="#F59E0B" label="Restaurant" percentage={restaurantPercentage} />
              <Legend color="#3B82F6" label="Charity" percentage={charityPercentage} />
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

const StatCard = ({ title, value, icon }) => (
  <motion.div
    className="bg-base-100 p-6 rounded-xl shadow-lg border border-blue-100"
    whileHover={{ scale: 1.05, boxShadow: "0px 8px 20px rgba(16,185,129,0.3)" }}
    transition={{ duration: 0.3 }}
  >
    <div className="flex items-center justify-between">
      <div className="flex-1 flex flex-col items-center justify-center">
        <p className="text-sm font-medium">{title}</p>
        <h3 className="text-3xl font-bold mt-15">
          <CountUp end={value} duration={2} />
        </h3>
      </div>
      <div className="p-3 rounded-full bg-blue-100 text-blue-600">{icon}</div>
    </div>
  </motion.div>
);

const Legend = ({ color, label, percentage }) => (
  <div className="flex items-center">
    <div
      className={`w-3 h-3 rounded-full mr-2`}
      style={{ backgroundColor: color }}
    ></div>
    <span className="text-sm">
      {label} ({percentage.toFixed(1)}%)
    </span>
  </div>
);

export default UserStatistics;
