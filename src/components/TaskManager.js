import React, { useState, useEffect, useRef } from 'react';
import FishTank from './FishTank';
import CenterFishTank from './CenterFishTank';
import '../assets/css/TaskManager.css';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // Import the styles
import 'react-date-range/dist/theme/default.css'; // Import the theme

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedTank, setSelectedTank] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDateRange, setSelectedDateRange] = useState({
    startDate: new Date(),
    endDate: null,
  });
  const [description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleDateRangeChange = (ranges) => {
    if (ranges.selection) {
      setSelectedDateRange({
        startDate: ranges.selection.startDate,
        endDate: ranges.selection.endDate,
      });
      console.log(selectedDateRange.startDate)
      console.log(selectedDateRange.endDate)
    }
  };

  const handleCalendarToggle = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    console.log(selectedDateRange.startDate.toDateString());
    const selectedTimeHours = selectedTime.slice(0, 2);
    const selectedTimeMinutes = selectedTime.slice(3, 5);
  
    const selectedTimeDate = new Date();
    selectedTimeDate.setHours(selectedTimeHours);
    selectedTimeDate.setMinutes(selectedTimeMinutes);
  
    const minimumTime = new Date();
    minimumTime.setHours(7);
    minimumTime.setMinutes(0);
  
    if (
      inputValue.trim() &&
      selectedTank &&
      selectedTimeDate >= minimumTime && // Check if selectedTime is not earlier than 7:00 AM
      selectedDateRange.startDate &&
      selectedDateRange.endDate
    ) {
      const newTask = {
        id: tasks.length + 1,
        name: inputValue,
        tank: selectedTank,
        time: selectedTime,
        dateRange: {
          startDate: selectedDateRange.startDate.toDateString(),
          endDate: selectedDateRange.endDate.toDateString(),
        },
        description: description,
        remind: 0,
      };
      setTasks([...tasks, newTask]);
      setInputValue('');
      setDescription('');
      setSelectedDateRange({ startDate: new Date(), endDate: null });
      setErrorMessage('');
    } else {
      setErrorMessage('Please select task type, date, and time later than 7am.');
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
                type="text"
                value={`${selectedDateRange.startDate?.toDateString() || ''} - ${selectedDateRange.endDate?.toDateString() || ''}`}
                onClick={handleCalendarToggle}
                readOnly
                className='text-input calendar-text'
              />
              {isCalendarOpen && (
                <div style={{ position: 'absolute', zIndex: 9999 }}>
                  <DateRangePicker
                    ranges={[{
                      startDate: selectedDateRange.startDate,
                      endDate: selectedDateRange.endDate,
                      key: 'selection',
                    }]}
                    onChange={handleDateRangeChange}
                  />
                </div>
              )}
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
