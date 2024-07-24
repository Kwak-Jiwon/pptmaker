import React, { useRef, useEffect } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import './MyPage.css';

const MyPage = () => {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    const leftViewerRef = useRef(null);
    const rightViewerRef = useRef(null);

    useEffect(() => {
        const leftViewer = leftViewerRef.current.querySelector('.rpv-core__inner-pages');
        const rightViewer = rightViewerRef.current.querySelector('.rpv-core__inner-pages');

        if (leftViewer && rightViewer) {
            const observerOptions = {
                root: leftViewer,
                threshold: 0.5
            };

            const handleIntersect = (entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const pageNumber = entry.target.getAttribute('data-page-number');
                        const correspondingPage = rightViewer.querySelector(`[data-page-number="${pageNumber}"]`);
                        if (correspondingPage) {
                            correspondingPage.scrollIntoView({ behavior: 'smooth' });
                        }
                    }
                });
            };

            const observer = new IntersectionObserver(handleIntersect, observerOptions);
            const pages = leftViewer.querySelectorAll('.rpv-core__page');
            pages.forEach(page => observer.observe(page));

            return () => {
                observer.disconnect();
            };
        }
    }, []);

    return (
        <div className="mypage-container">
            <h1>나의 기록</h1>
            <div className="pdf-text-pair">
                <div className="pdf-container" ref={leftViewerRef}>
                    <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.0.279/build/pdf.worker.min.js`}>
                        <Viewer
                            fileUrl="/pdfex.pdf"
                            plugins={[defaultLayoutPluginInstance]}
                        />
                    </Worker>
                </div>
                <div className="pdf-container" ref={rightViewerRef}>
                    <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.0.279/build/pdf.worker.min.js`}>
                        <Viewer
                            fileUrl="/pdfex.pdf"
                            plugins={[defaultLayoutPluginInstance]}
                        />
                    </Worker>
                </div>
            </div>
            <div className="pdf-text-pair">
                <div className="pdf-container">
                    <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.0.279/build/pdf.worker.min.js`}>
                        <Viewer
                            fileUrl="/pdfex2.pdf"
                            plugins={[defaultLayoutPluginInstance]}
                        />
                    </Worker>
                </div>
                <div className="pdf-container">
                    <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.0.279/build/pdf.worker.min.js`}>
                        <Viewer
                            fileUrl="/pdfex2.pdf"
                            plugins={[defaultLayoutPluginInstance]}
                        />
                    </Worker>
                </div>
            </div>
            <div className="pdf-text-pair">
                <div className="pdf-container">
                    <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.0.279/build/pdf.worker.min.js`}>
                        <Viewer
                            fileUrl="/pdfex3.pdf"
                            plugins={[defaultLayoutPluginInstance]}
                        />
                    </Worker>
                </div>
                <div className="pdf-container">
                    <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.0.279/build/pdf.worker.min.js`}>
                        <Viewer
                            fileUrl="/pdfex3.pdf"
                            plugins={[defaultLayoutPluginInstance]}
                        />
                    </Worker>
                </div>
            </div>
        </div>
    );
};

export default MyPage;
