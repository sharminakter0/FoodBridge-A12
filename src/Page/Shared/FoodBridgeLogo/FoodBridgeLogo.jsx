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
                <h2 className="text-2xl font-extrabold bg-gradient-to-r from-blue-700 to-green-500 bg-clip-text text-transparent">
              FoodBridge
            </h2>
            </div>
        </Link>
    );
};

export default FoodBridgeLogo;