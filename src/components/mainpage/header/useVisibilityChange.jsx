import { useEffect } from 'react';

// 슬라이더의 가시성 변화를 감지하여 슬라이더 재생/일시정지를 처리하는 커스텀 훅
export default function useVisibilityChange(sliderRef) {
  useEffect(() => {
    // 문서의 가시성 상태가 변경될 때 호출되는 핸들러 함수
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        // 문서가 숨겨졌을 때 슬라이더를 일시정지
        if (sliderRef.current) {
          sliderRef.current.slickPause();
        }
      } else {
        // 문서가 다시 보일 때 슬라이더를 재생
        if (sliderRef.current) {
          sliderRef.current.slickPlay();
        }
      }
    };

    // 문서의 가시성 상태 변화 이벤트 리스너 등록
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [sliderRef]); // sliderRef가 변경될 때마다 이 훅이 다시 실행됨
}
