import React from 'react';
import logo from "../../../assets/Lottie/z7Jq68njio.json"
import { Link } from 'react-router';
import Lottie from 'lottie-react';
const FoodBridgeLogo = () => {
    return (
       <Link to="/">
       <div className='flex gap-0 items-center'>
          <Lottie animationData={logo}
     loop={true}
     className="w-6 md:w-9 mx-auto  gap-0 ">

               </Lottie>
                <p className='text-xl md:text-2xl -ml-1 bg-gradient-to-r from-blue-700 to-blue-400 bg-clip-text text-transparent font-extrabold'> FoodBridge</p>
            </div>
        </Link>
    );
};

export default FoodBridgeLogo;