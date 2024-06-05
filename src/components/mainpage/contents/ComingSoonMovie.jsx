import React from 'react';
import styles from './css/ComingSoonMovie.module.css';
import { Link } from 'react-router-dom';
import useTmdbDataPull from '../useTmdbDataPull';

export default function ComingSoonMovie() {
  const { comingSoonMovies } = useTmdbDataPull();

  return (
    <div className={styles.mainposter}>
      <header className={styles.section_title}>개봉예정영화</header>
      <div className={styles.flex_container}>
        {comingSoonMovies.map((movie, index) => (
          <div key={movie.id} className={styles.movie_container}>
            {index === 0 ? (
              <>
                <div className={styles.img_box}>
                  <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={movie.title} className={styles.img} />
                </div>
                <div className={styles.text_box}>
                  <div className={styles.text_container}>
                    <h3 className={styles.sub_title}>{movie.title}</h3>
                    <p className={styles.release_date}>{movie.release_date} Coming Soon! </p>
                    <p className={styles.sub_content}>{movie.overview}</p>
                    <Link to={`/subpage/${movie.id}`} onClick={() => sessionStorage.setItem('movieId', movie.id)} className={styles.Read_More_btn}>
                      Read More
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className={styles.text_box}>
                  <div className={styles.text_container}>
                    <h3 className={styles.sub_title}>{movie.title}</h3>
                    <p className={styles.release_date}>{movie.release_date} Coming Soon! </p>
                    <p className={styles.sub_content}>{movie.overview}</p>
                    <Link to={`/subpage/${movie.id}`} onClick={() => sessionStorage.setItem('movieId', movie.id)} className={styles.Read_More_btn}>
                      Read More
                    </Link>
                  </div>
                </div>
                <div className={styles.img_box}>
                  <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={movie.title} className={styles.img} />
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
