import React from "react";
import arrow from "../../assets/right-arrow.png";
import { Link } from "react-router";
import { motion } from "framer-motion";

const BackHomebutton = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.1, rotate: -10 }}
      whileTap={{ scale: 0.9, rotate: 10 }}
      className="inline-block"
    >
      <Link
        to="/"
        className="inline-block p-2 rounded-full border-2 border-gray-400 hover:border-blue-500 transition-colors  duration-300"
      >
        <img src={arrow} alt="Back Home" className="size-8" />
      </Link>
    </motion.div>
  );
};

export default BackHomebutton;
