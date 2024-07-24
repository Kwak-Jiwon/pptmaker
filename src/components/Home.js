import React, { useState, useEffect } from 'react';
import Header from './Header';
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
      <Header />
      <div className="content">
        <div className="image-container1">
          <img className="image" src="nubduck.png" alt="nubduck" />
        </div>
        <div className="text">
          <div>발표를 더</div>
          <div className="text-transition">
            {texts.map((text, i) => (
              <span key={i} className={currentText === i ? 'current' : ''}>{text}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
