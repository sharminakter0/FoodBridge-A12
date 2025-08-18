import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { motion } from 'framer-motion';
import useAuth from '../../../../Hooks/UseAuth';

const DonationStatistics = () => {
  const { user } = useAuth();
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`https://food-donation-server-mu.vercel.app/donations?email=${user.email}`)
        .then(res => {
          const donations = res.data;

          // Count donation quantities by foodType
          const grouped = donations.reduce((acc, item) => {
            const type = item.foodType || 'Other';
            if (!acc[type]) acc[type] = 0;
            acc[type] += item.quantity || 0;
            return acc;
          }, {});

          // Convert to chart format
          const formatted = Object.entries(grouped).map(([foodType, quantity]) => ({
            foodType,
            quantity,
          }));

          setChartData(formatted);
        })
        .catch(() => console.error('Failed to load donation stats'));
    }
  }, [user]);

  return (
    <motion.div
      className="w-11/12 mx-auto p-6 bg-base-100  rounded-2xl shadow-lg"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h2 className="text-3xl font-bold mb-6 text-center text-green-600 dark:text-green-400">
        Donation Statistics
      </h2>

      {chartData.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-300">
          No donation data to display.
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData}>
            <defs>
              <linearGradient id="colorDonation" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#34d399" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#10b981" stopOpacity={0.6} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />
            <XAxis dataKey="foodType" stroke="#374151" />
            <YAxis stroke="#374151" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#f9fafb",
                borderRadius: "10px",
                border: "1px solid #e5e7eb",
              }}
            />
            <Legend />
            <Bar
              dataKey="quantity"
              fill="url(#colorDonation)"
              barSize={60}
              radius={[10, 10, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </motion.div>
  );
};

export default DonationStatistics;