import React from 'react';
import { useState, useEffect } from 'react';
import styles from './css/HeaderImage.module.css';
import useMovieDataPullById from '../useMovieDataPullById';

const HeaderImage = () => {
  const movieId = sessionStorage.getItem('movieId') || 653346; //받아오는 id값이 없을 때 테스트용으로 넣어둔 id
  const { movieData, backdropImages } = useMovieDataPullById(movieId);
  const [backdropImg, setBackdropImg] = useState(null);

  useEffect(() => {
    if (backdropImages && backdropImages.length > 0) {
      setBackdropImg(backdropImages[0]); // api로부터 가져오는 이미지의 순서가 종종 변경되는 문제가 있음
    }
  }, [backdropImages]);

  return (
    <div>
      {backdropImg && movieData ? (
        <div>
          <img
            className={styles.headerImage}
            src={`https://image.tmdb.org/t/p/original${backdropImg.file_path}`}
            alt={movieData.title}
          />
        </div>
      ) : (
        <p>이미지 정보가 없습니다</p>
      )}
    </div>
  );
};

export default HeaderImage;
