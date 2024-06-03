import React from 'react';
import styles from './css/MovieDetails.module.css';

const MovieDetails = ({ movieData, videos }) => {
  const handleVideoClick = (key) => {
    window.open(`https://www.youtube.com/embed/${key}`, '_blank');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.sub_title}>Introdution</h1>

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
              <button key={index} onClick={() => handleVideoClick(video.key)}>
                Video {index + 1}
              </button>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
};

export default MovieDetails;
