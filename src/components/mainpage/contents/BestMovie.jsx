import React from 'react';
import styles from './css/BestMovie.module.css';
import useTmdbDataPull from '../useTmdbDataPull';

function BestMovie() {
  const { movies } = useTmdbDataPull();

  const renderStars = (voteAverage) => {
    const fullStars = Math.floor(voteAverage / 2);
    const halfStar = voteAverage % 2 >= 1 ? 1 : 0;

    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<div key={i} className={styles.star}></div>);
    }
    return stars;
  };

  return (
    <div className={styles.mainposter}>
      <header className={styles.title1}>Best Movie!</header>
      <div className={styles.image}>
        {movies.slice(5, 10).map(movie => (
          <div key={movie.id} className={styles.imageTd}>
            <h3 className={styles.sub_title}>{movie.title}</h3>
            <a href={`https://www.themoviedb.org/movie/${movie.id}`}>
              <div className={styles.bestImgContainer}>
                <img className={styles.img} src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} />
                <div className={styles.else_container}>
                  <div className={styles.rating}>{renderStars(movie.vote_average)}</div>
                  <div className={styles.vote_count}>{(movie.vote_count)} Vote!</div>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BestMovie;
