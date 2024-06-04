import { useEffect, useState } from 'react';
import styles from './css/ComingSoonMovie.module.css';
import { Link } from 'react-router-dom';

export default function ComingSoonMovie() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NzllZWUzZDc2ZWYwNzc2YzdjNWU4NzhlZGU0Y2ZiYSIsInN1YiI6IjY2NTQ3OWY5MjRhYWUyMmQxNDA2YWU0MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IroFQnlLfL2sSmvWkWAfFe8twYdSUZSoCGd_DN5V2iQ'
                }
            };

            try {
                const today = new Date().toISOString().split('T')[0]; // 오늘 날짜를 YYYY-MM-DD 형식으로 가져옴

                const response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko-KR&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte=${today}`, options);
                const data = await response.json();

                // 아직 개봉하지 않은 영화 중 상위 두 개 선택
                const upcomingMovies = data.results.filter(movie => new Date(movie.release_date) > new Date(today));
                const sortedMovies = upcomingMovies.sort((a, b) => b.vote_average - a.vote_average);
                const topTwoMovies = sortedMovies.slice(0, 2);

                setMovies(topTwoMovies || []);
            } catch (error) {
                console.error(error);
            }
        };

        fetchMovies();
    }, []);

    return (
        <div className={styles.mainposter}>
            <header className={styles.section_title}>Comingsoon Movie!</header>
            <div className={styles.flex_container}>

                {movies.map((movie, index) => (
                    <div key={movie.id} className={styles.movie_container}>
                        {index === 0 ? (
                            <>
                                <div className={styles.img_box}>
                                    <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={movie.title} className={styles.img} />
                                </div>
                                <div className={styles.text_box}>
                                    <div className={styles.text_container}>
                                        <h3 className={styles.sub_title}>{movie.title}</h3>
                                        <p className={styles.release_date}>{movie.release_date} Coming Soon! </p>
                                        <p className={styles.sub_content}>{movie.overview}</p>
                                        <Link to={`/subpage/${movie.id}`} onClick={() => sessionStorage.setItem('movieId', movie.id)}
                                         className={styles.Read_More_btn}>
                                           Read More </Link>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className={styles.text_box}>
                                    <div className={styles.text_container}>
                                        <h3 className={styles.sub_title}>{movie.title}</h3>
                                        <p className={styles.release_date}>{movie.release_date} Coming Soon! </p>
                                        <p className={styles.sub_content}>{movie.overview}</p>
                                        <Link to={`/subpage/${movie.id}`} onClick={() => sessionStorage.setItem('movieId', movie.id)}
                                         className={`${styles.Read_More_btn}`}>
                                           Read More </Link>
                                    </div>
                                </div>
                                <div className={styles.img_box}>
                                    <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={movie.title} className={styles.img} />
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
