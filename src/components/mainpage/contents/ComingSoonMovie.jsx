import { useEffect, useState } from 'react';
import styles from './css/ComingSoonMovie.module.css';

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
                const response = await fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko-KR&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte={min_date}&release_date.lte={max_date}', options);
                const data = await response.json();

                // 영화를 userscore에 따라 내림차순으로 정렬
                const sortedMovies = data.results.sort((a, b) => b.vote_average - a.vote_average);
                
                // 상위 두 개의 영화만 선택
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
                {movies.map(movie => (
                    <div key={movie.id} className={styles.movie_container}>
                        <div className={styles.img_box}>
                            <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.title} className={styles.img} />
                        </div>
                        <div className={styles.text_box}>
                            <div className={styles.text_container}>
                                <h3 className={styles.sub_title}>{movie.title}</h3>
                                <p className={styles.release_date}>{movie.release_date}</p>
                                <p className={styles.sub_content}>{movie.overview}</p>
                                <button className={styles.Read_More_btn}>Read More</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
