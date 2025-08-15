import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { AuthContext } from "../../../Context/AuthContext";
import UseAxiosSequre from "../../../Hooks/UseAxiosSecure";

const imageHostingKey = import.meta.env.VITE_ImageKey; 
const imageHostingURL = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const AddDonation = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = UseAxiosSequre();
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to add this donation?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, submit it!",
    });

    if (!confirm.isConfirmed) return;

    setUploading(true);

    // Upload image to imgbb
    const imageFile = data.image[0];
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const imgbbRes = await fetch(imageHostingURL, {
        method: "POST",
        body: formData,
      });
      const imgbbData = await imgbbRes.json();

      if (imgbbData.success) {
        const imageUrl = imgbbData.data.url;

        const donationData = {
          title: data.title,
          foodType: data.foodType,
          quantity: data.quantity,
          pickupTime: data.pickupTime,
          restaurantName: user?.displayName,
          restaurantEmail: user?.email,
          location: data.location,
          image: imageUrl,
          status: "Pending",
        };

        const res = await axiosSecure.post("/donations", donationData);

        if (res.data.insertedId || res.data.success) {
          toast.success("Donation submitted to database!");
          reset();
        } else {
          toast.error("Failed to save donation.");
        }
      } else {
        toast.error("Image upload failed.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error. Try again later.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md mt-8 mb-8">
      <h2 className="text-3xl font-bold mb-6 text-center  bg-gradient-to-r from-blue-600 to-blue-300 bg-clip-text text-transparent">Add Food Donation</h2>

      <p className="text-sm mb-7 text-center text-gray-500">Share your surplus food with local charities and communities in need. Fill out the form below to submit a donation. Every contribution helps reduce waste and make a meaningful difference.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          <div>
            <label className="label">Donation Title</label>
            <input
              type="text"
              placeholder="Surplus Pastries"
              className="input input-bordered w-full"
              {...register("title", { required: true })}
            />
            {errors.title && <span className="text-red-500 text-sm">Title is required</span>}
          </div>

          <div>
            <label className="label">Food Type</label>
            <select className="select select-bordered w-full" {...register("foodType", { required: true })}>
              <option value="">Select a type</option>
              <option value="Bakery">Bakery</option>
              <option value="Produce">Produce</option>
              <option value="Cooked Meals">Cooked Meals</option>
              <option value="Dairy">Dairy</option>
              <option value="Other">Other</option>
            </select>
            {errors.foodType && <span className="text-red-500 text-sm">Food type is required</span>}
          </div>

          <div>
            <label className="label">Quantity (kg or portions)</label>
            <input
              type="number"
              placeholder="10"
              className="input input-bordered w-full"
              {...register("quantity", { required: true, min: 1 })}
            />
            {errors.quantity && <span className="text-red-500 text-sm">Quantity is required</span>}
          </div>

          <div>
            <label className="label">Pickup Time Window</label>
            <input
              type="text"
              placeholder="5 PM - 7 PM"
              className="input input-bordered w-full"
              {...register("pickupTime", { required: true })}
            />
            {errors.pickupTime && <span className="text-red-500 text-sm">Pickup time is required</span>}
          </div>

          <div>
            <label className="label">Restaurant Name</label>
            <input
              type="text"
              className="input input-bordered w-full bg-gray-100"
              defaultValue={user?.displayName}
              readOnly
            />
          </div>

          <div>
            <label className="label">Restaurant Email</label>
            <input
              type="email"
              className="input input-bordered w-full bg-gray-100"
              defaultValue={user?.email}
              readOnly
            />
          </div>

          <div>
            <label className="label">Location</label>
            <input
              type="text"
              placeholder="123 Main St, City"
              className="input input-bordered w-full"
              {...register("location", { required: true })}
            />
            {errors.location && <span className="text-red-500 text-sm">Location is required</span>}
          </div>

          <div>
            <label className="label">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              className="file-input file-input-bordered w-full"
              {...register("image", { required: true })}
            />
            {errors.image && <span className="text-red-500 text-sm">Image is required</span>}
          </div>
        </div>

        <div className="text-center mt-6">
          <button type="submit" className="btn btn-success w-full" disabled={uploading}>
            {uploading ? "Uploading..." : "Add Donation"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDonation;
