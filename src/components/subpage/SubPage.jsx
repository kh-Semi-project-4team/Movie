import React from 'react';
import HeaderImage from './header/HeaderImage';
import MovieDetails from './contents/MovieDetails';
import useMovieDataPullById from './useMovieDataPullById';
import CastDetails from './contents/CastDetails';
import Comments from './review/Review';

export default function SubPage() {
  const movieId = sessionStorage.getItem('movieId') || 653346;
  const { movieData, videos } = useMovieDataPullById(movieId);

  return (
    <div>
      <HeaderImage movieId={movieId} />
      <div style={{ height: "100px" }}/>
      {movieData && <MovieDetails movieData={movieData} videos={videos} />}
      <div style={{ height: "100px" }}/>
      {movieData && <CastDetails movieId={movieId} />}
      <div style={{ height: "100px" }}/>
      <Comments />
    </div>
  );
}
