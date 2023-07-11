import React from 'react';
import TaskManager from './components/TaskManager';
import './App.css';
import img from './assets/img/Top.png';

const App = () => {
  // Mock tasks data for demonstration purposes
  const tasks = [
    { id: 1, name: 'Task 1', color: '#ff0000' },
    { id: 2, name: 'Task 2', color: '#00ff00' },
    { id: 3, name: 'Task 3', color: '#0000ff' },
  ];

  return (
    <div className="app-container">
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
