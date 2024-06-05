import React, { useState } from 'react';
import HeaderImage from './header/HeaderImage';
import MovieDetails from './contents/MovieDetails';
import useMovieDataPullById from './useMovieDataPullById';
import CastDetails from './contents/CastDetails';
import SubNavBar from './subnavbar/SubpageNavBar';
import DisqusComments from './review/DisqusComment';
import VideoViewer from './contents/VideoPopupViewer'

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
      <SubNavBar />
      <section id="header-section">
        <HeaderImage movieId={movieId} />
      </section>
      <div style={{ height: "100px" }} id="movie-details"/>
      <section id="MovieDetails-section">
        {movieData && <MovieDetails movieData={movieData} videos={videos} onVideoClick={handleVideoClick} />}
        <VideoViewer videoUrl={videoUrl} onClose={handleCloseVideo} />
      </section>
      <div style={{ height: "100px" }} />
      <section id="CastDetails-section">
        {movieData && <CastDetails movieId={movieId} />}
      </section>
      <div style={{ height: "100px" }} />
      <section id="Review-section">
        <DisqusComments url={pageUrl} identifier={pageIdentifier} />
      </section>  
      <div style={{ height: "100px" }}/>
    </div>
  );
}
