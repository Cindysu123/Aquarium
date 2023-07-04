import React from 'react';
import './Fish.css';

const Fish = ({ name, source, selectedTime }) => {
  const fishStyle = {
    width: '100px',
    height: '50px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '10px',
    borderRadius: '5px',
  };

  const getRandomColor = () => {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    return randomColor;
  };
  const topPosition = (15+ selectedTime * 30.5) + '%';

  if (!document.fishColors) {
    document.fishColors = {};
  }

  if (!document.fishColors[name]) {
    document.fishColors[name] = getRandomColor();
  }

  fishStyle.backgroundColor = document.fishColors[name];

  if (source === 'CenterFishTank') {
    fishStyle.border = '2px solid black';
    fishStyle.position = 'absolute';
    fishStyle.top = topPosition;
  }

  return (
    <div style={fishStyle}>
      <span>{name} (Time: {selectedTime})</span>
    </div>
  );
};

export default Fish;
