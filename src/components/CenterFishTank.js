import React, { useState, useEffect } from 'react';
import Fish from './Fish';
import './CenterFishTank.css';
import bg1 from '../img/fish/bg1.png';
import f1 from '../img/fish/f1.png';
import fishTank from '../img/fish/background_5c.png';
import settingImg from '../img/fish/Setting.png';

const CenterFishTank = ({ tasks }) => {
  const [waterHue, setWaterHue] = useState(0);
  const [floorHue, setFloorHue] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [rotation, setRotation] = useState(0);

  const handleWaterHueChange = (event) => {
    setWaterHue(parseInt(event.target.value));
  };

  const handleFloorHueChange = (event) => {
    setFloorHue(parseInt(event.target.value));
  };

  const toggleSettings2 = () => {
    setShowSettings(!showSettings);
    if (rotation === 0) {
      setRotation(25);
    } else {
      setRotation(0);
    }
  };

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
          </div>
        ))}
      </div>
      <img
        src={bg1}
        className="background-water"
        style={{ filter: `hue-rotate(${waterHue}deg)` }}
      />
      <img
        src={f1}
        className="background-floor"
        style={{
          filter: `hue-rotate(${floorHue}deg)`,
        }}
      />
      <img src={settingImg} alt="Settings" className="setting-image" onClick={toggleSettings2} style={{ transform: `rotate(${rotation}deg)` }} />
      {showSettings && (
        <div className='setting-container fade-in'>
          <div className="slider-container">
            <label htmlFor="waterHueSlider" className='label-w'>Water Color: </label>
            <input
              type="range"
              min="0"
              max="350"
              value={waterHue}
              onChange={handleWaterHueChange}
              className="hue-slider water-slider"
            />
            <label htmlFor="floorHueSlider" className='label-f'>Floor Color: </label>
            <input
              type="range"
              min="0"
              max="360"
              value={floorHue}
              onChange={handleFloorHueChange}
              className="hue-slider floor-slider"
            />
          </div>
          <img src={bg1} className="background-water-small" style={{ filter: `hue-rotate(${waterHue}deg)` }}/>
          <img src={f1} className="background-floor-small" style={{ filter: `hue-rotate(${floorHue}deg) saturate(100%)` }}/>
          <img src ={fishTank} className="fishTank-small"/>
        </div>
      )}
    </div>
  );
};

export default CenterFishTank;
