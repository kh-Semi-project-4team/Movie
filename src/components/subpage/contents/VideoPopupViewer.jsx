import React from 'react';
import styles from './css/VideoPopupViewer.module.css';

const VideoViewer = ({ videoUrl, onClose }) => {
  if (!videoUrl) return null;

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.popup}>
        <button onClick={onClose} className={styles.closeButton}>X</button>
        <iframe
          width="560"
          height="315"
          src={videoUrl}
          title="Video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default VideoViewer;
