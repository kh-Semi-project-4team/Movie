import React, { useState, useEffect } from 'react';
import styles from './css/HeaderImage.module.css';
import useBackdropImgbyId from '../useBackdropImgbyId';

const HeaderImage = ({ movieId }) => {
  const { backdropImages } = useBackdropImgbyId (movieId);
  const [backdropImg, setBackdropImg] = useState(null);

  useEffect(() => {
    if (backdropImages && backdropImages.length > 0) {
      setBackdropImg(backdropImages[1]);
    }
  }, [backdropImages]);

  return (
    <div>
      {backdropImg ? (
        <img
          className={styles.headerImage}
          src={`https://image.tmdb.org/t/p/original${backdropImg.file_path}`}
          alt="Movie Backdrop"
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default HeaderImage;
