import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import FoodBridgeLogo from '../FoodBridgeLogo/FoodBridgeLogo';

import toast from 'react-hot-toast';
import { AuthContext } from '../../../Context/AuthContext';
import axios from 'axios';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [useRole,setUseRole] = useState('')

  useEffect(()=>{
  if (user?.email){
 axios.get(`http://localhost:3000/users/role/${user.email}`)
  .then (res=> setUseRole(res.data.role))
  }
  },[user])

  const handleLogout = () => {
    logOut()
      .then(() => {
        // Optional: clear token if you store it
        localStorage.removeItem('access-token');
        toast.success('Logged out successfully');
      })
      .catch((err) => {
        console.error(err);
        toast.error('Logout failed');
      });
  };

  const navLinks = (
    <>
      <li><NavLink className={({ isActive }) =>
          isActive
            ? 'bg-gradient-to-r from-[#27D6F5] to-[#27F5B4] bg-clip-text text-transparent font-bold underline'
            : 'hover:text-green-600'
        }  to="/">Home</NavLink></li>
      <li><NavLink 
      className={({ isActive }) =>
          isActive
            ? 'bg-gradient-to-r from-[#27D6F5] to-[#27F5B4] bg-clip-text text-transparent font-bold underline'
            : 'hover:text-green-600'
        }
         to="/all-donation">All Donation</NavLink></li>
      
      {
      ['admin', 'restaurant', 'charity','user'].includes(useRole) && (
       <li><NavLink   className={({ isActive }) =>
          isActive
            ? 'bg-gradient-to-r from-[#27D6F5] to-[#27F5B4] bg-clip-text text-transparent font-bold underline'
            : 'hover:text-green-600'
        } 
        to="/dashboard">Dashboard</NavLink></li>
       )
     }

      
    </>
  );
  

  return (
    <div className="navbar bg-base-200 shadow-sm mt-3 rounded-2xl">
      {/* Left Side */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
            {navLinks}
          </ul>
        </div>
        <FoodBridgeLogo />
      </div>

      {/* Center Links */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-3 text-gray-800 px-1">
          {navLinks}
        </ul>
      </div>

      {/* Right Side */}
      <div className="navbar-end">
        {user ? (
          <div className="flex items-center gap-3">
            {/* User Name */}
            <p className="font-semibold text-gray-700 hidden md:block">{user.displayName || 'user'}</p>

            {/* Profile Picture */}
            <img
              src={user.photoURL || 'user'}
              alt="profile"
              className="w-10 h-10 rounded-full border-2 border-green-400"
            />

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="btn bg-gradient-to-r from-[#07ac18] to-[#b3e917] font-bold text-green-950"
            >
              Logout
            </button>
          </div>
        ) : (
          <NavLink to="/login">
            <button className="btn bg-gradient-to-r from-[#07ac18] to-[#b3e917] font-bold text-green-950">
              Login
            </button>
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Navbar;
