import React, { useState } from 'react';
import Fish from './Fish';
import './FishTank.css';

const FishTank = ({ tasks, tankName, onTaskDelete }) => {
  const [expanded, setExpanded] = useState(true);

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  const getColor = () => {
    let color = ``;
    if (tankName === 'To do') {
      color = `#f2c94c`;
    } else if (tankName === 'In Progress') {
      color = `#27ae60`;
    } else {
      color = `#2d9cdb`;
    }
    return color;
  };

  const handleTaskDelete = (taskId) => {
    onTaskDelete(taskId);
  };

  return (
    <div className="fish-tank">
      <div className="button-container">
        <button onClick={toggleExpansion} className="expand-b">
          {expanded ? '-' : '+'}
        </button>
        <span className={`tank-name`}>{tankName}</span>
        <div className='Task-count' style={{ backgroundColor: getColor() }}>{tasks.length}</div>
      </div>
      {expanded &&
        tasks.map((task) => (
          <div key={task.id} className="task">
            <Fish
              name={task.name}
              source="FishTank"
              selectedTime={task.time}
              description={task.description}
            />
            <button onClick={() => handleTaskDelete(task.id)} className="delete-task-button">Delete</button>
          </div>
        ))}
    </div>
  );
};

export default FishTank;
