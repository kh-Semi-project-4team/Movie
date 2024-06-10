import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './css/BoxOfficeRank.module.css';
import useDailyBoxOffice from '../useKobisDailyBoxOffice';

const BoxOfficeRank = ({ movieName, onClose }) => {
  const { data, loading, yesterday } = useDailyBoxOffice(movieName);
  const [movieIds, setMovieIds] = useState({});

  const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NzllZWUzZDc2ZWYwNzc2YzdjNWU4NzhlZGU0Y2ZiYSIsInN1YiI6IjY2NTQ3OWY5MjRhYWUyMmQxNDA2YWU0MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IroFQnlLfL2sSmvWkWAfFe8twYdSUZSoCGd_DN5V2iQ';

  const removeSpaces = (str) => str.replace(/\s+/g, '');

  const fetchMovieId = async (searchQuery) => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
      }
    };

    try {
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(searchQuery)}&include_adult=false&language=ko-KR&page=1`, options);
      if (response.status === 401) {
        console.error('Unauthorized: Check your API key');
        return null;
      }
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        // 개봉일 순으로 가장 최근 결과 가져오기
        const sortedResults = data.results.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
        return sortedResults[0].id;
      } else {
        console.error('No results found for the query:', searchQuery);
        return null;
      }
    } catch (err) {
      console.error('Fetch error:', err);
      return null;
    }
  };

  useEffect(() => {
    const fetchAllMovieIds = async () => {
      if (data) {
        const newMovieIds = {};
        for (const movie of data) {
          const movieId = await fetchMovieId(movie.movieNm);
          if (movieId) {
            newMovieIds[movie.movieCd] = movieId;
          }
        }
        setMovieIds(newMovieIds);
      }
    };

    fetchAllMovieIds();
  }, [data]);

  return (
    <div className={styles.boxOfficePopupOverlay}>
      <div className={styles.boxOfficePopupContent}>
        <button onClick={onClose} className={styles.boxOfficeCloseButton}>Close</button>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div>
            <div className={styles.boxOfficeTableTitle}>
              <h1>한국 박스오피스 10위 영화</h1>
            </div>
            <div className={styles.boxOfficeDateTitle}>{yesterday} 기준</div>
            <div className={styles.boxOfficeTblHeader}>
              <table>
                <thead>
                  <tr>
                    <th className={styles.rankColumn}>순위</th>
                    <th className={styles.movieNmColumn}>제목</th>
                    <th>일별 관객 수</th>
                    <th>누적 관객 수</th>
                    <th>개봉일</th>
                  </tr>
                </thead>
              </table>
            </div>
            <div className={styles.boxOfficeTblContent}>
              <table>
                <tbody>
                  {data && data.slice(0, 10).map((movie) => (
                    //영화 제목 비교 후 일치하면 목록에서 하이라이트 및 링크 제공
                    <tr key={movie.movieCd} className={removeSpaces(movie.movieNm) === removeSpaces(movieName) ? styles.highlight : ''}>
                      <td className={styles.rankColumn}>{movie.rank}</td>
                      <td className={styles.movieNmColumn}>
                        {movieIds[movie.movieCd] ? (
                          <Link to={`/subpage/${movieIds[movie.movieCd]}`} className={styles.movieTitleButton}>
                            {movie.movieNm}
                          </Link>
                        ) : (
                          movie.movieNm
                        )}
                      </td>
                      <td>{parseInt(movie.audiCnt).toLocaleString()}명</td>
                      <td>{parseInt(movie.audiAcc).toLocaleString()}명</td>
                      <td>{movie.openDt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BoxOfficeRank;
