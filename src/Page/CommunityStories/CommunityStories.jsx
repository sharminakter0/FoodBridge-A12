import { useEffect, useState } from 'react';
import axios from 'axios';

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
      .get('http://localhost:3000/community-stories')
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
        await axios.post('http://localhost:3000/community-stories', story);
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
    <div className="bg-white py-12 px-4 md:px-10 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-green-800 mb-6">Community Stories</h2>

      {stories.length === 0 && (
        <div className="text-center mb-6">
          <p className="text-gray-600">No stories found. Add sample data below.</p>
          <button
            onClick={postSeedData}
            className="mt-3 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Add Sample Stories
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {stories.map((story, idx) => (
          <div
            key={story._id || idx}
            className="bg-green-50 p-6 rounded-lg shadow-md flex items-start gap-4"
          >
            <img
              src={story.image}
              alt={story.name}
              className="w-24 h-24 object-cover rounded-full border-2 border-green-300"
            />
            <div>
              <h3 className="text-xl font-semibold text-green-700">{story.name}</h3>
              <p className="text-sm text-gray-500 mb-2">{story.role}</p>
              <p className="text-gray-700 italic">“{story.story}”</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityStories;
