import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import HeaderImage from './header/HeaderImage';
import MovieDetails from './contents/MovieDetails';
import useMovieDataPullById from './useMovieDataPullById';
import useDailyBoxOffice from './useKobisDailyBoxOffice';
import CastDetails from './contents/CastDetails';
import DisqusComments from './review/DisqusComment';
import VideoViewer from './contents/VideoPopupViewer';
import NavBar from '../publicpage/navbar/NavBar';
import Footer from '../publicpage/footer/Footer';

export default function SubPage() {
  const { movieId: paramMovieId } = useParams();  // URL 파라미터에서 값 가져오기
  const movieId = paramMovieId || sessionStorage.getItem('movieId') || 653346;

  useEffect(() => {
    if (paramMovieId) {
      sessionStorage.setItem('movieId', paramMovieId);  // URL의 movieId로 sessionStorage 업데이트
    }
  }, [paramMovieId]);

  const { movieData, videos } = useMovieDataPullById(movieId);
  const pageUrl = window.location.href;
  const pageIdentifier = window.location.pathname;
  const [videoUrl, setVideoUrl] = useState(null);

  const movieName = movieData ? movieData.title : '';
  const { isMovieFound, rankNum } = useDailyBoxOffice(movieName);

  const handleVideoClick = (url) => {
    setVideoUrl(url);
  };

  const handleCloseVideo = () => {
    setVideoUrl(null);
  };

  const subPageSections = [
    { id: 'header-section', name: '메인' },
    { id: 'MovieDetails-section', name: '소개' },
    { id: 'CastDetails-section', name: '출연진' },
    { id: 'Review-section', name: '리뷰' },
  ];

  return (
    <div>
      <NavBar title="Sub Page" sections={subPageSections} />
      <section id="header-section">
        <HeaderImage movieId={movieId} />
      </section>
      <div style={{ height: "100px" }} id="movie-details" />
      <section id="MovieDetails-section">
        {movieData && (
          <MovieDetails
            movieData={movieData}
            videos={videos}
            onVideoClick={handleVideoClick}
            isMovieFound={isMovieFound}
            rankNum={rankNum}
          />
        )}
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
      <div style={{ height: "100px" }} />
      <Footer />
    </div>
  );
}
