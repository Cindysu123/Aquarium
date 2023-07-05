import React, { useEffect, useState } from 'react';
import Fish from './Fish';
import './CenterFishTank.css';

const CenterFishTank = ({ tasks }) => {
  const renderTimeScale = () => {
    const timeScale = [];
    for (let hour = 0; hour < 24; hour++) {
      const formattedHour = hour.toString().padStart(2, '0');
      timeScale.push(
        <div key={hour} className="time-slot">
          {formattedHour}:00
        </div>
      );
    }
    return timeScale;
  };

  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const intervalId = setInterval(() => {
      const date = new Date();
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const seconds = date.getSeconds().toString().padStart(2, '0');
      const formattedTime = `${hours}:${minutes}:${seconds}`;
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
    return `${(totalMinutes / 1440) * 750}%`;
  };

  return (
    <div className="center-fish-tank">
      <div className="timeScaleContent">
        <div className="time-scale">
          {renderTimeScale()}
        </div>
        <div className="current-time">
          Current Time: {currentTime}
        </div>
        {/* <div className="current-time-line" style={{ top: `750%` }} /> */}
        <div className="current-time-line" style={{ top: getCurrentTimePosition() }} />
      </div>
      <div className="task-container">
        {tasks.map((task) => (
          <div key={task.id} className="task">
            <Fish
              name={task.name}
              source="CenterFishTank"
              selectedTime={task.time}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CenterFishTank;
