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
          <h3>혹성탈출</h3>
          {poster && (
            <a href={`https://www.themoviedb.org/movie/653346-kingdom-of-the-planet-of-the-apes`}>
              <div className={styles.bestImgContainer}>
                <img className={styles.img} src={`https://media.themoviedb.org/t/p/original/plNOSbqkSuGEK2i15A5btAXtB7t.jpg`} alt="혹성탈출"/>
              </div>
            </a>
          )}
        </div>
        <div className={styles.imageTd}>
          <h3>시빌 워</h3>
          {poster && (
            <a href={`https://www.themoviedb.org/movie/929590-civil-war`}>
              <div className={styles.bestImgContainer}>
                <img className={styles.img} src={`https://media.themoviedb.org/t/p/w220_and_h330_face/sh7Rg8Er3tFcN9BpKIPOMvALgZd.jpg`} alt="범죄도시"/>
              </div>
            </a>
          )}
        </div>
        <div className={styles.imageTd}>
          <h3>고질라 X 콩: 뉴 엠파이어</h3>
          {poster && (
            <a href={`https://www.themoviedb.org/movie/823464-godzilla-x-kong-the-new-empire?language=ko`}>
              <div className={styles.bestImgContainer}>
                <img className={styles.img} src={`https://media.themoviedb.org/t/p/w220_and_h330_face/4z1VMmlxHrziG45901esjB4dpIa.jpg`} alt="설계자"/>
              </div>
            </a>
          )}
        </div>
        <div className={styles.imageTd}>
          <h3>스턴트맨</h3>
          {poster && (
            <a href={`https://www.themoviedb.org/movie/746036-the-fall-guy?language=ko`}>
              <div className={styles.bestImgContainer}>
                <img className={styles.img} src={`https://media.themoviedb.org/t/p/original/9GAOhSzXjXJR4AxYCa2AMzMGPVg.jpg`} alt="이프, 상상의 친구"/>
              </div>
            </a>
          )}
        </div>
        <div className={styles.imageTd}>
          <h3>퓨리오사: 매드맥스 사가</h3>
          {poster && (
            <a href={`https://www.themoviedb.org/movie/786892-furiosa-a-mad-max-saga?language=ko`}>
              <div className={styles.bestImgContainer}>
                <img className={styles.img} src={`https://media.themoviedb.org/t/p/w220_and_h330_face/zaUFDdJidS4Nyyd6jb2Ok3Kq4Vo.jpg`} alt="챌린저스"/>
              </div>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default BestMovie;
