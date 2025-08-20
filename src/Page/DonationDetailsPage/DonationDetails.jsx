import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import toast from "react-hot-toast";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import AllReviews from "../../Component/AllReviews";
import { motion } from "framer-motion";

const DonationDetails = () => {
  const { id } = useParams();
  const axiosSecure = UseAxiosSecure();
  const { user } = useContext(AuthContext);

  const { data: donation, isLoading, refetch } = useQuery({
    queryKey: ["donation", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donations/${id}`);
      return res.data;
    },
  });

  const [useRole, setUseRole] = useState("");

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`https://food-donation-server-mu.vercel.app/users/role/${user.email}`)
        .then((res) => setUseRole(res.data.role));
    }
  }, [user]);

  const handleSaveToFavorites = async () => {
    try {
      await axiosSecure.post("/favorites", {
        donationId: donation._id,
        userEmail: user.email,
      });
      toast.success("Saved to favorites");
    } catch {
      toast.error("Failed to save");
    }
  };

  const handleRequestDonation = async (e) => {
    e.preventDefault();
    const form = e.target;
    const requestDescription = form.description.value;
    const pickupTime = form.pickupTime.value;

    const request = {
      donationTitle: donation.title,
      donationId: donation._id,
      restaurantName: donation.restaurantName,
      charityName: user.displayName,
      charityEmail: user.email,
      requestDescription,
      pickupTime,
      location: donation.location,
      status: "Pending",
    };

    try {
      await axiosSecure.post("/donation-requests", request);
      toast.success("Request submitted");
    } catch {
      toast.error("Request failed");
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
      donationTitle: donation.title,
    };

    try {
      await axiosSecure.post("/reviews", review);
      toast.success("Review added");
      form.reset();
      await refetch();
    } catch {
      toast.error("Review failed to submit");
    }
  };

  if (isLoading || !donation) return <p>Loading...</p>;

  return (
    <div className="w-11/12 mx-auto py-12">
      {/* Title */}
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent mb-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {donation.title}
      </motion.h2>

      {/* Image */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <img
          src={donation.image}
          alt={donation.title}
          className="w-full h-80 md:h-[450px] object-cover rounded-2xl shadow-lg"
        />
      </motion.div>

      {/* Donation Info */}
      <motion.div
        className="bg-base-100 p-6 rounded-2xl shadow-md space-y-3"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-blue-700 text-2xl font-semibold">Details</h1>
        <p><strong>Food Type:</strong> {donation.foodType}</p>
        <p><strong>Quantity:</strong> {donation.quantity}</p>
        <p><strong>Restaurant:</strong> {donation.restaurantName}</p>
        <p><strong>Location:</strong> {donation.location}</p>
        <p><strong>Pickup Time:</strong> {donation.pickupTime}</p>
        <p><strong>Status:</strong> {donation.status}</p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 mt-6">
          {useRole === "user" && (
            <button
              onClick={handleSaveToFavorites}
              className="btn btn-outline border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition rounded-xl"
            >
              Save to Favorites
            </button>
          )}
          {useRole === "charity" && (
            <>
              <button
                onClick={() => document.getElementById("requestModal").showModal()}
                className="btn bg-green-500 text-white rounded-xl"
              >
                Request Donation
              </button>
              <button
                onClick={async () => {
                  await axiosSecure.put(`/donations/${donation._id}/pickup-confirm`);
                  toast.success("Donation marked as picked up");
                }}
                className="btn bg-blue-500 text-white rounded-xl"
              >
                Confirm Pickup
              </button>
            </>
          )}
        </div>
      </motion.div>

      {/* Reviews */}
      <motion.div
        className="mt-12 bg-base-300 p-6 rounded-2xl shadow-md"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-xl font-semibold mb-4 text-blue-500">Reviews</h3>
        {(donation.reviews || []).map((review) => (
          <div key={review._id} className="p-3 mb-3 border rounded-lg">
            <p className="font-semibold">{review.reviewerName}</p>
            <p className="text-yellow-500">⭐ {review.rating}/5</p>
            <p className="text-gray-600">{review.description}</p>
          </div>
        ))}
        {useRole === "user" && (
          <button
            onClick={() => document.getElementById("reviewModal").showModal()}
            className="btn btn-outline border-green-400 text-green-400 mt-4 rounded-xl"
          >
            Add Review
          </button>
        )}
      </motion.div>

      {/* Modals */}
      {/* Request Modal */}
      <dialog id="requestModal" className="modal">
        <div className="modal-box rounded-2xl">
          <form onSubmit={handleRequestDonation} className="space-y-4">
            <h3 className="text-lg font-bold">Request Donation</h3>
            <input value={donation.title} readOnly className="input input-bordered w-full" />
            <input value={donation.restaurantName} readOnly className="input input-bordered w-full" />
            <input value={user?.displayName} readOnly className="input input-bordered w-full" />
            <input value={user?.email} readOnly className="input input-bordered w-full" />
            <textarea name="description" required placeholder="Why are you requesting this donation?" className="textarea textarea-bordered w-full" />
            <input type="datetime-local" name="pickupTime" required className="input input-bordered w-full" />
            <button type="submit" className="btn btn-outline bg-blue-600 text-white w-full rounded-xl">Submit Request</button>
          </form>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>

      {/* Review Modal */}
      <dialog id="reviewModal" className="modal">
        <div className="modal-box rounded-2xl">
          <form onSubmit={handleReview} className="space-y-4">
            <h3 className="text-lg font-bold">Add Review</h3>
            <textarea name="description" required className="textarea textarea-bordered w-full" placeholder="Write your review..." />
            <input type="number" name="rating" required min="1" max="5" className="input input-bordered w-full" />
            <button type="submit" className="btn btn-success w-full rounded-xl">Submit</button>
          </form>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>

      {/* All Reviews */}
      <AllReviews />
    </div>
  );
};

export default DonationDetails;
