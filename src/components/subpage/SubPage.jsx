import React, { useState } from 'react';
import HeaderImage from './header/HeaderImage';
import MovieDetails from './contents/MovieDetails';
import useMovieDataPullById from './useMovieDataPullById';
import CastDetails from './contents/CastDetails';
import DisqusComments from './review/DisqusComment';
import VideoViewer from './contents/VideoPopupViewer';

export default function SubPage() {
  const movieId = sessionStorage.getItem('movieId') || 653346;
  const { movieData, videos } = useMovieDataPullById(movieId);
  const pageUrl = window.location.href;
  const pageIdentifier = window.location.pathname;

  const [videoUrl, setVideoUrl] = useState(null);

  const handleVideoClick = (url) => {
    setVideoUrl(url);
  };

  const handleCloseVideo = () => {
    setVideoUrl(null);
  };

  return (
    <div>
      <HeaderImage movieId={movieId} />
      <div style={{ height: "100px" }}/>
      {movieData && <MovieDetails movieData={movieData} videos={videos} onVideoClick={handleVideoClick} />}
      <div style={{ height: "100px" }}/>
      {movieData && <CastDetails movieId={movieId} />}
      <div style={{ height: "100px" }}/>
      <DisqusComments url={pageUrl} identifier={pageIdentifier} />
      <VideoViewer videoUrl={videoUrl} onClose={handleCloseVideo} />
    </div>
  );
}
