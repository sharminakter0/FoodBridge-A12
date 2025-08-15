import React from 'react';

const ContactPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center text-green-700 mb-6">
        Contact Us
      </h1>

      <p className="text-center text-gray-600 mb-10">
        We'd love to hear from you! Whether you have questions, suggestions, or want to partner with us—reach out below.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact Info */}
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-green-600">📍 Address</h2>
            <p className="text-gray-600">123 Food Rescue Lane, Barishal, Bangladesh</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-green-600">📞 Phone</h2>
            <p className="text-gray-600">+880 1234 567890</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-green-600">📧 Email</h2>
            <p className="text-gray-600">support@foodbridge.org</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-green-600">🔗 Social</h2>
            <div className="flex gap-4 mt-2">
              <a href="#" className="text-blue-600 hover:underline">Facebook</a>
              <a href="#" className="text-sky-500 hover:underline">Twitter</a>
              <a href="#" className="text-pink-500 hover:underline">Instagram</a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form className="space-y-4">
          <div>
            <label className="block font-medium text-gray-700">Your Name</label>
            <input type="text" className="input input-bordered w-full" required />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Your Email</label>
            <input type="email" className="input input-bordered w-full" required />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Message</label>
            <textarea className="textarea textarea-bordered w-full h-28" required />
          </div>
          <button type="submit" className="btn btn-success w-full">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
