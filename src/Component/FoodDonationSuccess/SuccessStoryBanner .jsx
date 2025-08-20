import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SuccessImage from "../../../public/gettyimages-1430371766-612x612.jpg"; // replace with your image path

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const SuccessStoryBanner = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Observer for scroll animation
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section
      ref={ref}
      className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-8 items-center bg-base-100 rounded-xl shadow-lg"
    >
      {/* Left side: Title & Description */}
      <motion.div
        className="space-y-6 w-full"
        variants={fadeInUp}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        transition={{ duration: 0.8 }}
      >
        <p className="text-green-400 font-semibold">Success Story</p>
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-700 to-blue-400 bg-clip-text text-transparent leading-tight">
          We Help Fellow Nonprofits Access <br /> The Funding Tools, Training
        </h2>
        <p className="max-w-lg text-sm md:text-base">
          Our secure online donation platform allows you to make contributions
          quickly and safely. Choose from various payment methods and set up
          one-time or recurring donations easily.
        </p>
        <button
          onClick={() => setIsOpen(true)}
          className="border border-blue-300 text-blue-700 px-6 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition"
        >
          Our Success Story &rarr;
        </button>
      </motion.div>

      {/* Right side: Image */}
      <motion.div
        className="w-full h-full"
        variants={fadeInUp}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <img
          src={SuccessImage}
          alt="Success Story"
          className="w-full border-2 border-green-300 rounded-xl shadow-lg object-cover"
        />
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-base-100 rounded-xl p-6 max-w-lg w-full shadow-xl relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-3 right-3 hover:text-black"
              >
                ✕
              </button>
              <h3 className="text-2xl font-bold mb-4">Our Success Story</h3>
              <p className="leading-relaxed text-sm md:text-base">
                We have successfully helped multiple nonprofits raise funds and
                reach more people. This platform empowers charities to grow,
                connect with donors, and continue their life-changing missions.
                Every contribution makes a huge difference, and we are proud to
                share the stories of resilience and impact.
              </p>
              <div className="mt-6">
                <img
                  src={SuccessImage}
                  alt="Success Story"
                  className="rounded-lg border-2 border-green-300 shadow-md"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default SuccessStoryBanner;
