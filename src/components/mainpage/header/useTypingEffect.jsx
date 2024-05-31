import { useState, useEffect } from 'react';

// 타이핑 효과를 위한 커스텀 훅
export default function useTypingEffect(title = "", overview = "", typingSpeed = 60) {
  const [displayText, setDisplayText] = useState({ title: "", overview: "" }); // 화면에 표시될 텍스트 상태
  const [hiddenText, setHiddenText] = useState({ title: "", overview: "" }); // 숨겨진 전체 텍스트 상태
  const [visibleTitleIndex, setVisibleTitleIndex] = useState(0); // 현재 보이는 제목의 인덱스
  const [visibleOverviewIndex, setVisibleOverviewIndex] = useState(0); // 현재 보이는 개요의 인덱스

  useEffect(() => {
    // 전체 텍스트를 한 번에 설정하고 숨김 상태로 저장
    setHiddenText({ title, overview });
    setDisplayText({ title: "", overview: "" });
    setVisibleTitleIndex(0); // 제목 인덱스를 초기화
    setVisibleOverviewIndex(0); // 개요 인덱스를 초기화
  }, [title, overview]);

  useEffect(() => {
    // 제목 타이핑 효과
    const titleInterval = setInterval(() => {
      setVisibleTitleIndex(prev => {
        if (prev < hiddenText.title.length) {
          setDisplayText(prevDisplay => ({
            ...prevDisplay,
            title: hiddenText.title.substring(0, prev + 1) // 숨겨진 제목 텍스트에서 하나씩 추가
          }));
          return prev + 1;
        } else {
          clearInterval(titleInterval); // 제목 타이핑이 끝나면 간격 제거
          return prev;
        }
      });
    }, typingSpeed);

    return () => clearInterval(titleInterval); // 컴포넌트가 언마운트될 때 간격 제거
  }, [hiddenText.title, typingSpeed]);

  useEffect(() => {
    // 개요 타이핑 효과
    const overviewInterval = setInterval(() => {
      setVisibleOverviewIndex(prev => {
        if (prev < hiddenText.overview.length) {
          setDisplayText(prevDisplay => ({
            ...prevDisplay,
            overview: hiddenText.overview.substring(0, prev + 1) // 숨겨진 개요 텍스트에서 하나씩 추가
          }));
          return prev + 1;
        } else {
          clearInterval(overviewInterval); // 개요 타이핑이 끝나면 간격 제거
          return prev;
        }
      });
    }, typingSpeed);

    return () => clearInterval(overviewInterval); // 컴포넌트가 언마운트될 때 간격 제거
  }, [hiddenText.overview, typingSpeed]);

  return displayText; // 화면에 표시될 텍스트 반환
}
