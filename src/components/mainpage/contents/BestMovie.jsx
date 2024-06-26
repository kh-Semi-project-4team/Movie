import React from 'react';
import styles from './css/BestMovie.module.css';
import useTmdbDataPull from '../useTmdbDataPull';
import { Link } from 'react-router-dom';

function BestMovie() {
  const { popularMovies, loading } = useTmdbDataPull();

  const renderStars = (voteAverage) => {
    const fullStars = Math.floor(voteAverage / 2);
    const hasHalfStar = (voteAverage / 2) % 1 >= 0.5;

    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<div key={i} className={styles.star}></div>);
    }
    if (hasHalfStar) {
      stars.push(<div key="half" className={styles.halfStar}></div>);
    }
    return stars;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!popularMovies || popularMovies.length === 0) {
    return <div>No popular movies available.</div>;
  }

  return (
    <div className={styles.mainposter}>
      <header className={styles.title1}>인기영화</header>
      <div className={styles.image}>
        {popularMovies.slice(5, 10).map(movie => (
          <div key={movie.id} className={styles.imageTd}>
            <h3 className={styles.sub_title}>
              <Link to={`/subpage/${movie.id}`} onClick={() => sessionStorage.setItem('movieId', movie.id)} className={styles.linkcus}>
                {movie.title}
              </Link>
            </h3>
            <Link to={`/subpage/${movie.id}`} onClick={() => sessionStorage.setItem('movieId', movie.id)} className={styles.linkcus}>
              <div className={styles.bestImgContainer}>
                <img className={styles.img} src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} />
                <div className={styles.else_container}>
                  <div className={styles.rating}>{renderStars(movie.vote_average)}</div>
                  <div className={styles.vote_count}>{movie.vote_count} Vote!</div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BestMovie;
