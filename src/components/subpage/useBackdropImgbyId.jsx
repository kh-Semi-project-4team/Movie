import { useEffect, useState, useMemo } from 'react';

const useBackdropImgbyId = (movieId) => {
  const [backdropImages, setBackdropImages] = useState([]);

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

    const fetchBackdropImages = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/images`, fetchOptions);
        const imageData = await response.json();
        if (imageData.backdrops && imageData.backdrops.length > 0) {
          setBackdropImages(imageData.backdrops.slice(0, 2));
        }
      } catch (error) {
        console.error('이미지 로딩 오류:', error);
      }
    };

    fetchBackdropImages();
  }, [movieId, fetchOptions]);

  return { backdropImages };
};

export default useBackdropImgbyId;
