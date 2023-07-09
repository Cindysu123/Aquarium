import React, { useState } from 'react';
import Fish from './Fish';
import './FishTank.css';

const FishTank = ({ tasks, tankName, onTaskDelete, setTasks }) => {
  const [expanded, setExpanded] = useState(true);
  const [selectedTank, setSelectedTank] = useState(tankName);

  const toggleExpansion = () => {
    setSelectedTank(tankName);
    setExpanded(!expanded);
  };

  const handleTankChange = (taskId, event) => {
    const newSelectedTank = event.target.value;
    // Find the task in the tasks array and update the tank property
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, tank: newSelectedTank };
      }
      return task;
    });
    // Update the tasks array with the updated task
    setTasks(updatedTasks);
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
    <div className={`fish-tank ${expanded ? 'expanded' : 'collapsed'}`}>
      <div className="button-container">
        <button onClick={toggleExpansion} className={`expand-b ${expanded ? 'expanded' : 'collapsed'}`}>
          {expanded ? '-' : '+'}
        </button>
        <span className={`tank-name`}>{tankName}</span>
        <div className='Task-count' style={{ backgroundColor: getColor() }}>{tasks.length}</div>
      </div>
      {tasks.map((task) => (
        <div key={task.id} className={`task ${expanded ? 'expanded' : 'collapsed'}`}>
          <Fish
            name={task.name}
            source="FishTank"
            selectedTime={task.time}
            description={task.description}
            date={task.date}
          />
          <select
            value={selectedTank}
            onChange={(event) => handleTankChange(task.id, event)}
            className="tank-select"
          >
            {<option value="To do">To do</option>}
            {<option value="In Progress">In Progress</option>}
            {<option value="Completed">Completed</option>}
          </select>
          <button onClick={() => handleTaskDelete(task.id)} className="delete-task-button">
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default FishTank;