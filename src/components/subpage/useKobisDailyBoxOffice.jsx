import { useState, useEffect } from 'react';
import KobisOpenAPIRestService from './getKobisDailyBoxOffice'; // Adjust the path based on your file structure

const useDailyBoxOffice = (movieName = null) => {
  const [data, setData] = useState(null);
  const [isMovieFound, setIsMovieFound] = useState(false);
  const [loading, setLoading] = useState(true);
  const [rankNum, setRankNum] = useState(null);
  const [yesterday, setYesterday] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const kobisService = new KobisOpenAPIRestService('7e7f42a8c15e491dab8ba8ee30b09084');

      //하루 전 날짜 박스오피스 데이터 가져오기
      const today = new Date();
      today.setDate(today.getDate() - 1);
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      const targetDt = `${year}${month}${day}`;
      setYesterday(`${year}.${month}.${day}`);

      try {
        const result = await kobisService.getDailyBoxOffice(true, { targetDt });
        console.log("Result: ", result);
        //제목 비교 후 일치 시 순위 정보 가져오기 
        if (result.boxOfficeResult && result.boxOfficeResult.dailyBoxOfficeList) {
          const boxOfficeList = result.boxOfficeResult.dailyBoxOfficeList;
          if (movieName) {
            const movie = boxOfficeList.find(movie => movie.movieNm.replace(/\s+/g, '').toLowerCase() === movieName.replace(/\s+/g, '').toLowerCase());
            setIsMovieFound(!!movie);
            setRankNum(movie ? movie.rank : null);
          }
          setData(boxOfficeList);
        } else {
          setData([]);
        }
      } catch (error) {
        console.error(error.message);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [movieName]);

  return { data, isMovieFound, loading, rankNum, yesterday };
};

export default useDailyBoxOffice;
