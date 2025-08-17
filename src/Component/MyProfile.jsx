import React, { useEffect, useState } from 'react';


import useAuth from '../Hooks/UseAuth';
import toast from 'react-hot-toast';
import getAxiosWithFirebaseToken from '../hook/useAxiosWithToken';

const MyProfile = () => {
  const { user } = useAuth();
  const [dbUser, setDbUser] = useState(null);
// useEffect(() => {
//     async function fetchDonations() {
//       const axiosInstance = await getAxiosWithFirebaseToken();

//       if (!axiosInstance) {
//         toast.error('Please login first');
//         return;
//       }

//       try {
//         const res = await axiosInstance.get('/donations');
//         setDonations(res.data);
//       } catch (error) {
//         toast.error('Failed to load verified donations');
//       }
//     }

//     fetchDonations();
//   }, []);
 useEffect(() => {
  async function getDbUserData() {
    if (!user?.email) return;

    const axiosInstance = await getAxiosWithFirebaseToken();

    if (!axiosInstance) {
      toast.error('Please login first');
      return;
    }

    try {
      const res = await axiosInstance.get(`/users/${user.email}`);
      setDbUser(res.data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load user data');
    }
  }

  getDbUserData();
}, [user]);


  if (!dbUser) return <p className="text-center mt-10">Loading profile...</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-base-100 shadow-lg border-2 border-blue-400 rounded-lg">
      <div className="flex flex-col items-center">
        <img src={dbUser.photoURL} alt="User" className="w-24 h-24 rounded-full border" />
        <h2 className="text-2xl font-bold mt-4">{dbUser.name}</h2>
        <p className="text-sm text-gray-500">{dbUser.email}</p>
        {dbUser.role !== 'user' && (
          <span className="mt-2 px-3 py-1 text-sm bg-green-100 text-green-600 rounded-full capitalize">
            Role: {dbUser.role}
          </span>
        )}
        <div className="mt-4">
          {/* Optional: contact or join date */}
          <p><strong>Joined On:</strong> {dbUser.createdAt ? new Date(dbUser.createdAt).toLocaleDateString() : 'N/A'}</p>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
