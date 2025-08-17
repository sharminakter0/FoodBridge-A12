import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from '../../Hooks/UseAxiosSecure';

import toast from 'react-hot-toast';



import { use, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../Context/AuthContext';
import AllReviews from '../../Component/AllReviews';



const DonationDetails = () => {
  const { id } = useParams();
  const axiosSecure = UseAxiosSecure();
  const { user } = use(AuthContext);

  const { data: donation, isLoading,refetch } = useQuery({
    queryKey: ['donation', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donations/${id}`);
      return res.data;
    },
  });

//   const { data: userInfo = {} } = useQuery({
//   queryKey: ['userRole', user?.email],
//   queryFn: async () => {
//     const res = await axiosSecure.get(`/users/${user.email}`);
//     return res.data;
//   },
//   enabled: !!user?.email,
// });
// console.log("UserInfo:",userInfo)
 
  const [useRole,setUseRole] = useState('')

  useEffect(()=>{
  if (user?.email){
 axios.get(`https://food-donation-server-mu.vercel.app/users/role/${user.email}`)
  .then (res=> setUseRole(res.data.role))
  }
  },[user])


  const handleSaveToFavorites = async () => {
    try {
      await axiosSecure.post('/favorites', {
        donationId: donation._id,
        userEmail: user.email,
      });
      toast.success('Saved to favorites');
    } catch  {
      toast.error('Failed to save');
    }
  };

   

  const handleRequestDonation = async (e) => {
    e.preventDefault();
    const form = e.target;
    const requestDescription = form.description.value;
    const pickupTime = form.pickupTime.value;

    const request = {
      donationTitle:donation.
title,
      donationId: donation._id,
      restaurantName: donation.restaurantName,
      charityName: user.displayName,
      charityEmail: user.email,
      requestDescription,
      pickupTime,
      location,
     

      

      status: 'Pending',
    };

    try {
      await axiosSecure.post('/donation-requests', request);

      toast.success('Request submitted');
    } catch  {
      toast.error('Request failed');
    }
  };
    

       const handleReview = async (e) => {
  e.preventDefault();
  const form = e.target;
  const description = form.description.value;
  const rating = form.rating.value;




  const review = {
    donationId: donation._id,
    reviewerName: user.displayName,
    description,
    userEmail: user.email,
    rating: parseInt(rating),
    donationTitle:donation.title
  };

  try {
    await axiosSecure.post('/reviews', review);
    toast.success('Review added');
    form.reset();
    await refetch(); // Refresh the review list
  } catch  {
    toast.error('Review failed to submit');
  }
};


 
    


  
  if (isLoading || !donation) return <p>Loading...</p>;

  return (

    <>

   
    
    <div className="p-6 mt-10 max-w-4xl mx-auto bg-white rounded-xl shadow-md">
      <img src={donation.image} alt={donation.title} className="w-full rounded" />
      <h2 className="text-2xl font-bold mt-4">{donation.title}</h2>
      <p><strong>Food Type:</strong> {donation.foodType}</p>
      <p><strong>Quantity:</strong> {donation.quantity}</p>
      <p><strong>Restaurant:</strong> {donation.restaurantName}</p>
      <p><strong>Location:</strong> {donation.location}</p>
      <p><strong>Pickup Time:</strong> {donation.pickupTime}</p>
      <p><strong>Status:</strong> {donation.status}</p>

      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        { useRole === "user" &&
              <button onClick={handleSaveToFavorites} className="btn btn-outline">Save to Favorites</button>
        }
        

        {useRole === 'charity'  && (
          <button onClick={() => document.getElementById('requestModal').showModal()} className="btn btn-primary">
            Request Donation
          </button>
        )}

        {useRole === 'charity'  && (
          <button
            onClick={async () => {
              await axiosSecure.put(`/donations/${donation._id}/pickup-confirm`);

              toast.success('Donation marked as picked up');
            }}
            className="btn btn-success"
          >
            Confirm Pickup
          </button>
        )}
      </div>

      {/* Request Modal */}
      <dialog id="requestModal" className="modal">
        <div className="modal-box">
          <form onSubmit={handleRequestDonation} className="space-y-4">
            <h3 className="text-lg font-bold">Request Donation</h3>
            <input value={donation.title} readOnly className="input input-bordered w-full" />
            <input value={donation.restaurantName} readOnly className="input input-bordered w-full" />
            <input value={user?.displayName} readOnly className="input input-bordered w-full" />
            <input value={user?.email} readOnly className="input input-bordered w-full" />
            <textarea name="description" required placeholder="Why are you requesting this donation?" className="textarea textarea-bordered w-full" />
            <input type="datetime-local" name="pickupTime" className="input input-bordered w-full" required />
            <button type="submit" className="btn btn-primary w-full">Submit Request</button>
          </form>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>


      {/* Reviews Section */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2">Reviews</h3>
        {/* Map over donation.reviews here */}
        {(donation.reviews || []).map(review => (
          <div key={review._id} className="p-2 border-b">
            <p><strong>{review.reviewerName}</strong>: {review.rating}/5</p>
            <p>{review.description}</p>
         
          </div>
        ))}
        {useRole === "user" && (
          <button onClick={() => document.getElementById('reviewModal').showModal()} className="btn btn-outline mt-4">
            Add Review
          </button>
          
        )}
      </div>

      {/* Review Modal */}
      <dialog id="reviewModal" className="modal">
  <div className="modal-box">
    <form
      onSubmit={handleReview}
      className="space-y-4"
    >
      <h3 className="text-lg font-bold">Add Review</h3>
      <textarea name="description" required className="textarea textarea-bordered w-full" placeholder="Write your review..." />
      <input type="number" name="rating" required min="1" max="5" className="input input-bordered w-full" />
      <button type="submit" className="btn btn-success w-full">Submit</button>
    </form>
    <div className="modal-action">
      <form method="dialog">
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>

 <AllReviews/>

    </div>
    
   
    </>
  );
};

export default DonationDetails;
