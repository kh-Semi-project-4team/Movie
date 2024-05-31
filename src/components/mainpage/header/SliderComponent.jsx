import React, { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import styles from './css/SliderComponent.module.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './css/custom-slick.css';
import useTmdbDataPull from "./useTmdbDataPull";
import useTypingEffect from "./useTypingEffect";
import useVisibilityChange from "./useVisibilityChange";

const SliderComponent = () => {
    const { movies } = useTmdbDataPull(); // TMDB API로부터 영화 데이터를 가져오는 커스텀 훅
    const [currentIndex, setCurrentIndex] = useState(0); // 현재 슬라이드 인덱스를 저장하는 상태
    const [isVisible, setIsVisible] = useState(true); // 텍스트가 보이는지 여부를 저장하는 상태
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태를 저장하는 상태
    const [progress, setProgress] = useState(0); // 진행 바 상태를 저장하는 상태
    const sliderRef = useRef(null); // 슬라이더 컴포넌트에 대한 참조

    useVisibilityChange(sliderRef); // 슬라이더의 가시성 변화 감지

    useEffect(() => {
        if (movies.length > 0) {
            setIsLoading(false); // 영화 데이터가 로드되면 로딩 상태를 false로 설정
        }
    }, [movies]);

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 20000,
        beforeChange: () => {
            setIsVisible(false); // 슬라이드 변경 전 텍스트 숨기기
        },
        afterChange: (index) => {
            setCurrentIndex(index); // 현재 슬라이드 인덱스 업데이트
            setProgress((index + 1) / movies.length * 100); // 진행 바 업데이트
            setIsVisible(true); // 슬라이드 변경 후 텍스트 보이기
        }
    };

    const currentMovie = movies[currentIndex] || {}; // 현재 슬라이드에 표시할 영화 데이터
    const title = currentMovie.title || currentMovie.original_title || "Movie!"; // 현재 영화의 제목
    const overview = currentMovie.overview || "Contents"; // 현재 영화의 개요

    useEffect(() => {
        // 현재 영화 데이터와 관련된 정보 콘솔에 출력
        console.log("Current Movie:", currentMovie);
        console.log("Title:", title);
        console.log("Overview:", overview);
    }, [currentMovie, title, overview]);

    const displayText = useTypingEffect(title, overview, 60); // 타이핑 효과 적용

    return (
        <div className={styles.sliderContainer}>
            {isLoading ? (
                <div className={styles.loading}>
                    <p>Loading...</p> {/* 로딩 중일 때 표시 */}
                </div>
            ) : (
                <>
                    <div className="slider-container1">
                        <h1 className={`${styles.movie_title} ${isVisible ? '' : styles.hidden}`}>{displayText.title}</h1>
                        {/* 현재 영화 제목 표시 */}
                    </div>
                    <div className="slider-container2">
                        <p className={`${styles.movie_contents} ${isVisible ? '' : styles.hidden}`}>{displayText.overview}</p>
                        {/* 현재 영화 개요 표시 */}
                    </div>
                    <div className="slider-container3">
                        <a href="#" className={styles.watchBtn}>Watch</a>
                        {/* 서브 페이지 이동 */}
                    </div>
                    <Slider ref={sliderRef} {...settings}>
                        {movies.map((movie, index) => (
                            <div key={index} className={styles.slide}>
                                <div className={styles.slide}>
                                    <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} className="img_1" alt={movie.title} />
                                    {/* 슬라이드에 영화 배경 이미지 표시 */}
                                </div>
                            </div>
                        ))}
                    </Slider>
                    <div className={styles.progressContainer}>
                        <div className={styles.progressBar} style={{ width: `${progress}%` }}></div>
                        {/* 진행 바 표시 */}
                    </div>
                </>
            )}
        </div>
    );
};

export default SliderComponent;
