import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import PPT from './components/PPT';
import './App.css'; // 폰트가 적용된 CSS 파일

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ppt" element={<PPT />} />
        <Route path="/video" element={<div>Video Page</div>} />
        <Route path="/mypage" element={<div>My Page</div>} />
      </Routes>
    </Router>
  );
}

export default App;
