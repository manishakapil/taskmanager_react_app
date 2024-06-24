// ErrorPage.js
import React from 'react';
// import '../ErrorPage.css';
import '../css/ErrorPage.css'

const ErrorPage = () => {
  return (
    <div className="error-page-wrapper">
      <h1 className="error-title">404</h1>
      <p className="error-message">Oops! The page you're looking for doesn't exist.</p>
      <button className="home-button" onClick={() => window.location.href = '/'}>BACK HOME</button>
    </div>
  );
};

export default ErrorPage;
