import React, { useState, useEffect } from 'react';
import Fish from './Fish';
import ExpandedFishTank from './ExpandedFishTank'
import './CenterFishTank.css';
import bg1 from '../img/fish/bg1.png';
import f1 from '../img/fish/f1.png';
import fishTank from '../img/fish/background_5c.png';
import settingImg from '../img/fish/Setting.png';

import Plants from './plants';

const CenterFishTank = ({ tasks }) => {
  const [waterHue, setWaterHue] = useState(0);
  const [floorHue, setFloorHue] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFish, setFilteredFish] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  useEffect(() => {
    const filtered = tasks.filter((task) =>
      task.date === selectedDate || selectedDate === ''
    );
    setFilteredFish(filtered);
  }, [tasks, selectedDate]);

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

  const toggleExpansion = () => {
    setExpanded(!expanded);
    if (expanded) {
      document.documentElement.style.overflow = 'auto';
    } else {
      document.documentElement.style.overflow = 'hidden';
    }
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Optionally, you can add smooth scrolling behavior
    });
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
  
    const currentPosition = timelineStart + ((totalMinutes-480) / 1020) * 198;
    return `${currentPosition}vh`;
  };

  const getCurrentTimePosition2 = () => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const totalMinutes = hours * 60 + minutes;
    const timelineStart = 56;
  
    const currentPosition = timelineStart + ((totalMinutes-480) / 1020) * 198 - 2;
    return `${currentPosition}vh`;
  }

  useEffect(() => {
    const filtered = tasks.filter((task) =>
      task.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredFish(filtered);
  }, [tasks, searchQuery]);
  

  return (
    <div className={`center-fish-tank`}>
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
      <button onClick={toggleExpansion} className={`Expand-b ${expanded ? 'top-left' : 'normal'}`}>
        {expanded ? 'Collapse' : 'Expand'}
      </button>
      <div className='search-container'>
        <input
          type="text"
          placeholder="Search Fish"
          value={searchQuery}
          onChange={handleSearchQueryChange}
          className="fish-search"
        />
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="fish-date"
        />
        {searchQuery && (
          <div className="search-results">
            {filteredFish.map((fish) => (
              <div key={fish.id} className="search-result">
                <Fish
                  name={fish.name}
                  source="SearchResults"
                  selectedTime={fish.time}
                  description={fish.description}
                  date = {fish.date}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      {expanded ? (
        <ExpandedFishTank
          tasks={tasks}
          waterHue={waterHue}
          floorHue={floorHue}
        />
       ) : (
        <div className='actual-fish-tank'>
          <div className="fish-container">
            {filteredFish.map((task) => (
              <div key={task.id} className="task2">
                <Fish
                  name={task.name}
                  source="CenterFishTank"
                  selectedTime={task.time}
                  description={task.description}
                  date = {task.date}
                />
              </div>
            ))}
          </div>
          <img
            src={bg1}
            className="background-water"
            style={{ filter: `hue-rotate(${waterHue}deg) blur(2px)` }}
          />
          <img
            src={f1}
            className="background-floor"
            style={{
              filter: `hue-rotate(${floorHue}deg)`,
            }}
          />
          <Plants
            source = 'center'/>
        </div>
      )}
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
