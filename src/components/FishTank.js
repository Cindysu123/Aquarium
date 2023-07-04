import React from 'react';
import Fish from './Fish';

const FishTank = ({ tasks, tankName}) => {
  return (
    <div className="fish-tank">
      <h3 className="fish-tank-title">{tankName}</h3>
      {tasks.map(task => (
        <Fish
          key={task.id}
          name={task.name}
          source="FishTank"
          selectedTime={task.time}
        />
      ))}
    </div>
  );
};

export default FishTank;

