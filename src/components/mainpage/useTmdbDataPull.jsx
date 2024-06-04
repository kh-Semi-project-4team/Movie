import { useEffect, useState } from 'react';

export default function useTmdbDataPull() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [comingSoonMovies, setComingSoonMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NzllZWUzZDc2ZWYwNzc2YzdjNWU4NzhlZGU0Y2ZiYSIsInN1YiI6IjY2NTQ3OWY5MjRhYWUyMmQxNDA2YWU0MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IroFQnlLfL2sSmvWkWAfFe8twYdSUZSoCGd_DN5V2iQ'
      }
    };

    const fetchMovies = async () => {
      try {
        const [popularResponse, comingSoonResponse] = await Promise.all([
          fetch('https://api.themoviedb.org/3/movie/popular?language=ko-KR&include_adult=false', options),
          fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko-KR&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte=${new Date().toISOString().split('T')[0]}`, options)
        ]);

        const popularData = await popularResponse.json();
        const comingSoonData = await comingSoonResponse.json();

        const filteredPopularMovies = popularData.results.filter(movie => !movie.adult);
        const limitedPopularMovies = filteredPopularMovies.slice(0, 10);

        const upcomingMovies = comingSoonData.results.filter(movie => new Date(movie.release_date) > new Date());
        const sortedComingSoonMovies = upcomingMovies.sort((a, b) => b.vote_average - a.vote_average).slice(0, 2);

        setPopularMovies(limitedPopularMovies);
        setComingSoonMovies(sortedComingSoonMovies);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return { popularMovies, comingSoonMovies, loading };
}
