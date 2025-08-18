import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const CommunityStories = () => {
  const [stories, setStories] = useState([]);

  const fallbackStories = [
    {
      name: 'Hope Foundation',
      role: 'Charity',
      image: '/download (1).jpg',
      story:
        'Thanks to food donations, we’ve been able to feed over 500 families in our region during tough times.',
    },
    {
      name: 'Green Bites Restaurant',
      role: 'Restaurant',
      image: '/images (1).jpg',
      story:
        'Donating surplus meals daily helped us reduce waste and make a real difference in our neighborhood.',
    },
  ];

  const fetchStories = () => {
    axios
      .get('https://food-donation-server-mu.vercel.app/community-stories')
      .then((res) => {
        if (res.data.length > 0) setStories(res.data);
        else setStories([]);
      })
      .catch((err) => {
        console.error(err);
        setStories([]);
      });
  };

  const postSeedData = async () => {
    try {
      for (const story of fallbackStories) {
        await axios.post('https://food-donation-server-mu.vercel.app/community-stories', story);
      }
      alert('Sample stories added successfully!');
      fetchStories(); // refresh after post
    } catch (error) {
      alert('Failed to add stories.');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  return (
    <div className="pt-8 pb-16">
      <motion.h2
        className="text-3xl font-bold text-center bg-gradient-to-r from-green-500 to-blue-400 bg-clip-text text-transparent mb-4"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        Community Stories
      </motion.h2>

      <motion.p
        className="text-sm text-center mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        Our community stories highlight the power of unity, kindness, and collaboration. <br />
        Every act of giving creates a ripple of change that inspires others to join and make a difference
      </motion.p>

      {stories.length === 0 && (
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <p className="text-gray-600">No stories found. Add sample data below.</p>
          <button
            onClick={postSeedData}
            className="mt-3 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Add Sample Stories
          </button>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {stories.map((story, idx) => (
          <motion.div
            key={story._id || idx}
            className="bg-blue-100   p-6 rounded-lg shadow-md flex items-start gap-4"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: idx * 0.2 }}
            viewport={{ once: true }}
          >
            <img
              src={story.image}
              alt={story.name}
              className="w-24 h-24 object-cover rounded-full border-2 border-green-300"
            />
            <div>
              <h3 className="text-xl font-semibold text-blue-700">{story.name}</h3>
              <p className="text-sm text-gray-500 mb-2">{story.role}</p>
              <p className="text-gray-700 italic">“{story.story}”</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CommunityStories;
