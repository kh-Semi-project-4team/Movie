import { useEffect, useState } from 'react';

export default function useTmdbDataPull() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NzllZWUzZDc2ZWYwNzc2YzdjNWU4NzhlZGU0Y2ZiYSIsInN1YiI6IjY2NTQ3OWY5MjRhYWUyMmQxNDA2YWU0MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IroFQnlLfL2sSmvWkWAfFe8twYdSUZSoCGd_DN5V2iQ'
      }
    };

    fetch('https://api.themoviedb.org/3/movie/popular?language=ko-KR&include_adult=false', options)
      .then(response => response.json())
      .then(data => {
        const filteredMovies = data.results.filter(movie => !movie.adult); // 성인 콘텐츠 필터링
        const limitedMovies = filteredMovies.slice(0, 10); // 처음 10개의 영화만 선택
        setMovies(limitedMovies);
      })
      .catch(err => console.error(err));
  }, []);

  return { movies };
}
