import { useEffect, useState } from 'react';

const useMovieDataPullById = (movieId) => {
  const [movieData, setMovieData] = useState(null);
  const [genreMap, setGenreMap] = useState(new Map());
  const [backdropImages, setBackdropImages] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NzllZWUzZDc2ZWYwNzc2YzdjNWU4NzhlZGU0Y2ZiYSIsInN1YiI6IjY2NTQ3OWY5MjRhYWUyMmQxNDA2YWU0MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IroFQnlLfL2sSmvWkWAfFe8twYdSUZSoCGd_DN5V2iQ'
        }
      };

      try {
        const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=ko-KR', options);
        const data = await response.json();
        const genreMap = new Map();
        data.genres.forEach(genre => { //장르 코드와 장르명 연결
          genreMap.set(genre.id, genre.name);
        });
        setGenreMap(genreMap);
      } catch (error) {
        console.error('장르 정보 가져오기 오류:', error);
      }
    };

    fetchGenres();
  }, []);

  useEffect(() => {
    if (movieId) {
      const fetchMovieData = async () => {
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NzllZWUzZDc2ZWYwNzc2YzdjNWU4NzhlZGU0Y2ZiYSIsInN1YiI6IjY2NTQ3OWY5MjRhYWUyMmQxNDA2YWU0MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IroFQnlLfL2sSmvWkWAfFe8twYdSUZSoCGd_DN5V2iQ'
          }
        };

        try {
          const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR&include_adult=false`, options);
          const data = await response.json();
          setMovieData(data);
        } catch (error) {
          console.error('영화 정보 가져오기 오류:', error);
        }
      };

      const fetchBackdropImage = async () => {
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NzllZWUzZDc2ZWYwNzc2YzdjNWU4NzhlZGU0Y2ZiYSIsInN1YiI6IjY2NTQ3OWY5MjRhYWUyMmQxNDA2YWU0MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IroFQnlLfL2sSmvWkWAfFe8twYdSUZSoCGd_DN5V2iQ'
          }
        };

        try {
          const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/images`, options);
          const data = await response.json();
          if (data.backdrops && data.backdrops.length > 0) {
            setBackdropImages(data.backdrops.slice(0, 3));
          }
        } catch (error) {
          console.error('이미지 가져오기 오류:', error);
        }
      };

      fetchMovieData();
      fetchBackdropImage();
    }
  }, [movieId]);

  return { movieData, backdropImages, genreMap };
};

export default useMovieDataPullById;
