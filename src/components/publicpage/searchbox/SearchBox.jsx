import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './css/SearchBox.module.css';

const SearchBox = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searchAttempted, setSearchAttempted] = useState(false);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setSearchAttempted(false); // Reset search state when input changes
  };

  const handleSearch = () => {
    setSearchAttempted(true);
    if (query.trim()) {
      fetchMovies(query);
    } else {
      setResults([]); // Clear results when no search keyword
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setSearchAttempted(true);
      if (query.trim()) {
        fetchMovies(query);
      } else {
        setResults([]); // Clear results when no search keyword
      }
    }
  };

  const fetchMovies = (searchQuery) => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NzllZWUzZDc2ZWYwNzc2YzdjNWU4NzhlZGU0Y2ZiYSIsInN1YiI6IjY2NTQ3OWY5MjRhYWUyMmQxNDA2YWU0MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IroFQnlLfL2sSmvWkWAfFe8twYdSUZSoCGd_DN5V2iQ'
      }
    };

    fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(searchQuery)}&include_adult=false&language=ko-KR&page=1`, options)
      .then(response => response.json())
      .then(data => {
        setResults(data.results.slice(0, 3)); // Get only the first three results
      })
      .catch(err => console.error(err));
  };

  const handleMovieClick = (movieId) => {
    sessionStorage.setItem('movieId', movieId);
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchBox}>
        <input
          className={styles.searchTxt}
          type="text"
          placeholder="제목 검색"
          value={query}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <a className={styles.searchBtn} href="#" onClick={handleSearch}>
          <i className="fas fa-search"></i>
        </a>
      </div>
      <div className={styles.resultsArea}>
        {query.trim() === '' && searchAttempted && (
          <p>입력된 검색어가 없습니다.</p>
        )}
        {query.trim() !== '' && results.length === 0 && searchAttempted && (
          <p>검색어가 올바른지 확인하세요.</p>
        )}
        {results.length > 0 && (
          <ul className={styles.resultsList}>
            {results.map((movie) => (
              <li key={movie.id} className={styles.resultItem}>
                <div className={styles.posterContainer}>
                  <Link to={`/subpage/${movie.id}`} onClick={() => handleMovieClick(movie.id)}>
                    <img
                      className={styles.poster}
                      src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                      alt={`${movie.title} poster`}
                    />
                  </Link>
                </div>
                <div className={styles.movieDetails}>
                  <Link to={`/subpage/${movie.id}`} onClick={() => handleMovieClick(movie.id)}>
                    <strong>{movie.title} ({new Date(movie.release_date).getFullYear()})</strong>
                  </Link>
                  <p className={styles.overview}>{movie.overview}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchBox;
