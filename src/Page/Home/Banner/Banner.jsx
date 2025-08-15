import React from 'react';

import banner1 from '../../../assets/Banner1.png'
import banner2 from '../../../assets/Banner2.png'
import banner3 from '../../../assets/Banner3.jpg'

import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
const Banner = () => {
    return (
        <Carousel
         autoPlay={true} infiniteLoop={true} showThumbs={false} className='py-7
         '
        >
                <div className='h-100 md:h-130 '>
                    <img className='mx-w-auto h-100 md:h-130 rounded-2xl' src={banner1} />
                   
                    
                  
                </div>
                <div className=' h-100 md:h-130 '>
                    <img className=' 
                     mx-w-auto h-100 md:h-130 rounded-2xl' src={banner2} />
                 
                </div>
                <div className='h-100 md:h-130 '>
                    <img className='h-100 md:h-130 mx-w-auto rounded-2xl' src={banner3} />
                   
                </div>
            </Carousel>
    );
};

export default Banner;