import React, { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import styles from './SliderComponent.module.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './custom-slick.css';
import TmdbDataPull from "./TmdbDataPull";

const SliderComponent = () => {
    const { movies } = TmdbDataPull();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [displayText, setDisplayText] = useState({ title: "", overview: "" });
    const [isVisible, setIsVisible] = useState(true);
    const typingTimeout = useRef(null);
    const typingInterval = useRef(null);
    const typingSpeed = 30;

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 20000,
        beforeChange: (oldIndex, newIndex) => {
            setIsVisible(false);
            if (typingTimeout.current) {
                clearTimeout(typingTimeout.current);
            }
            if (typingInterval.current) {
                clearInterval(typingInterval.current);
            }
        },
        afterChange: (index) => {
            setCurrentIndex(index);
        }
    };

    const typeText = (text, isTitle) => {
        let display = "";
        let index = 0;
        typingInterval.current = setInterval(() => {
            display += text[index];
            if (isTitle) {
                setDisplayText((prev) => ({ ...prev, title: display }));
            } else {
                setDisplayText((prev) => ({ ...prev, overview: display }));
            }
            index++;
            if (index === text.length) {
                clearInterval(typingInterval.current);
                setIsVisible(true);
            }
        }, typingSpeed);
    };

    useEffect(() => {
        if (movies.length > 0) {
            const currentMovie = movies[currentIndex];
            const title = currentMovie.title || "Movie!";
            const overview = currentMovie.overview || "contents";

            setDisplayText({ title: "", overview: "" });

            if (typingTimeout.current) {
                clearTimeout(typingTimeout.current);
            }
            if (typingInterval.current) {
                clearInterval(typingInterval.current);
            }

            typingTimeout.current = setTimeout(() => {
                typeText(title, true);
                typingTimeout.current = setTimeout(() => {
                    typeText(overview, false);
                }, title.length * typingSpeed);
            }, 200);
        }
    }, [currentIndex, movies]);

    return (
        <div className={styles.sliderContainer}>
            <div className="slider-container1">
                <h1 className={`${styles.movie_title} ${isVisible ? '' : styles.hidden}`}>{displayText.title}</h1>
            </div>
            <div className="slider-container2">
                <p className={`${styles.movie_contents} ${isVisible ? '' : styles.hidden}`}>{displayText.overview}</p>
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
