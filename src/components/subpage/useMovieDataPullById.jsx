import { useEffect, useState, useMemo } from 'react';

const useMovieDataPullById = (movieId) => {
  const [movieData, setMovieData] = useState(null);
  const [genreMap, setGenreMap] = useState(new Map());
  const [videos, setVideos] = useState([]);

  const API_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NzllZWUzZDc2ZWYwNzc2YzdjNWU4NzhlZGU0Y2ZiYSIsInN1YiI6IjY2NTQ3OWY5MjRhYWUyMmQxNDA2YWU0MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IroFQnlLfL2sSmvWkWAfFe8twYdSUZSoCGd_DN5V2iQ';

  const fetchOptions = useMemo(() => ({
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: API_TOKEN,
    },
  }), [API_TOKEN]);

  useEffect(() => {
    const fetchGenres = async () => { //장르 번호와 장르명 연결
      try {
        const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=ko-KR', fetchOptions);
        const data = await response.json();
        const genreMap = new Map();
        data.genres.forEach(genre => genreMap.set(genre.id, genre.name));
        setGenreMap(genreMap);
      } catch (error) {
        console.error('장르 가져오기 오류:', error);
      }
    };

    fetchGenres();
  }, [fetchOptions]);

  useEffect(() => {
    if (!movieId) return;

    const fetchMovieData = async () => {
      try {
        const [movieResponse, videoResponse] = await Promise.all([ //영화 기본 정보 및 관련 영상 2건 정보 가져옴
          fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR&include_adult=false`, fetchOptions),
          fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=ko-KR`, fetchOptions)
        ]);

        const movieData = await movieResponse.json();
        setMovieData(movieData);

        const videoData = await videoResponse.json();
        setVideos(videoData.results.slice(0, 2));
      } catch (error) {
        console.error('영화 정보 가져오기 오류:', error);
      }
    };

    fetchMovieData();
  }, [movieId, fetchOptions]);

  return { movieData, genreMap, videos };
};

export default useMovieDataPullById;
