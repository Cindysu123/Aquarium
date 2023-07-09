import React, { useState, useEffect } from 'react';
import FishTank from './FishTank';
import CenterFishTank from './CenterFishTank';
import './TaskManager.css';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedTank, setSelectedTank] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (inputValue.trim() && selectedTank && selectedTime && selectedDate) {
      const newTask = {
        id: tasks.length + 1,
        name: inputValue,
        tank: selectedTank,
        time: selectedTime,
        date: selectedDate,
        description: description,
        remind: 0,
      };
      setTasks([...tasks, newTask]);
      setInputValue('');
      setDescription('');
      setSelectedDate('');
      setErrorMessage('');
    } else {
      setErrorMessage('Please select task type, date, and time.');
    }
  };

  const handleTaskDelete = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'inputValue') {
      setInputValue(value);
    } else if (name === 'description') {
      setDescription(value);
    }
  };

  const handleTankChange = (event) => {
    setSelectedTank(event.target.value);
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleKeyDown = (event) => {
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
                <option value="">Select Task Type</option>
                <option value="To do">To do</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
              <input
                type="time"
                value={selectedTime}
                onChange={handleTimeChange}
                className='Select time'
              />
              <input
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                className='Select date'
              />
              <button onClick={handleAddTask} className='Add-Task'>Add Task</button>
              {errorMessage && (
                <div className="error-message">*{errorMessage}</div>
              )}
            </div>
          </div>
        </div>
        <div className="center-fish-tank">
          <CenterFishTank
            tasks={tasks}
            selectedTime={selectedTime}
            description={description}
          />
        </div>
      </div>
      <div className='Left'>
        <div className="fish-tanks-wrapper">
          <div className="fish-tanks">
            <FishTank
              tasks={tasks.filter((task) => task.tank === 'To do')}
              tankName="To do"
              selectedTime={selectedTime}
              description={description}
              onTaskDelete={handleTaskDelete}
              setTasks={setTasks}
            />
            <FishTank
              tasks={tasks.filter((task) => task.tank === 'In Progress')}
              tankName="In Progress"
              selectedTime={selectedTime}
              description={description}
              onTaskDelete={handleTaskDelete}
              setTasks={setTasks}
            />
            <FishTank
              tasks={tasks.filter((task) => task.tank === 'Completed')}
              tankName="Completed"
              selectedTime={selectedTime}
              description={description}
              onTaskDelete={handleTaskDelete}
              setTasks={setTasks}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskManager;
