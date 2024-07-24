import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <div className="header">
      <div className="header-content">
        <Link to="/">WHITEBOARD</Link>
        <div>
          <Link to="/ppt">PPT</Link>
          <Link to="/video">영상</Link>
          <Link to="/mypage">mypage</Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
