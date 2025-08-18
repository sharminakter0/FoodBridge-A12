import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import FoodBridgeLogo from '../FoodBridgeLogo/FoodBridgeLogo';

import toast from 'react-hot-toast';
import { AuthContext } from '../../../Context/AuthContext';
import axios from 'axios';
import ThemeToggle from '../../../Component/Themetoggle/Themetoggle';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [useRole,setUseRole] = useState('')

  useEffect(()=>{
  if (user?.email){
 axios.get(`https://food-donation-server-mu.vercel.app/users/role/${user.email}`)
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
            ? 'bg-gradient-to-r  from-blue-700 to-blue-400 bg-clip-text text-transparent font-bold underline'
            : 'hover:text-blue-800'
        }  to="/">Home</NavLink></li>
      <li><NavLink 
      className={({ isActive }) =>
          isActive
            ? 'bg-gradient-to-r  from-blue-700 to-blue-400 bg-clip-text text-transparent font-bold underline'
            : 'hover:text-blue-800'
        }
         to="/all-donation">All Donation</NavLink></li>

         <li><NavLink 
      className={({ isActive }) =>
          isActive
            ? 'bg-gradient-to-r  from-blue-700 to-blue-400 bg-clip-text text-transparent font-bold underline'
            : 'hover:text-blue-800'
        }
         to="/contact">Contact</NavLink></li>

         
      
      {
      ['admin', 'restaurant', 'charity','user'].includes(useRole) && (
       <li><NavLink   className={({ isActive }) =>
          isActive
            ? 'bg-gradient-to-r  from-blue-700 to-blue-400 bg-clip-text text-transparent font-bold underline'
            : 'hover:text-blue-800'
        } 
        to="/dashboard">Dashboard</NavLink></li>

        
       )
       
     }
           {
      ['admin', 'restaurant', 'charity','user'].includes(useRole) && (
       <li><NavLink   className={({ isActive }) =>
          isActive
            ? 'bg-gradient-to-r  from-blue-700 to-blue-400 bg-clip-text text-transparent font-bold underline'
            : 'hover:text-blue-800'
        } 
        to="/donation-statistics">Donation Statistics</NavLink></li>

        
       )
       
     }

      
    </>
  );
  

  return (
    <div className="navbar px-3  lg:px-11 sticky top-0 left-0 z-50 mb-4 bg-gradient-to-r from-blue-50 to-green-50 text-blue-800 shadow-md ">
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
        <ul className="menu menu-horizontal gap-3 text-blue-700 px-1">
          {navLinks}
        </ul>
      </div>

      {/* Right Side */}
      <div className="navbar-end gap-3 ">
        <ThemeToggle ></ThemeToggle>
        {user ? (
          <div className="flex items-center gap-2">
            {/* User Name */}
            <p className="font-semibold text-blue-700 hidden md:block">{user.displayName || 'user'}</p>

            {/* Profile Picture */}
            <img
              src={user.photoURL || 'user'}
              alt="profile"
              className="w-10 h-10 rounded-full border-2 border-blue-600"
            />

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="btn bg-gradient-to-r  from-blue-700 to-blue-400 font-bold text-white"
            >
              Logout
            </button>
          </div>
        ) : (
          <NavLink to="/login">
            <button className="btn bg-gradient-to-r  from-blue-700 to-blue-400 font-bold text-blue-50">
              Login
            </button>
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Navbar;
