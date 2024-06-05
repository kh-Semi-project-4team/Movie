import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './css/KategorieMovie.module.css';
import useTmdbDataPull from '../useTmdbDataPull';

export default function KategorieMovie() {
    const { categoryMovies, genres, loading } = useTmdbDataPull();
    const [selectedGenre, setSelectedGenre] = useState(null);

    const handleGenreClick = (genreId) => {
        setSelectedGenre(genreId);
    };

    const filteredMovies = selectedGenre
        ? categoryMovies.filter(movie => movie.genre_ids.includes(selectedGenre))
        : categoryMovies;

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.container}>
            <header className={styles.section_title}>장르별영화</header>
            <div className={styles.genreButtons}>
                {genres.map(genre => (
                    <button key={genre.id} onClick={() => handleGenreClick(genre.id)} className={styles.btn_genre}>{genre.name}</button>
                ))}
            </div>
            <div className={styles.category}>
                <ul>
                    {filteredMovies.map(movie => (
                        <li key={movie.id} className={styles.kategorieContainer}>
                            <Link to={`/subpage/${movie.id}`} onClick={() => sessionStorage.setItem('movieId', movie.id)}>
                                <img className={styles.kategorieImg} src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} />
                            </Link>
                            <li className={styles.sub_title}>
                                <Link to={`/subpage/${movie.id}`} onClick={() => sessionStorage.setItem('movieId', movie.id)} className={styles.kategorieTitle}>
                                    {movie.title}
                                </Link>
                            </li>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
