import React, { useState, useEffect } from 'react';
import styles from './css/MovieDetails.module.css';
import useTypewriterEffect from './simpleTypingEffect';
import inCinemasNowGif from './img/InCinemasNow.gif';
import BoxOfficeRank from './BoxOfficeRank.jsx';
import useDailyBoxOffice from '../useKobisDailyBoxOffice';

const MovieDetails = ({ movieData, videos, onVideoClick }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const movieName = movieData.title;
  const { isMovieFound, loading, rankNum } = useDailyBoxOffice(movieName);//영화 이름 비교를 통해 데이터 호출
  const typewriterText = useTypewriterEffect(`한국 박스오피스 ${rankNum}위`, 100);

  const handlePopupOpen = (event) => {
    event.preventDefault();
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  useEffect(() => {
    console.log("isMovieFound:", isMovieFound);
    console.log("rankNum:", rankNum);
    console.log("typewriterText:", typewriterText);
  }, [isMovieFound, rankNum, typewriterText]);

  return (
    <div className={styles.container}>
      <h1 className={styles.sub_title}>소개</h1>
      {loading && <p>Loading...</p>}
      {!loading && (
        <div className={styles.details}>
          <img
            className={styles.poster}
            src={`https://image.tmdb.org/t/p/original${movieData.poster_path}`}
            alt={movieData.title}
          />
          <div className={styles.info}>
            <div className={styles.titleContainer}>
              <h1 className={styles.localTitle}>{movieData.title}</h1>
              <span className={styles.releaseYear}>({movieData.release_date.slice(0, 4)})</span>
              {isMovieFound && (
                <div className={styles.gifContainer}>
                  <img
                    src={inCinemasNowGif}
                    width="35"
                    height="35"
                    alt="현재 상영 중"
                  />
                  <button onClick={handlePopupOpen} className={styles.rankLink}>
                    <strong>{typewriterText}</strong>
                  </button>
                </div>
              )}
            </div>
            <h2 className={styles.originalTitle}>{movieData.original_title}</h2>
            <div className={styles.contents}>
              <p><strong>줄거리</strong><br />{movieData.overview}</p>
              <p><strong>장르</strong> {movieData.genres.map(genre => genre.name).join(', ')}</p>
              <p><strong>평점</strong> {movieData.vote_average}</p>
              <p><strong>평점 누적 수</strong> {movieData.vote_count}</p>
              <p><strong>월드 개봉일</strong> {movieData.release_date}</p>
            </div>
            <div className={styles.buttons}>
              {videos.slice(0, 2).map((video, index) => (
                <button key={index} onClick={() => onVideoClick(`https://www.youtube.com/embed/${video.key}`)}>
                  Video {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      {isPopupOpen && <BoxOfficeRank movieName={movieName} onClose={handlePopupClose} />}
    </div>
  );
};

export default MovieDetails;
