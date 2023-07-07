import React, { useEffect, useState } from 'react';
import Fish from './Fish';
import './CenterFishTank.css';

const CenterFishTank = ({ tasks , onTaskDelete }) => {

  const renderTimeScale = () => {
    const timeScale = [];
    for (let hour = 7; hour < 24; hour++) {
      const formattedHour = hour > 12 ? (hour - 12).toString().padStart(2, '0') : hour.toString().padStart(2, '0');
      const amOrPm = hour >= 12 ? 'PM' : 'AM';
      timeScale.push(
        <div key={hour} className="time-slot">
          {formattedHour}{amOrPm}
        </div>
      );
    }
    return timeScale;
  };

  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const intervalId = setInterval(() => {
      const date = new Date();
      let hours = date.getHours();
      let ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const formattedTime = `${hours}:${minutes} ${ampm}`;
      setCurrentTime(formattedTime);
    }, 1000);
  
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const getCurrentTimePosition = () => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const totalMinutes = hours * 60 + minutes;
    const timelineStart = 56;
  
    const currentPosition = timelineStart + ((totalMinutes-480) / 1020) * 204;
    return `${currentPosition}vh`;
  };

  const getCurrentTimePosition2 = () => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const totalMinutes = hours * 60 + minutes;
    const timelineStart = 56;
  
    const currentPosition = timelineStart + ((totalMinutes-480) / 1020) * 204 - 2;
    return `${currentPosition}vh`;
  }

  const handleTaskDelete = (taskId) => {
    onTaskDelete(taskId);
  };
  

  return (
    <div className="center-fish-tank">
      <div className="timeScaleContent">
        <div className="time-scale">
          {renderTimeScale()}
        </div>
        <div className='Time-Line'>
          <div className="current-time" style={{ top: getCurrentTimePosition2()}}>
            {currentTime}
          </div>
          <div className="current-time-line" style={{ top: getCurrentTimePosition() }} />
        </div>
      </div>
      <div className="fish-container">
        {tasks.map((task) => (
          <div key={task.id} className="task">
            <Fish
              name={task.name}
              source="CenterFishTank"
              selectedTime={task.time}
              description={task.description}
            />
            <button onClick={() => handleTaskDelete(task.id)} className="delete-task-button">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CenterFishTank;
