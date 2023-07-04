import React from 'react';
import Fish from './Fish';
import './CenterFishTank.css'

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

  return (
    <div className="center-fish-tank">
      <div className="timeScaleContent">
        <div className="time-scale">
            {renderTimeScale()}
        </div>
      </div>
      <div className="task-container">
        {tasks.map(task => (
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
