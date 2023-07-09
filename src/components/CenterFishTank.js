import React, { useState, useEffect } from 'react';
import Fish from './Fish';
import ExpandedFishTank from './ExpandedFishTank'
import './CenterFishTank.css';
import bg1 from '../img/fish/bg1.png';
import f1 from '../img/fish/f1.png';
import fishTank from '../img/fish/background_5c.png';
import settingImg from '../img/fish/Setting.png';
import NoteIon from '../img/Note.png'
import Bubble from './bubble'

import Plants from './plants';

const CenterFishTank = ({ tasks }) => {
  const [waterHue, setWaterHue] = useState(0);
  const [floorHue, setFloorHue] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFish, setFilteredFish] = useState([]);
  const [filteredTodayFish, setFilteredTodayFish] = useState([]);
  const [filteredRemindFish, setFilteredRemindFish] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [isExpanded, setIsExpanded] = useState(true);
  const [showReminder, setShowReminder] = useState();
  const [userInput, setUserInput] = useState(''); // New state variable to store user input
  const [showInput, setShowInput] = useState(false);

  const handleImageClick = () => {
    setShowInput((prevShowInput) => !prevShowInput);
  };

  const handleReminderClose = () => {
    setShowReminder(false);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleDateChange = (event) => {
    console.log(event.target.value);
    setSelectedDate(event.target.value);
  };

  useEffect(() => {
    const filteredTasks = tasks.filter((task) => {
      if (!task.dateRange.startDate || !task.dateRange.endDate) {
        return false;
      }
      const startDate = new Date(task.dateRange.startDate);
      const endDate = new Date(task.dateRange.endDate);
      const selected = new Date(selectedDate.replace(/-/g, "/")); // Convert selectedDate format to match
      return selected >= startDate && selected <= endDate;
    });
    setFilteredFish(filteredTasks);
  }, [tasks, selectedDate]);

  useEffect(() => {
    const options = { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' };
    const today = new Date().toLocaleDateString('en-US', options);
    const filteredTasks = tasks.filter((task) => {
      const startDate = new Date(task.dateRange.startDate).toLocaleDateString('en-US', options);
      const endDate = new Date(task.dateRange.endDate).toLocaleDateString('en-US', options);
      return startDate <= today && endDate >= today;
    });
    setFilteredTodayFish(filteredTasks);
  }, [tasks]);

  let Oldfiltered3 = 0;
  useEffect(() => {
    const updateFilteredRemindFish = () => {
      const date = new Date();
      const hour = date.getHours().toString().padStart(2, '0');
      const minute = date.getMinutes().toString().padStart(2, '0');

      const filtered3 = tasks.filter((task) => {
        const options = { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' };
        const today = new Date().toLocaleDateString('en-US', options);
        const startDate = new Date(task.dateRange.startDate).toLocaleDateString('en-US', options);
        const endDate = new Date(task.dateRange.endDate).toLocaleDateString('en-US', options);
        const [taskHour, taskMinute] = task.time.split(':').map((timePart) => parseInt(timePart));
        return (
          startDate <= today && 
          endDate >= today &&
          task.remind === 0 &&
          task.source !== "Completed" &&
          taskHour === parseInt(hour) &&
          taskMinute <= parseInt(minute) + 5 &&
          taskMinute >= parseInt(minute) - 5
        );
      });

      if(filtered3.length > 0 && Oldfiltered3 !== filtered3.length){
        setShowReminder(true);
        Oldfiltered3 = filtered3.length;
      }
      setFilteredRemindFish(filtered3);
    };

    updateFilteredRemindFish();

    const interval = setInterval(updateFilteredRemindFish, 60000);

    return () => clearInterval(interval);
  }, [tasks]);

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

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    // Add event listener to the 'keydown' event
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      // Remove event listener when component unmounts
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []); // Empty dependency array to run the effect only once

  const toggleExpansion = () => {
    setExpanded(!expanded);
    window.scrollTo({
      top: 0,
    });
    if (expanded && document.fullscreenElement) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      document.documentElement.style.overflow = 'auto'; // Enable scroll bar
    } else if (!expanded) {
      const elem = document.documentElement;
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      }
      document.documentElement.style.overflow = 'hidden'; // Disable scroll bar
    }else{
      document.documentElement.style.overflow = 'auto'; // Enable scroll bar
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
    const totalHourse = hours + minutes/60;
    const timelineStart = 58.5;
  
    const currentPosition = timelineStart + (10.8)*(totalHourse-7);
    return `${currentPosition}vh`;
  };

  const getCurrentTimePosition2 = () => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const totalHourse = hours + minutes/60;
    const timelineStart = 58.5;
  
    const currentPosition = timelineStart + (10.8)*(totalHourse-7) - 2;
    return `${currentPosition}vh`;
  }

  const handleSave = () => {
    const currentDate = selectedDate || new Date().toISOString().split('T')[0];
    const storedData = JSON.parse(localStorage.getItem('userInputData')) || {};
    storedData[currentDate] = userInput;
    localStorage.setItem('userInputData', JSON.stringify(storedData));
  };

  const handleClear = () => {
    const currentDate = selectedDate || new Date().toISOString().split('T')[0];
    const storedData = JSON.parse(localStorage.getItem('userInputData')) || {};
    delete storedData[currentDate];
    localStorage.setItem('userInputData', JSON.stringify(storedData));
    setUserInput('');
  };
  
  useEffect(() => {
    const currentDate = selectedDate || new Date().toISOString().split('T')[0];
    const storedData = JSON.parse(localStorage.getItem('userInputData')) || {};
    const userInputForDate = storedData[currentDate] || '';
    setUserInput(userInputForDate);
  }, [selectedDate]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'userInput') {
      setUserInput(value);
    }
  };

  useEffect(() => {
    const filtered = tasks.filter((task) =>
      task.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredFish(filtered);
  }, [tasks, searchQuery]);
  

  return (
    <div className={`center-fish-tank`}>
      <img
        src={NoteIon}
        className='Note-b'
        onClick={handleImageClick}
        alt="Note"
      />
      {showInput && (
        <div>
          <textarea
              className='User-input text-input'
              name="userInput"
              value={userInput}
              onChange={handleInputChange}
              placeholder="Daily Note"
              style={{ height: userInput.split('\n').length * 1.5 + 'em' }}
            />
          <button onClick={handleSave} className="save-button">
            Save
          </button>
          <button onClick={handleClear} className="clear-button">
            Clear
          </button>
        </div>
      )}
      <div className='today-task'>
      <div className="task-header">
        <button onClick={toggleExpand} className={`ex-b ${isExpanded ? 'expanded' : 'collapsed'}`}>
          {isExpanded ? '-' : '+'}
        </button>
        <span className='Today-t'>Today's Task</span>
      </div>
        {isExpanded && filteredTodayFish.map((task) => (
          <div key={task.id} className="task-today">
            <div className="task-info">
              <span className="task-name">{task.name}--</span>
              <span className="task-time">{task.time}</span>
            </div>
          </div>
        ))}
      </div>
      {showReminder && (
        <div className='black-bg'>
          <div className="reminder">
            Reminder:
            {filteredRemindFish.map((task) => (
              <div key={task.id} className="task-close">
                <div className="task-info-close">
                  Time to work on
                  <span className="task-name-close"> {task.name} at </span>
                  <span className="task-time-close">{task.time}</span>
                  <div className="task-description-close">Description: {task.description}</div>
                </div>
              </div>
            ))}
            <button onClick={handleReminderClose} className="close-button">
              Close
            </button>
          </div>
        </div>
      )}
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
        {expanded ? 'Collapse' : 'Full Screen'}
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
                  startDate = {fish.dateRange.startDate}
                  endDate = {fish.dateRange.endDate}
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
                  startDate={task.dateRange.startDate}
                  endDate={task.dateRange.endDate}
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
          <Plants source = 'center'/>
          <Bubble source = 'center'/>
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
