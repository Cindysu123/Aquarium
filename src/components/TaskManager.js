import React, { useState, useEffect } from 'react';
import FishTank from './FishTank';
import CenterFishTank from './CenterFishTank';
import './TaskManager.css';
import calendar from '../img/Calendarplaceholder.png';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedTank, setSelectedTank] = useState('To do');
  const [selectedTime, setSelectedTime] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (inputValue.trim()) {
      const newTask = {
        id: tasks.length + 1,
        name: inputValue,
        tank: selectedTank,
        time: selectedTime,
        description: description,
      };
      setTasks([...tasks, newTask]);
      setInputValue('');
      setDescription('');
    }
  };

  const handleTaskDelete = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };
  
  const handleInputChange = event => {
    const { name, value } = event.target;
    if (name === 'inputValue') {
      setInputValue(value);
    } else if (name === 'description') {
      setDescription(value);
    }
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
    <div className="TaskManager">
      <div className='Right'>
        <div className="Task-input-wrapper">
          <h2 className='add-task'>Add Task</h2>
          <div className='input-wrapper'>
            <input
              type="text"
              className='Task-name-input text-input'
              name="inputValue"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Enter a task"
            />
            <input
              type="text"
              className='Task-description-input text-input'
              name="description"
              value={description}
              onChange={handleInputChange}
              placeholder="Enter a description"
            />
            <div className="select-wrapper">
              <select value={selectedTank} onChange={handleTankChange} className='Select todo'>
                <option value="To do">To do</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
              <select value={selectedTime} onChange={handleTimeChange} className='Select time'>
                <option value="">Select Time</option>
                {[...Array(24).keys()].slice(7, 24).map(hour => {
                  const displayHour = hour > 12 ? hour - 12 : hour;
                  const period = hour >= 12 ? 'PM' : 'AM';
                  return (
                    <option key={hour} value={hour}>
                      {displayHour}:00 {period}
                    </option>
                  );
                })}
              </select>
              <button onClick={handleAddTask} className='Add-Task'>Add Task</button>
            </div>
          </div>
        </div>
        <div className="center-fish-tank">
          <CenterFishTank
            tasks={tasks}
            selectedTime={selectedTime}
            description={description} // Pass the description prop
            onTaskDelete={handleTaskDelete} // Pass the handleTaskDelete function as a prop
          />
        </div>
      </div>
      <div className='Left'>
        <img src={calendar} alt="calendar" className="calendar-image" />
        <div className="fish-tanks-wrapper">
          <div className="fish-tanks">
              <FishTank
                tasks={tasks.filter(task => task.tank === 'To do')}
                tankName="To do"
                selectedTime={selectedTime}
                description={description}
                onTaskDelete={handleTaskDelete} // Pass the handleTaskDelete function as a prop
              />
              <FishTank
                  tasks={tasks.filter(task => task.tank === 'In Progress')}
                  tankName="In Progress"
                  selectedTime={selectedTime}
                  description={description} // Pass the description prop
                  onTaskDelete={handleTaskDelete} // Pass the handleTaskDelete function as a prop
              />
              <FishTank
                  tasks={tasks.filter(task => task.tank === 'Completed')}
                  tankName="Completed"
                  selectedTime={selectedTime}
                  description={description} // Pass the description prop
                  onTaskDelete={handleTaskDelete} // Pass the handleTaskDelete function as a prop
              />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskManager;
