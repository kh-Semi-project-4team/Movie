import React, { useState, useEffect } from 'react';
import styles from './bestMovieComponent.module.css';


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
    <div>
      <header>Best Movie!</header>
      <tr>
        <td>
      {poster && (
        <a href={`https://www.themoviedb.org/movie/1017163-4`}>
          <div className="best_img_1">
          <img src={`https://media.themoviedb.org/t/p/original/h1YarEjeYurkAwXgfY1RDMVCiin.jpg`}/>
          </div>
        </a>
      )}
       </td>
       <td>
      {poster && (
        <a href={`https://www.themoviedb.org/movie/653346-kingdom-of-the-planet-of-the-apes`}>
          <img src={`https://media.themoviedb.org/t/p/original/plNOSbqkSuGEK2i15A5btAXtB7t.jpg`} />
        </a>
      )}
       </td>
       <td>
      {poster && (
        <a href={`https://www.themoviedb.org/movie/746036-the-fall-guy`}>
          <img src={`https://media.themoviedb.org/t/p/original/aUZ176q7ldMaPLYVnmaFWK4CApE.jpg`} />
        </a>
      )}
       </td>
       <td>
      {poster && (
        <a href={`https://www.themoviedb.org/movie/746036-the-fall-guy`}>
          <img src={`https://media.themoviedb.org/t/p/original/aUZ176q7ldMaPLYVnmaFWK4CApE.jpg`} />
        </a>
      )}
       </td>
       <td>
      {poster && (
        <a href={`https://www.themoviedb.org/movie/746036-the-fall-guy`}>
          <img src={`https://media.themoviedb.org/t/p/original/aUZ176q7ldMaPLYVnmaFWK4CApE.jpg`} />
        </a>
      )}
       </td>
      </tr>
    </div>
  );
}
export default MainPage;