import React, { useState, useEffect } from "react";
import "./brands.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { getSellers } from "../../api/HandleApi";
import { Link } from "react-router-dom";
import { FaStore } from "react-icons/fa";


function Brands() {

  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    getSellers().then((res) => {
      setSellers(res.data);
    });
  }, []);

  return (
    <div className="brands">
      <div className="container">
        <Swiper
          slidesPerView={'auto'}
          spaceBetween={30}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false
          }}
        >
          {sellers.map((seller) => (
            <SwiperSlide key={seller._id}>
              <Link to={`/seller/${seller._id}`}>
                <div className="brand">
                  <FaStore className="brand-icon" />
                  <p>{seller.name}</p>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Brands;
