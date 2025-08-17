import axios from 'axios';
import React from 'react';


const axiosSecure =axios.create({
    baseURL: 'https://food-donation-server-mu.vercel.app',
  
})
const UseAxiosSequre = () => {
    return axiosSecure
        
};

export default UseAxiosSequre;