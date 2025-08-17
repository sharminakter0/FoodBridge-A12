import React from "react";
import { Link } from "react-router"; 
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const slides = [
  {
    img: "https://i.ibb.co.com/d0N1k0Zw/gettyimages-1498170916-612x612.jpg",
    title: "Share a Meal, Spread Hope",
    desc: "Donate surplus food to those in need and help reduce food waste in your community. Together, we can fight hunger with kindness.",
    btnText: "Contact Us",
    btnLink: "/contact",
  },
  {
    img: "https://i.ibb.co.com/5XmgYwmQ/group-people-volunteering-foodbank-poor-people.jpg",
    title: "Empower Charities, Empower Communities",
    desc: "Support local charities by donating food directly through our platform. Together, we ensure no plate goes empty and every act of kindness reaches those who need it most.",
    btnText: "Latest Charity",
    btnLink: "",
  },
  {
    img: "https://i.ibb.co.com/ch4DDbQ1/smiley-female-volunteer-holding-box-with-food-donations.jpg",
    title: "Turning Waste into Wonder",
    desc: "Give your leftover food a second life by donating it to families in need. Be a part of building a sustainable and caring future.",
    btnText: "About Us",
    btnLink: "/about",
  },
];

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2500,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className="bg-gradient-to-r from-green-300 via-green-200 to-blue-200 rounded-3xl  shadow-lg  ">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="">
            <div className="hero min-h-[70vh] px-15   ">
              <div className="hero-content flex-col lg:flex-row-reverse gap-20">
                <motion.img
                  src={slide.img}
                  className="max-w-sm w-full lg:h-60  h-40   rounded-br-[40px] border-2 border-blue-300  rounded-lg shadow-2xl"
                  alt={slide.title}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                />

                {/* text section */}
                <div className="text-center lg:text-left">
                  <motion.h1
                    className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-700 to-blue-400 bg-clip-text text-transparent mb-4"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    {slide.title}
                  </motion.h1>
                  <motion.p
                    className="py-4 text-black"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    {slide.desc}
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                  >
                    <Link to={slide.btnLink} className=" bg-gradient-to-r  from-blue-700 to-blue-400 font-bold text-white btn mt-2">
                      {slide.btnText}
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
