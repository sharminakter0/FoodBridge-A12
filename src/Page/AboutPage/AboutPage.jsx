import React from 'react';

const AboutPage = () => {
  return (
    <div className="bg-white py-10 px-4 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6 text-green-700">
        About FoodBridge
      </h1>

      <p className="text-gray-700 text-lg mb-6 text-center">
        FoodBridge is a community-driven food donation platform that connects restaurants, charities, and individuals to reduce food waste and feed those in need.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-2 text-green-600">🌍 Our Mission</h2>
          <p className="text-gray-600">
            Every year, tons of edible food go to waste while many people remain hungry. Our mission is to rescue surplus food from restaurants and redistribute it to local charities who serve people in need.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2 text-green-600">🤝 How It Works</h2>
          <ul className="list-disc list-inside text-gray-600">
            <li>🍽️ Restaurants list extra food items available for donation.</li>
            <li>🏢 Verified charities request available donations through the platform.</li>
            <li>👤 Users can explore donations, submit reviews, and request charity roles.</li>
            <li>🛡️ Admins manage users, verify donations, and feature urgent needs.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2 text-green-600">💡 Why It Matters</h2>
          <p className="text-gray-600">
            FoodBridge helps reduce food waste, supports local communities, and creates a more sustainable food system. Together, we can make a meaningful impact — one donation at a time.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2 text-green-600">📈 Our Impact</h2>
          <p className="text-gray-600">
            Since launching, we've helped redistribute thousands of meals, built partnerships with numerous restaurants and charities, and empowered individuals to contribute to a hunger-free future.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
