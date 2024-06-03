import React, { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import styles from './css/SliderComponent.module.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './css/custom-slick.css';
import useTmdbDataPull from "../useTmdbDataPull";
import useTypingEffect from "./useTypingEffect";
import useVisibilityChange from "./useVisibilityChange";
import { useNavigate } from "react-router-dom";

const SliderComponent = () => {
    const { movies } = useTmdbDataPull();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const sliderRef = useRef(null);
    const navigate = useNavigate();

    useVisibilityChange(sliderRef);

    useEffect(() => {
        if (movies.length > 0) {
            setIsLoading(false);
        }
    }, [movies]);

    const handleWatchClick = () => {
        const currentMovie = movies[currentIndex];
        if (currentMovie) {
            sessionStorage.setItem('movieId', currentMovie.id);
            navigate('/subpage');
        }
    };

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 20000,
        beforeChange: () => {
            setIsVisible(false);
        },
        afterChange: (index) => {
            setCurrentIndex(index);
            setProgress((index + 1) / Math.min(5, movies.length) * 100); // 진행 바 업데이트
            setIsVisible(true);
        }
    };

    const currentMovie = movies[currentIndex] || {};
    const title = currentMovie.title || currentMovie.original_title || "Movie!";
    const overview = currentMovie.overview || "Contents";

    const displayText = useTypingEffect(title, overview, 60);

    return (
        <div className={styles.sliderContainer}>
            {isLoading ? (
                <div className={styles.loading}>
                    <p>Loading...</p>
                </div>
            ) : (
                <>
                    <div className="slider-container1">
                        <h1 className={`${styles.movie_title} ${isVisible ? '' : styles.hidden}`}>{displayText.title}</h1>
                    </div>
                    <div className="slider-container2">
                        <p className={`${styles.movie_contents} ${isVisible ? '' : styles.hidden}`}>{displayText.overview}</p>
                    </div>
                    <div className="slider-container3">
                        <button className={styles.watchBtn} onClick={handleWatchClick}>Watch</button>
                    </div>
                    <Slider ref={sliderRef} {...settings}>
                        {movies.slice(0, 5).map((movie, index) => (
                            <div key={index} className={styles.slide}>
                                <div className={styles.slide}>
                                    <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} className="img_1" alt={movie.title} />
                                </div>
                            </div>
                        ))}
                    </Slider>
                    <div className={styles.progressContainer}>
                        <div className={styles.progressBar} style={{ width: `${progress}%` }}></div>
                    </div>
                </>
            )}
        </div>
    );
};

export default SliderComponent;
