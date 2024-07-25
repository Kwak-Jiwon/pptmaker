import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import Header from './Header';
import './PPT.css';
import pdfjsVersion from 'pdfjs-dist/package.json'; // 올바른 경로에서 버전을 읽어오기

const PPT = () => {
  const [presentationTopic, setPresentationTopic] = useState('');
  const [relatedContent, setRelatedContent] = useState('');
  const [pptCount, setPptCount] = useState('');
  const [presentationTime, setPresentationTime] = useState('');
  const [showCompletionMessage, setShowCompletionMessage] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [pdfUrl, setPdfUrl] = useState('');
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://34.125.250.179:3000/genPpt', { 
        presentationTopic, 
        relatedContent, 
        presentationTime 
      });

      setPdfUrl(response.data.pdfUrl);
      console.log(response.data.pdfUrl);
      setShowCompletionMessage(true);
    } catch (error) {
      console.error('Error generating PPT:', error);
    }
  };

  const handleTemplateSelection = (template) => {
    setSelectedTemplate(template);
  };

  return (
    <div className="container">
      <Header />
      <div className="content">
        {showCompletionMessage ? (
          <div className="completion-message-container">
            <div className="completion-message">PPT와 대본 생성이 완료됐습니다!</div>
            <div className="pdf-container">
              <Worker workerUrl={`https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsVersion.version}/pdf.worker.min.js`}>
                <Viewer
                  fileUrl={pdfUrl}
                  plugins={[defaultLayoutPluginInstance]}
                />
              </Worker>
            </div>
          </div>
        ) : (
          <div className="form-container">
            <h2 className="form-title">발표에 대해 알려주세요!</h2>
            <div className="form-row">
              <label htmlFor="topic">발표의 주제?</label>
              <input type="text" id="topic" value={presentationTopic} onChange={(e) => setPresentationTopic(e.target.value)} placeholder="발표 주제를 입력하세요" />
            </div>
            <div className="form-row">
              <label htmlFor="content">관련 내용?</label>
              <input type="text" id="content" value={relatedContent} onChange={(e) => setRelatedContent(e.target.value)} placeholder="관련 내용을 입력하세요" />
            </div>
            <div className="form-row">
              <label htmlFor="time">발표 시간?</label>
              <input type="text" id="time" value={presentationTime} onChange={(e) => setPresentationTime(e.target.value)} placeholder="발표 시간을 입력하세요" />
            </div>
            <div className="title">PPT 템플릿을 골라주세요!</div>
            <div className="image-container">
              <img src="ppt1.png" alt="Template 1" className={selectedTemplate === 'template1' ? 'selected' : ''} onClick={() => handleTemplateSelection('template1')} />
              <img src="ppt2.png" alt="Template 2" className={selectedTemplate === 'template2' ? 'selected' : ''} onClick={() => handleTemplateSelection('template2')} />
              <img src="ppt3.png" alt="Template 3" className={selectedTemplate === 'template3' ? 'selected' : ''} onClick={() => handleTemplateSelection('template3')} />
              <img src="ppt4.png" alt="Template 4" className={selectedTemplate === 'template4' ? 'selected' : ''} onClick={() => handleTemplateSelection('template4')} />
            </div>
            <button className="submit-button" onClick={handleSubmit}>제출</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PPT;
