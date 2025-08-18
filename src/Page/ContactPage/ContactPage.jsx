import React from "react";
import Swal from "sweetalert2";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const ContactPage = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const message = form.message.value;

    try {
      const res = await fetch("https://food-donation-server-mu.vercel.app/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (res.ok) {
        Swal.fire({
          title: "✅ Message Sent!",
          text: "Thank you for contacting us. We'll get back to you soon.",
          icon: "success",
          confirmButtonColor: "#3085d6",
        });
        form.reset();
      } else {
        Swal.fire({
          title: "❌ Failed!",
          text: "Something went wrong. Please try again later.",
          icon: "error",
        });
      }
    } catch {
      Swal.fire({
        title: "⚠️ Error!",
        text: "Failed to send message.",
        icon: "error",
      });
    }
  };

  return (
    <div className=" ">
      <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-green-500 to-blue-400 bg-clip-text text-transparent mb-6">
        Contact to Us
      </h1>

      <p className="text-center text-gray-500 max-w-2xl mx-auto mb-12">
        We'd love to hear from you! Whether you have questions, suggestions, or want to partner with us — reach out below.
      </p>

      <div className="grid md:grid-cols-2 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-blue-400 items-center">
        {/* Contact Info */}
        <div className="space-y-6 p-6">
          <div className="flex items-center gap-4">
            <FaMapMarkerAlt className="text-green-500 text-2xl" />
            <div>
              <h2 className="text-lg font-semibold ">Address</h2>
              <p className="">123 Food Rescue Lane, Barishal, Bangladesh</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <FaPhoneAlt className="text-blue-500 text-2xl" />
            <div>
              <h2 className="text-lg font-semibold ">Phone</h2>
              <p className="">+880 1234 567890</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <FaEnvelope className="text-red-500 text-2xl" />
            <div>
              <h2 className="text-lg font-semibold ">Email</h2>
              <p className="">support@foodbridge.org</p>
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold  mb-2">Follow Us</h2>
            <div className="flex gap-5 text-2xl">
              <a href="https://www.facebook.com/sharminakter0s" className="text-blue-600 hover:scale-110 transition"><FaFacebook /></a>
              <a href="https://x.com/SharminAkt79722" className="text-sky-500 hover:scale-110 transition"><FaTwitter /></a>
              <a href="https://www.instagram.com/_sharmin_akter_0s/" className="text-pink-500 hover:scale-110 transition"><FaInstagram /></a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-5  p-6 rounded-2xl ">
          <div>
            <label className="block font-medium  mb-1">Your Name</label>
            <input
              type="text"
              name="name"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>
          <div>
            <label className="block font-medium  mb-1">Your Email</label>
            <input
              type="email"
              name="email"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block font-medium  mb-1">Message</label>
            <textarea
              name="message"
              className="w-full border rounded-lg px-4 py-2 h-28 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold hover:shadow-lg hover:shadow-blue-300 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
