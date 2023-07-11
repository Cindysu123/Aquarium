import React, { useState, useEffect } from 'react';
import '../assets/css/LoadingSpinner.css'; // Create a separate CSS file for styling the spinner

const LoadingSpinner = ({ isLoading }) => {
    const [fadeOut, setFadeOut] = useState(false);
  
    useEffect(() => {
      if (!isLoading) {
        // Delay the fade-out animation by 300ms
        const timeout = setTimeout(() => {
          setFadeOut(true);
        }, 300);
  
        return () => clearTimeout(timeout);
      }
    }, [isLoading]);
  
    if (!isLoading) {
      return null; // Render nothing if loading is completed
    }
    return (
      <div className={`loading-spinner-overlay ${fadeOut ? 'fade-out' : ''}`}>
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading...</p>
      </div>
    );
  };
  
  export default LoadingSpinner;
