import React, { useState } from 'react';
import HeaderImage from './header/HeaderImage';
import MovieDetails from './contents/MovieDetails';
import useMovieDataPullById from './useMovieDataPullById';
import CastDetails from './contents/CastDetails';
<<<<<<< HEAD
import Comments from './review/Review';
=======
import DisqusComments from './review/DisqusComment';
import VideoViewer from './contents/VideoPopupViewer';
import SubNavBar from './subnavbar/SubpageNavBar';


>>>>>>> 823470f90ac785476819f0e7eb83d87f65157467

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
      <SubNavBar/>
      <HeaderImage movieId={movieId} />
      <div style={{ height: "100px" }}/>
      {movieData && <MovieDetails movieData={movieData} videos={videos} onVideoClick={handleVideoClick} />}
      <div style={{ height: "100px" }}/>
      {movieData && <CastDetails movieId={movieId} />}
      <div style={{ height: "100px" }}/>
<<<<<<< HEAD
      <Comments />
=======
      <DisqusComments url={pageUrl} identifier={pageIdentifier} />
      <VideoViewer videoUrl={videoUrl} onClose={handleCloseVideo} />
>>>>>>> 823470f90ac785476819f0e7eb83d87f65157467
    </div>
  );
}