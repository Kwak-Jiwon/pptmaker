import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const texts = ["똑똑하게", "효율적으로", "자신있게"];

const Home = () => {
  const [currentText, setCurrentText] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % texts.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <div className="header">
        <div className="header-content">
          <span>WHITEBOARD</span>
          <div>
            <Link to="/">HOME</Link>
            <Link to="/ppt">PPT</Link>
            <Link to="/video">영상</Link>
            <Link to="/mypage">mypage</Link>
          </div>
        </div>
      </div>
      <div className="content">
        <div className="text">
          <div>발표를 더</div>
          <div className="text-transition">
            {texts.map((text, i) => (
              <span key={i} className={currentText === i ? 'current' : ''}>{text}</span>
            ))}
          </div>
        </div>
        <div className="image-container">
          <img className="image" src="nubduck.png" alt="nubduck" />
        </div>
      </div>
    </div>
  );
};

export default Home;
