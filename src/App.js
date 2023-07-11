import React, { useState, useEffect } from 'react';
import TaskManager from './components/TaskManager';
import './App.css';
import img from './assets/img/Top.png';
import LoadingSpinner from './components/LoadingSpinner';


const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate an asynchronous task
    setTimeout(() => {
      setIsLoading(false); // Set isLoading to false to hide the spinner
    }, 2000);
  }, []);

  return (
    <div className="app-container">
      <div>
        <LoadingSpinner isLoading={isLoading} />
      </div>
      <img src={img} alt="Top" className="top-image" />
      <div className="content-container">
        <div className="side-fish-tanks">
          <TaskManager />
        </div>
      </div>
    </div>
  );
};

export default App;
