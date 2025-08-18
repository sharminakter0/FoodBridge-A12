import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import useAuth from '../../../Hooks/UseAuth';
import GoogleLogin from '../GoogleLogin/GoogleLogin';
import axios from 'axios'; 
import toast from 'react-hot-toast';
import { updateProfile } from 'firebase/auth';
import BackHomebutton from '../../../Component/BackHomebutton/BackHomebutton';


const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { createUser  } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
  const imageFile = data.image[0]; // get uploaded file
  const formData = new FormData();
  formData.append('image', imageFile);

  const imgbbAPI =`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_ImageKey}`;


  try {
    const imgbbRes = await axios.post(imgbbAPI, formData);
    if (imgbbRes.data.success) {
      const imageUrl = imgbbRes.data.data.url;

      // Create user in Firebase
      const result = await createUser(data.email, data.password);
      const createdUser = result.user;
      


      await updateProfile(result.user, {
         displayName: data.name,
       photoURL: imageUrl
      });
      // Save user to database
      const saveUser = {
        name: data.name,
        email: data.email,
        photoURL: createdUser.photoURL || '',
        role: 'user',
        createdAt: new Date(), 
      };

      await axios.post(`https://food-donation-server-mu.vercel.app/users/${data.email}`, saveUser);
      toast.success("Account created successfully!");
      navigate('/');
    }
  } catch (error) {
    console.error(error);
    toast.error("Registration failed.");
  }
};



  

 

  return (
    <div className="card bg-base-100 w-full max-w-md shrink-0 shadow-2xl mx-auto mt-10 text-center items-center">
      <div className="card-body">

        <BackHomebutton></BackHomebutton>
        <h1 className="text-3xl font-bold  bg-gradient-to-r from-blue-600 to-blue-300 bg-clip-text text-transparent text-center">Create An New Account</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset space-y-3">
            {/* Name field */}
            <label className="label">Your Name</label>
            <input
              type="text"
              {...register('name', { required: true })}
              className="input input-bordered"
              placeholder="Your Name"
            />
            {errors.name && <p className="text-red-500">Name is required</p>}

            {/* Profile Image Upload */}
            <label className="label">Profile Picture</label>
            <input
              type="file"
              accept="image/*"
              {...register('image',{required:true})}
              
              className="file-input file-input-bordered w-full"
            />
            {errors.image && <p className="text-red-500">Profile image is required</p>}

            {/* Email field */}
            <label className="label">Email</label>
            <input
              type="email"
              {...register('email', { required: true })}
              className="input input-bordered"
              placeholder="Email"
            />
            {errors.email && <p className="text-red-500">Email is required</p>}

            {/* Password field */}
            <label className="label">Password</label>
            <input
              type="password"
              {...register('password', {
                required: true,
                minLength: {
                   value: 6,
                   message: 'Password must be at least 6 characters'
                } ,
                pattern: {
                   value: /^(?=.*[A-Z])(?=.*[!@#$%^&*])/,
                   message: 'Password must include one capital letter and one special character'
    }

              },


            )}
              className="input input-bordered"
              placeholder="Password"
            />
            
            {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
              )}
          

            <button type="submit" className="btn bg-gradient-to-r from-blue-500 to-green-400 text-black w-full mt-2">Register</button>
          </fieldset>

          <p className="mt-4 text-sm text-center">
            Already have an account?
            <Link to="/login" className="btn btn-link p-0 underline text-blue-500 ml-1">Login</Link>
          </p>
          <GoogleLogin></GoogleLogin>

        </form>
        
       
      </div>
    </div>
  );
};

export default Register;
