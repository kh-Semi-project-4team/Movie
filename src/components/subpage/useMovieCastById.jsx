import { useEffect, useState, useMemo } from 'react';

const useMovieCastById = (movieId) => {
  const [castDetails, setCastDetails] = useState([]);

  const API_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NzllZWUzZDc2ZWYwNzc2YzdjNWU4NzhlZGU0Y2ZiYSIsInN1YiI6IjY2NTQ3OWY5MjRhYWUyMmQxNDA2YWU0MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IroFQnlLfL2sSmvWkWAfFe8twYdSUZSoCGd_DN5V2iQ';

  const fetchOptions = useMemo(() => ({
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: API_TOKEN,
    },
  }), [API_TOKEN]);

  useEffect(() => {
    if (!movieId) return;

    const fetchCastDetails = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`, fetchOptions);
        const data = await response.json();
        if (data.cast && data.cast.length > 0) {
          setCastDetails(data.cast.slice(0, 6)); //출연진 6명에서 절단
        }
      } catch (error) {
        console.error('캐스트 정보가 없습니다:', error);
      }
    };

    fetchCastDetails();
  }, [movieId, fetchOptions]);

  return { castDetails };
};

export default useMovieCastById;
