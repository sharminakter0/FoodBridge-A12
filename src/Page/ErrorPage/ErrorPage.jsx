import React from 'react';
import { Link } from 'react-router';
import error from '../../assets/Lottie/Error 404.json'
import Lottie from 'lottie-react';

const ErrorPage = () => {
    return (
        <div className='text-center my-40'>
         <Lottie
      animationData={error}
     loop={true}
     className="w-72 md:w-96 mx-auto  gap-0">
           
            
            </Lottie>   
       
      <p className="text-xl text-gray-700 mb-6">Oops! The page you're looking for doesn't exist.</p>
      <Link to="/"><button className='btn className="btn bg-gradient-to-r from-[#07ac18] to-[#b3e917]">Back to Home'>Back to Home</button></Link> 
        
        </div>
    );
};

export default ErrorPage;