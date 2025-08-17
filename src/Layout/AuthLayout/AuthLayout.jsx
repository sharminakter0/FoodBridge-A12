import React from 'react';
import FoodBridgeLogo from '../../Page/Shared/FoodBridgeLogo/FoodBridgeLogo';
import Lottie from 'lottie-react';
import lottieanimation from '../../../src/assets/Lottie/Login.json'
import { Outlet } from 'react-router';


const AuthLayout = () => {
    return (
        <div className='py-12 w-11/12 mx-auto'>
           <div>
         
            </div> 
         <div className="hero-content flex-col lg:flex-row-reverse -gap-6">
                <div className='flex-1'>
                  <Lottie
                         animationData={lottieanimation}
                         loop={true}
                         className="w-72 md:w-96 mx-auto  gap-0">
                   
                  </Lottie>
                </div>
               
                <div className='flex-1  '>
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;