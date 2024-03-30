import React from 'react';
import './createPost.css'
const VideoPlayer = ({ src, width, height }) => {
  return (
    <div className='video-container'>
      <video controls >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;