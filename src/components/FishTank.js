import React, { useState } from 'react';
import Fish from './Fish';

const FishTank = ({ tasks, tankName }) => {
  const [expanded, setExpanded] = useState(true);

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="fish-tank">
      <h3 className="fish-tank-title">
        <button onClick={toggleExpansion}>
          {expanded ? '-' : '+'}
        </button>
        {tankName}
      </h3>
      {expanded &&
        tasks.map((task) => (
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
