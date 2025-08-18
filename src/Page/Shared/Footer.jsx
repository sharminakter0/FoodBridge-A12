import React from "react";
import { NavLink } from "react-router"; // ✅ fixed import
import logo from "../../assets/Lottie/z7Jq68njio.json";
import Lottie from "lottie-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-50 to-green-50 text-blue-800 py-10 mt-16 shadow-inner rounded-t-2xl">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Brand Section */}
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
            <Lottie animationData={logo} loop={true} className="w-10 h-10" />
            <h2 className="text-2xl font-extrabold bg-gradient-to-r from-blue-700 to-green-500 bg-clip-text text-transparent">
              FoodBridge
            </h2>
          </div>
          <p className="text-sm text-gray-600 max-w-xs mx-auto md:mx-0">
            Connecting communities through food donations and kindness. Together,
            we make a difference.
          </p>
        </div>

        {/* Quick Links */}
        <div className="text-center">
          <h3 className="font-bold text-lg mb-4">Quick Links</h3>
          <div className="flex flex-col gap-2">
            {[
              { name: "Home", path: "/" },
              { name: "All Donation", path: "/all-donation" },
              { name: "About", path: "/about" },
              { name: "Contact", path: "/contact" },
            ].map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-700 font-semibold underline"
                    : "hover:text-green-600 transition"
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Social Media */}
        <div className="text-center md:text-right">
          <h3 className="font-bold text-lg mb-4">Follow Us</h3>
          <div className="flex justify-center md:justify-end gap-4">
            {[
              {
                href: "https://www.facebook.com/sharminakter0s",
                label: "Facebook",
                svg: (
                  <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H8v-3h2.4V9.5a3.3 3.3 0 0 1 3.5-3.6 14.4 14.4 0 0 1 2 .2v2.3h-1a1.3 1.3 0 0 0-1.5 1.4v1.7h2.6l-.4 3h-2.2v7A10 10 0 0 0 22 12z" />
                ),
              },
              {
                href: "https://x.com/SharminAkt79722",
                label: "Twitter",
                svg: (
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.3 4.3 0 0 0 1.88-2.37 8.5 8.5 0 0 1-2.7 1.03 4.3 4.3 0 0 0-7.3 3.9 12.2 12.2 0 0 1-8.9-4.5 4.3 4.3 0 0 0 1.34 5.7 4.25 4.25 0 0 1-1.95-.54v.05a4.3 4.3 0 0 0 3.45 4.2 4.3 4.3 0 0 1-1.95.07 4.3 4.3 0 0 0 4 3 8.6 8.6 0 0 1-5.3 1.8A8.8 8.8 0 0 1 2 18.15 12.15 12.15 0 0 0 8 20c7.55 0 11.7-6.26 11.7-11.7v-.53A8.4 8.4 0 0 0 22.46 6z" />
                ),
              },
              {
                href: "https://www.instagram.com/_sharmin_akter_0s/?hl=en",
                label: "Instagram",
                svg: (
                  <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-5 2a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
                ),
              },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="p-2 rounded-full bg-white shadow hover:scale-110 hover:bg-green-100 transition"
              >
                <svg
                  className="w-5 h-5 fill-current text-blue-700"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  {social.svg}
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mt-8 w-11/12 mx-auto h-[1px] bg-gradient-to-r from-blue-400 via-green-400 to-blue-400" />

      {/* Bottom text */}
      <p className="text-center text-sm mt-6 text-gray-600">
        &copy; {new Date().getFullYear()} FoodBridge. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
