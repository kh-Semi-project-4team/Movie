import React, { useState, useEffect } from 'react';
import styles from './bestmovie.module.css';

function MainPage() {
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
  <tr className={styles.image}>
    <td>
      <h3>범죄도시</h3>
      {poster && (
        <a href={`https://www.themoviedb.org/movie/1017163-4`}>
          <div className={styles.best_img_container}>
            <img src={`https://media.themoviedb.org/t/p/original/h1YarEjeYurkAwXgfY1RDMVCiin.jpg`}/>
          </div>
        </a>
      )}
    </td>
    <td>
    <h3>혹성탈출</h3>
      {poster && (
        <a href={`https://www.themoviedb.org/movie/653346-kingdom-of-the-planet-of-the-apes`}>
          <div className={styles.best_img_container}>
            <img src={`https://media.themoviedb.org/t/p/original/plNOSbqkSuGEK2i15A5btAXtB7t.jpg`}/>
          </div>
        </a>
      )}
    </td>
    <td>
    <h3>설계자</h3>
      {poster && (
        <a href={`https://www.themoviedb.org/movie/865910`}>
          <div >
            <img src={`https://media.themoviedb.org/t/p/original/qcnrlYPXMh7gLAGzloMS7tNfHi2.jpg`} />
          </div>
        </a>
      )}
    </td>
    <td>
    <h3>이프,상상의 친구</h3>
      {poster && (
        <a href={`https://www.themoviedb.org/movie/639720-if`}>
          <div >
            <img src={`https://media.themoviedb.org/t/p/original/9GAOhSzXjXJR4AxYCa2AMzMGPVg.jpg`} />
          </div>
        </a>
      )}
    </td>
    <td>
    <h3>챌린저스</h3>
      {poster && (
        <a href={`https://www.themoviedb.org/movie/937287-challengers`}>
          <div >
            <img src={`https://media.themoviedb.org/t/p/original/iUDG0gsPZxNm9IOLqpIUZiUMVMZ.jpg`} />
          </div>
        </a>
      )}
    </td>
  </tr>
    </div>
  );
}
export default MainPage;
