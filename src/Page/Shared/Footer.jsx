import React from 'react';
import { NavLink } from 'react-router'; 
import logo from '../../assets/Lottie/z7Jq68njio.json'
import Lottie from 'lottie-react';

const Footer = () => {
  return (
    <footer className="bg-blue-50 text-blue-700 py-6 mt-12 rounded">
         <div className='mb-5'>
          <Lottie animationData={logo}
     loop={true}
     className="w-6 md:w-9 mx-auto  gap-0 ">

               </Lottie>
       <h2 className='text-xl md:text-2xl -ml-1 bg-gradient-to-r from-blue-700 to-blue-400 bg-clip-text text-transparent text-center font-extrabold'> FoodBridge</h2></div>
      <div className="container mx-auto px-4 flex flex-col  justify-between items-center">
        {/* Links */}
        <div className="mb-7  space-x-6">
                    <NavLink to="/" className={({ isActive }) =>
          isActive
            ? 'bg-gradient-to-r  from-blue-700 to-blue-400 bg-clip-text text-transparent font-bold underline'
            : 'hover:text-blue-800'
        } >
           Home
          </NavLink>

           <NavLink to="/all-donation" className={({ isActive }) =>
          isActive
            ? 'bg-gradient-to-r  from-blue-700 to-blue-400 bg-clip-text text-transparent font-bold underline'
            : 'hover:text-blue-800'
        } >
          All Donation
          </NavLink>
          <NavLink to="/about" className={({ isActive }) =>
          isActive
            ? 'bg-gradient-to-r  from-blue-700 to-blue-400 bg-clip-text text-transparent font-bold underline'
            : 'hover:text-blue-800'
        } >
            About
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) =>
          isActive
            ? 'bg-gradient-to-r  from-blue-700 to-blue-400 bg-clip-text text-transparent font-bold underline'
            : 'hover:text-blue-800'
        } >
            Contact
          </NavLink>
        </div>

        {/* Social Media */}
        <div className="flex flex-col pace-x-6">
            <h1 className='text-center mb-3'>Follow Us</h1>

            <div className=' flex gap-10 flex-row'>
          <a
            href="https://www.facebook.com/sharminakter0s"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="hover:text-white"
          >
            <svg
              className="w-6 h-6 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H8v-3h2.4V9.5a3.3 3.3 0 0 1 3.5-3.6 14.4 14.4 0 0 1 2 .2v2.3h-1a1.3 1.3 0 0 0-1.5 1.4v1.7h2.6l-.4 3h-2.2v7A10 10 0 0 0 22 12z" />
            </svg>
          </a>

          <a
            href="https://x.com/SharminAkt79722"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="hover:text-white"
          >
            <svg
              className="w-6 h-6 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.3 4.3 0 0 0 1.88-2.37 8.5 8.5 0 0 1-2.7 1.03 4.3 4.3 0 0 0-7.3 3.9 12.2 12.2 0 0 1-8.9-4.5 4.3 4.3 0 0 0 1.34 5.7 4.25 4.25 0 0 1-1.95-.54v.05a4.3 4.3 0 0 0 3.45 4.2 4.3 4.3 0 0 1-1.95.07 4.3 4.3 0 0 0 4 3 8.6 8.6 0 0 1-5.3 1.8A8.8 8.8 0 0 1 2 18.15 12.15 12.15 0 0 0 8 20c7.55 0 11.7-6.26 11.7-11.7v-.53A8.4 8.4 0 0 0 22.46 6z" />
            </svg>
          </a>

          <a
            href="https://www.instagram.com/_sharmin_akter_0s/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:text-white"
          >
            <svg
              className="w-6 h-6 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-5 2a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
            </svg>
          </a>
          </div>
        </div>
      </div>

      <div className='w-11/12 mx-auto text-green-300 my-4'><hr /></div>

      <p className="text-center text-sm mt-4 text-gray-500">
        &copy; {new Date().getFullYear()} FoodBridge. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;

