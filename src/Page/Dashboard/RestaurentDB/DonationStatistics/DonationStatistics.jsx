import {  useEffect, useState } from 'react';

import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import useAuth from '../../../../Hooks/UseAuth';

const DonationStatistics = () => {
  const { user } = useAuth()
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:3000/donations?email=${user.email}`)
        .then(res => {
          const donations = res.data;

          // Count donation quantities by foodType
          const grouped = donations.reduce((acc, item) => {
            const type = item.foodType || 'Other';
            if (!acc[type]) {
              acc[type] = 0;
            }
            acc[type] += item.quantity || 0;
            return acc;
          }, {});

          // Convert to chart format
          const formatted = Object.entries(grouped).map(([foodType, quantity]) => ({
            foodType,
            quantity
          }));

          setChartData(formatted);
        })
        .catch(() => console.error('Failed to load donation stats'));
    }
  }, [user]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Donation Statistics</h2>
      {chartData.length === 0 ? (
        <p>No donation data to display.</p>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="foodType" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="quantity" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default DonationStatistics;
