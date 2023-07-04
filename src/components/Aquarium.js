import React from 'react';
import FishTank from './FishTank';

const Aquarium = () => {
  const fishTanks = [
    { id: 1, name: 'To Do', tasks: [] },
    { id: 2, name: 'In Progress', tasks: [] },
    { id: 3, name: 'Completed', tasks: [] }
  ];

  return (
    <div>
      <h2>Virtual Aquarium</h2>
      <div className="container">
        <FishTank fishTank={fishTanks[0]} />
        <FishTank fishTank={fishTanks[1]} />
        <FishTank fishTank={fishTanks[2]} />
      </div>
    </div>
  );
};

export default Aquarium;
