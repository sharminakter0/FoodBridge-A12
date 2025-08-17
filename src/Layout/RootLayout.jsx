import React from 'react';
import Navbar from '../Page/Shared/Header/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Page/Shared/Footer';

const RootLayout = () => {
    return (
        <div className='bg-base-200'>
         <Navbar></Navbar>  
         <Outlet></Outlet> 
         <Footer></Footer>
        </div>
    );
};

export default RootLayout;