import React from 'react';
import TaskManager from './components/TaskManager';
import './App.css';

const App = () => {
  // Mock tasks data for demonstration purposes
  const tasks = [
    { id: 1, name: 'Task 1', color: '#ff0000' },
    { id: 2, name: 'Task 2', color: '#00ff00' },
    { id: 3, name: 'Task 3', color: '#0000ff' },
  ];

  return (
    <div className="app-container">
      <div className="side-fish-tanks">
        <TaskManager />
      </div>
    </div>
  );
};

export default App;
