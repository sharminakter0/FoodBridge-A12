import React from 'react';
import arrow from "../../assets/right-arrow.png"
import { Link } from 'react-router';

const BackHomebutton = () => {
    return (
        <div className=''>
    <Link to="/" className='inline-block p-2 rounded-full border-2 border-gray-400 hover:border-blue-500 transition-colors duration-300"'><img src={arrow} alt="Back Home"className='size-8'></img> </Link> 
        </div>
    );
};

export default BackHomebutton;