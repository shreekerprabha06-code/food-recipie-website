
import React from 'react';
import '../css/Loader.css';
import vid1 from '../Assets/Loader.mp4'

const Loader = () => {
  return (
    <div className="loader-container">
      <video className="loader-video" autoPlay muted>
        <source src={vid1} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Loader;
