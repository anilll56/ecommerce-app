import React, { useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

import './ProductSlider.css'
import { Navigation } from 'swiper/modules';
import Card from '../card/Card';


const ProductSlider = ({ title, products }) => {
    const editNavigation = () => {
        const navigation = document.querySelector('.swiper-button-next');
        navigation.innerHTML = '<FontAwesomeIcon icon={faChevronRight} />'
    }

    useEffect(() => {
        editNavigation()
    }, [])

    return (
        <div className="product-slider">
            <div className="container">
                <h2 className="product-slider__title">{title}</h2>
                <Swiper
                    spaceBetween={20}
                    slidesPerView={2.3}
                    navigation={true}
                    breakpoints={{
                        576: {
                            slidesPerView: 2.3,
                        },
                        768: {
                            slidesPerView: 3.3,
                        },
                        992: {
                            slidesPerView: 4.3,
                        },
                    }}
                    modules={[Navigation]}
                >
                    {products && products.map((product, index) => (
                        <SwiperSlide key={index}>
                            <Card Item={product} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}

export default ProductSlider