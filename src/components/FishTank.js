import React, { useState } from 'react';
import Fish from './Fish';
import './FishTank.css';

const FishTank = ({ tasks, tankName}) => {
  const [expanded, setExpanded] = useState(true);

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  const getColor = () => {
    let color = ``;
    if(tankName === 'To do'){
      color = `#f2c94c`
    } else if (tankName === 'In Progress'){
      color = `#27ae60`
    } else {
      color = `#2d9cdb`
    }
    return color;
  }

  return (
    <div className="fish-tank">
      <div className="button-container">
        <button onClick={toggleExpansion} className="expand-b">
          {expanded ? "-" : "+"}
        </button>
        <span className={`tank-name`}>{tankName}</span>
        {/* <span className={`tank-name ${expanded ? '' : 'bold'}`}>{tankName}</span> */}
        <div className='Task-count' style={{ backgroundColor: getColor() }}>{tasks.length}</div>
      </div>
      {expanded &&
        tasks.map((task) => (
          <Fish
            key={task.id}
            name={task.name}
            source="FishTank"
            selectedTime={task.time}
            description={task.description}
          />
        ))}
    </div>
  );
};

export default FishTank;
