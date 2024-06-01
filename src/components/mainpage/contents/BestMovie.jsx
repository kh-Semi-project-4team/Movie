import React, { useState, useEffect } from 'react';
import styles from './css/BestMovie.module.css';

function BestMovie() {
  const [poster, setPoster] = useState(null);

  useEffect(() => {
    const firstPosterData = () => {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NzllZWUzZDc2ZWYwNzc2YzdjNWU4NzhlZGU0Y2ZiYSIsInN1YiI6IjY2NTQ3OWY5MjRhYWUyMmQxNDA2YWU0MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IroFQnlLfL2sSmvWkWAfFe8twYdSUZSoCGd_DN5V2iQ'
        }
      };
      fetch('https://api.themoviedb.org/3/collection/collection_id/images', options)
        .then(response => response.json())
        .then(data => {
          setPoster(data);
        })
        .catch(error => {
          console.error(error);
        });
    };

    firstPosterData();
  }, []);

  return (
    <div className={styles.mainposter}>
      <header className={styles.title1}>Best Movie!</header>
      <div className={styles.image}>
        <div className={styles.imageTd}>
          <h3 className={styles.sub_title}>범죄도시</h3>
          {poster && (
            <a href={`https://www.themoviedb.org/movie/1017163-4`}>
              <div className={styles.bestImgContainer}>
                <img className={styles.img} src={`https://media.themoviedb.org/t/p/original/h1YarEjeYurkAwXgfY1RDMVCiin.jpg`} alt="범죄도시"/>
              </div>
            </a>
          )}
        </div>
        <div className={styles.imageTd}>
          <h3 className={styles.sub_title}>혹성탈출</h3>
          {poster && (
            <a href={`https://www.themoviedb.org/movie/653346-kingdom-of-the-planet-of-the-apes`}>
              <div className={styles.bestImgContainer}>
                <img className={styles.img} src={`https://media.themoviedb.org/t/p/original/plNOSbqkSuGEK2i15A5btAXtB7t.jpg`} alt="혹성탈출"/>
              </div>
            </a>
          )}
        </div>
        <div className={styles.imageTd}>
          <h3 className={styles.sub_title}>설계자</h3>
          {poster && (
            <a href={`https://www.themoviedb.org/movie/865910`}>
              <div className={styles.bestImgContainer}>
                <img className={styles.img} src={`https://media.themoviedb.org/t/p/original/qcnrlYPXMh7gLAGzloMS7tNfHi2.jpg`} alt="설계자"/>
              </div>
            </a>
          )}
        </div>
        <div className={styles.imageTd}>
          <h3 className={styles.sub_title}>이프,상상의 친구</h3>
          {poster && (
            <a href={`https://www.themoviedb.org/movie/639720-if`}>
              <div className={styles.bestImgContainer}>
                <img className={styles.img} src={`https://media.themoviedb.org/t/p/original/9GAOhSzXjXJR4AxYCa2AMzMGPVg.jpg`} alt="이프, 상상의 친구"/>
              </div>
            </a>
          )}
        </div>
        <div className={styles.imageTd}>
          <h3 className={styles.sub_title}>챌린저스</h3>
          {poster && (
            <a href={`https://www.themoviedb.org/movie/937287-challengers`}>
              <div className={styles.bestImgContainer}>
                <img className={styles.img} src={`https://media.themoviedb.org/t/p/original/iUDG0gsPZxNm9IOLqpIUZiUMVMZ.jpg`} alt="챌린저스"/>
              </div>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default BestMovie;