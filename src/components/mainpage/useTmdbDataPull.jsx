import { useEffect, useState } from 'react';

export default function useTmdbDataPull() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [comingSoonMovies, setComingSoonMovies] = useState([]);
  const [categoryMovies, setCategoryMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NzllZWUzZDc2ZWYwNzc2YzdjNWU4NzhlZGU0Y2ZiYSIsInN1YiI6IjY2NTQ3OWY5MjRhYWUyMmQxNDA2YWU0MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IroFQnlLfL2sSmvWkWAfFe8twYdSUZSoCGd_DN5V2iQ'
    }
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const today = new Date().toISOString().split('T')[0];
        const [popularResponse, comingSoonResponse, genresResponse, categoryResponse] = await Promise.all([
          fetch('https://api.themoviedb.org/3/movie/popular?language=ko-KR&include_adult=false', options),
          fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko-KR&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte=${today}`, options),
          fetch('https://api.themoviedb.org/3/genre/movie/list?language=ko', options),
          fetch('https://api.themoviedb.org/3/movie/now_playing?language=ko-KR', options)
        ]);

        const popularData = await popularResponse.json();
        const comingSoonData = await comingSoonResponse.json();
        const genresData = await genresResponse.json();
        const categoryData = await categoryResponse.json();

        const filteredPopularMovies = popularData.results.filter(movie => !movie.adult);
        const limitedPopularMovies = filteredPopularMovies.slice(0, 10);

        const upcomingMovies = comingSoonData.results.filter(movie => new Date(movie.release_date) > new Date(today));
        const sortedComingSoonMovies = upcomingMovies.sort((a, b) => b.vote_average - a.vote_average).slice(0, 2);

        const selectedGenres = genresData.genres.filter(genre =>
          ['액션', '공포', '드라마', '모험'].includes(genre.name)
        );

        setPopularMovies(limitedPopularMovies);
        setComingSoonMovies(sortedComingSoonMovies);
        setGenres(selectedGenres);
        setCategoryMovies(categoryData.results.slice(0, 20));
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return { popularMovies, comingSoonMovies, categoryMovies, genres, loading };
}
