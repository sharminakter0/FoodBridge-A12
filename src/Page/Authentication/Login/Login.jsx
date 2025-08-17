import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../../Hooks/UseAuth';
import GoogleLogin from '../GoogleLogin/GoogleLogin';
import BackHomebutton from '../../../Component/BackHomebutton/BackHomebutton';


const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signIn } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from || '/';

    const onSubmit = data => {
        signIn(data.email, data.password)
            .then(result => {
                console.log(result.user);
                navigate(from);
            })
            .catch(error => console.log(error))
    }

    return (
        <div className="card bg-base-100 w-full max-w-md shrink-0 shadow-2xl items-center text-center">
            <div className="card-body">
                <div className='flex justify-center'>
      <BackHomebutton></BackHomebutton></div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-300 bg-clip-text text-transparent">Welcome to FoodBridge</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className="fieldset">

                        <label className="label">Email</label>
                        <input
                            type="email"
                            {...register('email')}
                            className="input" placeholder="Email" />


                        <label className="label">Password</label>
                        <input
                            type="password"
                            {...register('password', {
                                required: true,
                                minLength: 6
                            })}
                            className="input" placeholder="Password" />
                        {
                            errors.password?.type === 'required' && <p className='text-red-500'>Password is required</p>
                        }
                        {
                            errors.password?.type === 'minLength' && <p className='text-red-500'>Password Must be 6 characters or longer</p>
                        }

                        <div className='text-start'><a className="link link-hover">Forgot password?</a></div>

                        <button type='submit' className= "btn w-full  bg-[#b3e917] text-black mt-2">Login</button>
                    </fieldset>
                    <p><small>Create New Account<Link state={{ from }} className=" text-blue-600 ml-4 underline" to="/register">Register</Link></small></p>
                   <GoogleLogin></GoogleLogin>
                </form>
                 
            </div>
        </div>
    );
};

export default Login;