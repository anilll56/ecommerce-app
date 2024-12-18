import React, { useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/navigation';

import './style.scss'
import { Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import ProductCard from '../common/ProductCard';
// fontawesome chevron icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'


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
                    slidesPerView={5.3}
                    navigation={true}
                    breakpoints={{
                        576: {
                            slidesPerView: 3.3,
                        },
                        768: {
                            slidesPerView: 4.3,
                        },
                        992: {
                            slidesPerView: 5.3,
                        },
                    }}
                    modules={[Navigation]}
                >
                    {products.map((product, index) => (
                        <SwiperSlide key={index}>
                            <ProductCard product={product} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}

export default ProductSlider