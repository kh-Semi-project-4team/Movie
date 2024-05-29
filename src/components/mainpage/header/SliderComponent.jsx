import React from "react";
import Slider from "react-slick";
import styles from './SliderComponent.module.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const SliderComponent = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
    };
    return (
        <div className={styles.sliderContainer}>
            <h2>Single Item</h2>
            <Slider {...settings}>
                <div className={styles.slide}>
                    <h3>1</h3>
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
