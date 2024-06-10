import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Home.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';

import pic1 from '../Assets/pic1.png';
import pic2 from '../Assets/pic2.jpg';
import pic3 from '../Assets/pic3.jpg';
import pic4 from '../Assets/pic4.jpg';
import pic5 from '../Assets/pic5.jpg';
import pic6 from '../Assets/pic6.jpg';
import pic7 from '../Assets/pic7.jpg';

function Home() {
  const [slidesPerView, setSlidesPerView] = useState(3);
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSlidesPerView(1);
      } else if (window.innerWidth < 992) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(3);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSlideClick = (route) => {
    if (isLoggedIn) {
      navigate(route);
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="home">
      <section className="home1">
        <div className="tit1">
          <h1>One stop place to all the Telugu tastes</h1>
          <p>Amma, avakai eppatiki bore kottav</p>
        </div>
        <div className="lefhom1">
          <img src={pic2} alt="pic2" />
          <img src={pic1} alt="pic1" />
          <img src={pic3} alt="pic3" />
        </div>
      </section>
      <section className='home2'>
        <h1>About Avakai</h1>
        <h2>Welcome to our website, the ultimate destination for Telugu food enthusiasts! Our platform is like Instagram, but exclusively for Telugu recipes. Here, you can share your secret Telugu dishes that are special to you and showcase them to the world. Join our community of food lovers, and let your unique recipes take center stage as you inspire others with the rich and diverse flavors of Telugu cuisine. Whether you're a seasoned chef or a passionate home cook, our site is the perfect place to share your culinary masterpieces and connect with fellow food aficionados.</h2>
      </section>
      <section className='home3'>
        <h1>Our Products</h1>
        <div className='homerecipes'>
          <Swiper
            slidesPerView={slidesPerView}
            spaceBetween={30}
            loop={true}
            speed={1500}
            centeredSlides ={true}
            modules={[Autoplay]}
            className="mySwiper"
          >
            <SwiperSlide onClick={() => handleSlideClick('/tiffins')}>
              <div className='swiper1'>
                <img src={pic4} alt='pic4'/>
                Tiffin Recipes
              </div>
            </SwiperSlide>
            <SwiperSlide onClick={() => handleSlideClick('/riceitems')}>
              <div className='swiper1'>
                <img src={pic5} alt='pic5'/>
                <br/>
                  Rice Recipes
              </div>
            </SwiperSlide>
            <SwiperSlide onClick={() => handleSlideClick('/curries')}>
              <div className='swiper1'>
                <img src={pic6} alt='pic6'/>
                Curry Recipes
              </div>
            </SwiperSlide>
            <SwiperSlide onClick={() => handleSlideClick('/snacks')}>
              <div className='swiper1'>
                <img src={pic7} alt='pic7'/>
                Snack Recipes
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>
    </div>
  );
}

export default Home;
