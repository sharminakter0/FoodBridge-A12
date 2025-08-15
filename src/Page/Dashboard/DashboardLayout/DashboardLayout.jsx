import React, { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router';
import axios from 'axios';
import useAuth from '../../../Hooks/UseAuth';
import FoodBridgeLogo from '../../Shared/FoodBridgeLogo/FoodBridgeLogo';


const DashboardLayout = () => {
  const { user } = useAuth();
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (user?.email) {
      axios.get(`http://localhost:3000/users/role/${user.email}`)
        .then(res => setRole(res.data.role))
        .catch(err => console.error(err));
    }
  }, [user]);

  if (!role) return <p className="text-center mt-10">Loading dashboard...</p>;

  const commonLinks = (
    <>

        <li>
          <NavLink
          className={({ isActive }) =>
          isActive
            ? 'bg-gradient-to-r from-[#27D6F5] to-[#27F5B4] bg-clip-text text-transparent font-bold underline'
            : 'hover:text-green-600'
        }
           to="/">Home</NavLink>
        </li>
      <li><NavLink  
      className={({ isActive }) =>
          isActive
            ? 'bg-gradient-to-r from-[#27D6F5] to-[#27F5B4] bg-clip-text text-transparent font-bold underline'
            : 'hover:text-green-600'
        }
         to="/dashboard/my-profile">My Profile</NavLink></li>

       
    </>
  );

  const userLinks = (
    <>
      <li><NavLink 
      className={({ isActive }) =>
          isActive
            ? 'bg-gradient-to-r from-[#27D6F5] to-[#27F5B4] bg-clip-text text-transparent font-bold underline'
            : 'hover:text-green-600'
        }
         to="/dashboard/request-charity-role">Request Charity Role</NavLink></li>
      <li><NavLink className={({ isActive }) =>
          isActive
            ? 'bg-gradient-to-r from-[#27D6F5] to-[#27F5B4] bg-clip-text text-transparent font-bold underline'
            : 'hover:text-green-600'
        }
         to="/dashboard/favorites">Favorites</NavLink></li>
      <li><NavLink className={({ isActive }) =>
          isActive
            ? 'bg-gradient-to-r from-[#27D6F5] to-[#27F5B4] bg-clip-text text-transparent font-bold underline'
            : 'hover:text-green-600'
        }
         to="/dashboard/my-reviews">My Reviews</NavLink></li>
      <li><NavLink className={({ isActive }) =>
          isActive
            ? 'bg-gradient-to-r from-[#27D6F5] to-[#27F5B4] bg-clip-text text-transparent font-bold underline'
            : 'hover:text-green-600'
        }
         to="/dashboard/transaction-history">Transaction History</NavLink></li>
    </>
  );

  const restaurantLinks = (
    <>

       <li><NavLink className={({ isActive }) =>
          isActive
            ? 'bg-gradient-to-r from-[#27D6F5] to-[#27F5B4] bg-clip-text text-transparent font-bold underline'
            : 'hover:text-green-600'
        }
         to="/dashboard/donation-statistics">Donation Statistics</NavLink></li>
     
      <li><NavLink className={({ isActive }) =>
          isActive
            ? 'bg-gradient-to-r from-[#27D6F5] to-[#27F5B4] bg-clip-text text-transparent font-bold underline'
            : 'hover:text-green-600'
        }
         to="/dashboard/add-donation">Add Donation</NavLink></li>
      <li><NavLink className={({ isActive }) =>
          isActive
            ? 'bg-gradient-to-r from-[#27D6F5] to-[#27F5B4] bg-clip-text text-transparent font-bold underline'
            : 'hover:text-green-600'
        }
         to="/dashboard/my-donations">My Donations</NavLink></li>
      <li><NavLink className={({ isActive }) =>
          isActive
            ? 'bg-gradient-to-r from-[#27D6F5] to-[#27F5B4] bg-clip-text text-transparent font-bold underline'
            : 'hover:text-green-600'
        }
         to="/dashboard/requested-donations">Requested Donations</NavLink></li>
    </>
  );

  const charityLinks = (
    <>
      
      <li><NavLink className={({ isActive }) =>
          isActive
            ? 'bg-gradient-to-r from-[#27D6F5] to-[#27F5B4] bg-clip-text text-transparent font-bold underline'
            : 'hover:text-green-600'
        }
         to="/dashboard/my-requests">My Requests</NavLink></li>
      <li><NavLink className={({ isActive }) =>
          isActive
            ? 'bg-gradient-to-r from-[#27D6F5] to-[#27F5B4] bg-clip-text text-transparent font-bold underline'
            : 'hover:text-green-600'
        }
         to="/dashboard/my-pickups">My Pickups</NavLink></li>
      <li><NavLink className={({ isActive }) =>
          isActive
            ? 'bg-gradient-to-r from-[#27D6F5] to-[#27F5B4] bg-clip-text text-transparent font-bold underline'
            : 'hover:text-green-600'
        }
         to="/dashboard/received-donation">Received Donations

      </NavLink></li>
      
      <li><NavLink className={({ isActive }) =>
          isActive
            ? 'bg-gradient-to-r from-[#27D6F5] to-[#27F5B4] bg-clip-text text-transparent font-bold underline'
            : 'hover:text-green-600'
        }
         to="/dashboard/transaction-history">Transaction History
      </NavLink></li>
    </>
  );

  const adminLinks = (
    <>
      <li><NavLink className={({ isActive }) =>
          isActive
            ? 'bg-gradient-to-r from-[#27D6F5] to-[#27F5B4] bg-clip-text text-transparent font-bold underline'
            : 'hover:text-green-600'
        }
         to="/dashboard/manage-donations">Manage Donations</NavLink></li>
      <li><NavLink className={({ isActive }) =>
          isActive
            ? 'bg-gradient-to-r from-[#27D6F5] to-[#27F5B4] bg-clip-text text-transparent font-bold underline'
            : 'hover:text-green-600'
        }
         to="/dashboard/manage-users">Manage Users</NavLink></li>
      <li><NavLink className={({ isActive }) =>
          isActive
            ? 'bg-gradient-to-r from-[#27D6F5] to-[#27F5B4] bg-clip-text text-transparent font-bold underline'
            : 'hover:text-green-600'
        }
         to="/dashboard/manage-role-requests">Manage Role Requests</NavLink></li>

      <li><NavLink className={({ isActive }) =>
          isActive
            ? 'bg-gradient-to-r from-[#27D6F5] to-[#27F5B4] bg-clip-text text-transparent font-bold underline'
            : 'hover:text-green-600'
        }
         to="/dashboard/manage-requests">Manage Requests</NavLink></li>
      
      <li><NavLink className={({ isActive }) =>
          isActive
            ? 'bg-gradient-to-r from-[#27D6F5] to-[#27F5B4] bg-clip-text text-transparent font-bold underline'
            : 'hover:text-green-600'
        }
         to="/dashboard/feature-donations">Feature Donations</NavLink></li>
    </>
  );

  return (
    <div className="drawer lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* Page Content */}
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="w-full navbar bg-base-300 px-4 lg:px-8">
          <div className="flex-none lg:hidden">
            <label htmlFor="dashboard-drawer" className="btn btn-square btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </label>
          </div>
          <div className=" gap-50 text-xl font-bold">  <FoodBridgeLogo></FoodBridgeLogo></div>
        </div>

        {/* Nested page content */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>

      {/* Drawer Sidebar */}
      <div className="drawer-side ">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 min-h-full bg-green-100 text-base-content ">
          <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

          {commonLinks}
          {role === 'user' && userLinks}
          {role === 'restaurant' && restaurantLinks}
          {role === 'charity' && charityLinks}
          {role === 'admin' && adminLinks}
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
