import React from 'react';

const VideoPlayer = ({ src, width, height }) => {
  return (
    <video controls width={width} height={height}>
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoPlayer;