import React, { useState } from 'react';
import FishTank from './FishTank';
import CenterFishTank from './CenterFishTank';
import './TaskManager.css';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedTank, setSelectedTank] = useState('To do');
  const [selectedTime, setSelectedTime] = useState('');

  const handleAddTask = () => {
    if (inputValue.trim()) {
      const newTask = {
        id: tasks.length + 1,
        name: inputValue,
        tank: selectedTank,
        time: selectedTime
      };
      setTasks([...tasks, newTask]);
      setInputValue('');
    }
  };
  

  const handleInputChange = event => {
    setInputValue(event.target.value);
  };

  const handleTankChange = event => {
    setSelectedTank(event.target.value);
  };

  const handleTimeChange = event => {
    setSelectedTime(event.target.value);
  };

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      handleAddTask();
    }
  };

  return (
    <div>
      <h2>Task Manager</h2>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <select value={selectedTank} onChange={handleTankChange}>
        <option value="To do">To do</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <select value={selectedTime} onChange={handleTimeChange}>
        <option value="">Select Time</option>
        {[...Array(24).keys()].map(hour => (
          <option key={hour} value={hour}>{hour}:00</option>
        ))}
      </select>
      <button onClick={handleAddTask}>Add Task</button>
      <div className="fish-tanks-wrapper">
        <div className="fish-tanks">
          <FishTank
            tasks={tasks.filter(task => task.tank === 'To do')}
            tankName="To do"
            selectedTime={selectedTime} // Pass selectedTime prop
          />
          <FishTank
            tasks={tasks.filter(task => task.tank === 'In Progress')}
            tankName="In Progress"
            selectedTime={selectedTime}
          />
          <FishTank
            tasks={tasks.filter(task => task.tank === 'Completed')}
            tankName="Completed"
            selectedTime={selectedTime}
          />
        </div>
        <div className="center-fish-tank">
            <CenterFishTank
                tasks={tasks}
                selectedTime={selectedTime} // Pass selectedTime prop
            />
        </div>
      </div>
    </div>
  );
};

export default TaskManager;
