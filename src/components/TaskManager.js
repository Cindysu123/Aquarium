import React, { useState, useEffect } from 'react';
import FishTank from './FishTank';
import CenterFishTank from './CenterFishTank';
import './TaskManager.css';
import closeImg from '../img/close.png'

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedTank, setSelectedTank] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [reminderTask, setReminderTask] = useState(null);

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      const parsedTasks = JSON.parse(storedTasks);
      setTasks(parsedTasks);
      const currentTime = new Date().toLocaleTimeString('en-US', { timeZone: 'America/Chicago', hour12: false }).slice(0, -3);
      const matchingTask = parsedTasks.find(task => task.time === currentTime);
      setReminderTask(matchingTask);

      // Start the 5-minute timer for the reminder task, if present
      if (matchingTask) {
        setTimeout(() => {
          setReminderTask(null);
        }, 5 * 60 * 1000);
      }
    }
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
      };
      setTasks([...tasks, newTask]);
      setInputValue('');
      setDescription('');
      setSelectedDate('');
      setErrorMessage('');

      // Check if the added task matches the current US Central Time (hour and minute)
      const currentTime = new Date().toLocaleTimeString('en-US', { timeZone: 'America/Chicago', hour12: false }).slice(0, -3);
      if (selectedTime === currentTime) {
        setReminderTask(newTask);

        // Start the 5-minute timer
        setTimeout(() => {
          setReminderTask(null);
        }, 5 * 60 * 1000);
      } else {
        setReminderTask(null);
      }
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

  const handleCloseReminder = () => {
    setReminderTask(null);
  };

  return (
    <div className="TaskManager">
      {reminderTask && (
        <>
          <div className="background-overlay" />
          <div className="reminder-popup">
            <p>Reminder: You have a task "{reminderTask.name}" at {reminderTask.time}</p>
            <img
              src={closeImg}
              alt="Close"
              className="close-img"
              onClick={handleCloseReminder}
            />
          </div>
        </>
      )}
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
              {/* Replace the select element with an input element */}
              <input
                type="time"
                value={selectedTime}
                onChange={handleTimeChange}
                className='Select time' // You can style this input element as needed
              />
              <input
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                className='Select date' // You can style this input element as needed
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
            description={description} // Pass the description prop
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
              setTasks={setTasks} // Pass the setTasks function as a prop
            />
            <FishTank
              tasks={tasks.filter((task) => task.tank === 'In Progress')}
              tankName="In Progress"
              selectedTime={selectedTime}
              description={description}
              onTaskDelete={handleTaskDelete}
              setTasks={setTasks} // Pass the setTasks function as a prop
            />
            <FishTank
              tasks={tasks.filter((task) => task.tank === 'Completed')}
              tankName="Completed"
              selectedTime={selectedTime}
              description={description}
              onTaskDelete={handleTaskDelete}
              setTasks={setTasks} // Pass the setTasks function as a prop
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskManager;
