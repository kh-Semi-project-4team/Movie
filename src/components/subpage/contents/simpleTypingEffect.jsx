import { useState, useEffect } from 'react';

const useTypewriterEffect = (text, delay) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let currentText = '';
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      if (currentIndex < text.length) {
        currentText += text[currentIndex];
        setDisplayedText(currentText);
        currentIndex += 1;
      } else {
        clearInterval(intervalId);
      }
    }, delay);

    return () => clearInterval(intervalId);
  }, [text, delay]);

  return displayedText;
};

export default useTypewriterEffect;
