import React from 'react';
import logo from "../../../assets/logo (3).png"
import { Link } from 'react-router';
const FoodBridgeLogo = () => {
    return (
       <Link to="/">
       <div className='flex items-center'>
                <img className='mb-2 size-8' src={logo} alt="" />
                <p className='text-2xl -ml-1 bg-gradient-to-r from-[#07ac18] to-[#b3e917] bg-clip-text text-transparent font-extrabold'> FoodBridge</p>
            </div>
        </Link>
    );
};

export default FoodBridgeLogo;