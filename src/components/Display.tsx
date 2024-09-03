import React, { useState, useRef, useEffect } from 'react';

interface DisplayProps {
  src: string;
  content: string;
  isZoomedIn: boolean;
  handleVideoClick: () => void;
  handleCloseClick: () => void;
}

const Display: React.FC<DisplayProps> = ({ src, content, isZoomedIn, handleVideoClick, handleCloseClick }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the click from propagating to the video element
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('play', () => setIsPlaying(true));
      videoRef.current.addEventListener('pause', () => setIsPlaying(false));
    }
  }, []);

  return (
    <div className="video-wrapper" onClick={handleVideoClick}>
      <video
        ref={videoRef}
        className={`video-responsive ${isZoomedIn ? 'zoomed-in' : ''}`}
        controls={isPlaying}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {!isPlaying && (
        <div className="play-button" onClick={handlePlayPause}>
          ▶
        </div>
      )}
      {isZoomedIn && (
        <button className="close-button" onClick={handleCloseClick}>X</button>
      )}
      <div className="font-inter my-0 text-white text-base">{content}</div>
    </div>
  );
};

export default Display;