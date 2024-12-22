import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Slider.css";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const Slider = () => {
  const images = [
    "https://gokpinargolu.com/depo/galeri/09.jpg",
    "https://gurunaktasotel.com/depo/gorseller2/10.jpg",
    "https://i.ytimg.com/vi/RlxjH4SgYi8/maxresdefault.jpg",
    "https://pbs.twimg.com/media/Bu1aMb-IEAAPngQ.jpg:large",
  ];

  const slides = images.map((image, index) => (
    <SwiperSlide key={index}>
      <img src={image} alt="slider" />
    </SwiperSlide>
  ));

  return (
    <section className="home-slider">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        loop={true}
        // navigation={true}
        slidesPerView={1}
        navigation={{
          prevEl: ".swiper-button-prev1",
          nextEl: ".swiper-button-next1",
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
      >
        {slides}
        <div className="swiper-button-prev1">
          <LeftOutlined />
        </div>
        <div className="swiper-button-next1">
          <RightOutlined />
        </div>
      </Swiper>
    </section>
  );
};

export default Slider;
