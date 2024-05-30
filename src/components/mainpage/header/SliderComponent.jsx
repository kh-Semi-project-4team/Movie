import React from "react";
import Slider from "react-slick";
import styles from './SliderComponent.module.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './custom-slick.css'

const SliderComponent = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 20000
    };
    return (
        <div className={styles.sliderContainer}>
            <h1 className="movie_title">Movie!</h1>
            <Slider {...settings}>
                <div className={styles.slide}>
                    <img src="/image/Slider_1.jpg" className="img_1"/>
                </div>
                <div className={styles.slide}>
                    <h3>2</h3>
                </div>
                <div className={styles.slide}>
                    <h3>3</h3>
                </div>
                <div className={styles.slide}>
                    <h3>4</h3>
                </div>
                <div className={styles.slide}>
                    <h3>5</h3>
                </div>
                <div className={styles.slide}>
                    <h3>6</h3>
                </div>
            </Slider>
        </div>
    );
};

export default SliderComponent;
