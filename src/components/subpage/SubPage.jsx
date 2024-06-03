import React from 'react';
import HeaderImage from './header/HeaderImage';
import MovieDetails from './contents/MovieDetails';
import useMovieDataPullById from './useMovieDataPullById';

export default function SubPage() {
    const movieId = sessionStorage.getItem('movieId') || 653346;
    const { movieData, videos } = useMovieDataPullById(movieId);
  
    return (
      <div>
        <HeaderImage movieId={movieId} />
        <div style={{ height: "100px" }} id="best-movie"/>
        {movieData && <MovieDetails movieData={movieData} videos={videos} />}
        <div style={{ height: "100px" }} id="best-movie"/>
        
      </div>
    );
}