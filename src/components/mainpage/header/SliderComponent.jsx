import React from "react";
import Slider from "react-slick";
import styles from './SliderComponent.module.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './custom-slick.css'
import TmdbDataPull from "./TmdbDataPull";

const SliderComponent = () => {
    const { movies } = TmdbDataPull();

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 20000
    };

    const firstMovie = movies.length > 0 ? movies[0] : null;
    
    return (
        <div className={styles.sliderContainer}>
            <div className="slider-container">
                <h1 className="movie_title">Movie!</h1>
                <p className="movie_contents">contents</p>
            </div>
            <Slider {...settings}>
                {movies.map((movie, index) => (
                    <div key={index} className={styles.slide}>
                        <div className={styles.slide}>
                            <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} className="img_1" />
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default SliderComponent;
