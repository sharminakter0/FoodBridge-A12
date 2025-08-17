import React from 'react';
import Swal from 'sweetalert2';

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
        form.reset(); // Clear form after submit
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
    <div className="w-11/12 mx-auto py-10">
      <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-green-500 to-blue-400 bg-clip-text text-transparent mb-6">
        Contact Us
      </h1>

      <p className="text-center mb-10">
        We'd love to hear from you! Whether you have questions, suggestions, or want to partner with us—reach out below.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact Info */}
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-blue-400">📍 Address</h2>
            <p className="text-gray-600">123 Food Rescue Lane, Barishal, Bangladesh</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-blue-400">📞 Phone</h2>
            <p className="text-gray-600">+880 1234 567890</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-blue-400">📧 Email</h2>
            <p className="text-gray-600">support@foodbridge.org</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-blue-400">🔗 Social</h2>
            <div className="flex gap-4 mt-2">
              <a href="#" className="text-blue-600 hover:underline">Facebook</a>
              <a href="#" className="text-sky-500 hover:underline">Twitter</a>
              <a href="#" className="text-pink-500 hover:underline">Instagram</a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium text-gray-700">Your Name</label>
            <input type="text" name="name" className="input input-bordered w-full" required />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Your Email</label>
            <input type="email" name="email" className="input input-bordered w-full" required />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Message</label>
            <textarea name="message" className="textarea textarea-bordered w-full h-28" required />
          </div>
          <button type="submit" className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-400 text-white border-2 mx-auto border-blue-400 w-full hover:shadow-md hover:shadow-blue-600">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
