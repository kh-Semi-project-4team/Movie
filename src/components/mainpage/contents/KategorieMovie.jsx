import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './css/KategorieMovie.module.css';

export default function KategorieMovie() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NzllZWUzZDc2ZWYwNzc2YzdjNWU4NzhlZGU0Y2ZiYSIsInN1YiI6IjY2NTQ3OWY5MjRhYWUyMmQxNDA2YWU0MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IroFQnlLfL2sSmvWkWAfFe8twYdSUZSoCGd_DN5V2iQ'
    }
  };

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/genre/movie/list?language=ko', options)
      .then(response => response.json())
      .then(data => {
        const selectedGenres = data.genres.filter(genre =>
          ['공포', '애니메이션', '로맨스', '모험'].includes(genre.name)
        );
        setGenres(selectedGenres);
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/movie/now_playing?language=ko-KR', options)
      .then(response => response.json())
      .then(data => {
        setMovies(data.results.slice(0, 15)); 
      })
      .catch(err => console.error(err));
  }, []);
  
  const handleGenreClick = (genreId) => {
    setSelectedGenre(genreId);
  };

  const filteredMovies = selectedGenre
    ? movies.filter(movie => movie.genre_ids.includes(selectedGenre))
    : movies;

  return (
    <div className={styles.container}>
      <div className={styles.genreButtons}>
        {genres.map(genre => (
          <button key={genre.id} onClick={() => handleGenreClick(genre.id)}>{genre.name}</button>
        ))}
      </div>
      <div className={styles.category}>
        <ul>
          {filteredMovies.map(movie => (
            <li key={movie.id}>
              <Link to={`/subpage/${movie.id}`}>
                <img className={styles.kategorieImg} src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} />
              </Link>
              <li className={styles.sub_title}>
                <Link to={`/subpage/${movie.id}`} onClick={() => sessionStorage.setItem('movieId', movie.id)} className={styles.kategorieTitle}>
                {movie.title}
              </Link>
              </li>
            </li>
          ))}
          
        </ul>
      </div>
    </div>
  );
}
