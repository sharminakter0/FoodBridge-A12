// src/pages/FrequentlyQuestions.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import image from "../../assets/food.webp";

const faqData = [
  {
    question: "How can I donate food?",
    answer:
      "Simply sign up, browse available donation requests, and select the one you’d like to contribute to. Our platform connects you directly with charities and communities in need.",
  },
  {
    question: "What motivates you to donate to our charity?",
    answer:
      "Explore the variety of volunteer opportunities available. From event planning and fundraising to fieldwork and administrative support, there are many ways to lend your talents. Find the perfect fit for your skills and interests.",
  },
  {
    question: "Can I donate money instead of food?",
    answer:
      "Of course! You can donate money, and we will purchase and deliver fresh meals or groceries to those in need on your behalf.",
  },
  {
    question: "Do I get notified after donation?",
    answer:
      "Yes, you will receive a confirmation email and a status update once your donation has been successfully delivered.",
  },
];

const FrequentlyQuestions = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="py-16 grid md:grid-cols-2 gap-10 items-center">
      {/* Left side image */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="flex justify-center"
      >
        <img
          src={image}
          alt="Food Donation"
          className="rounded-2xl shadow-lg w-full max-w-md"
        />
      </motion.div>

      {/* Right side FAQ */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-green-500 to-blue-400 bg-clip-text text-transparent">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="border border-blue-200 rounded-lg shadow-md bg-base-100 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-4 text-left"
              >
                <span className="font-semibold ">
                  {item.question}
                </span>
                <FaChevronDown
                  className={`transform transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="p-4 border-t bg-gray-50 text-gray-600">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default FrequentlyQuestions;
