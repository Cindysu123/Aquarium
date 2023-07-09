import React, { useState, useEffect } from 'react';
import Fish from './Fish';
import './ExpandedFishTank.css';
import bg1 from '../img/fish/bg1.png';
import f1 from '../img/fish/f1.png';
import underwaterSound from '../Sound/underwater.mp3';
import On from '../img/fish/Volume Up.png';
import Off from '../img/fish/Volume Off.png';
import Plants from './plants';
import Bubble from './bubble'

const ExpandedFishTank = ({ tasks, waterHue, floorHue }) => {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const audio = new Audio(underwaterSound);

  useEffect(() => {
    audio.loop = true;

    if (isMusicPlaying) {
      audio.play().catch((error) => {
        console.error('Failed to play audio:', error);
      });
    } else {
      audio.pause();
      audio.currentTime = 0;
    }

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [isMusicPlaying]);

  const toggleMusic = () => {
    setIsMusicPlaying(!isMusicPlaying);
  };

  const handleMouseMove = (event) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  const calculateMovementOffset = (movementRange) => {
    const maxOffset = 10;
    const offset = (window.innerWidth / 2 - mousePosition.x) / (window.innerWidth / 2) * movementRange;
    return Math.max(-maxOffset, Math.min(maxOffset, offset));
  };

  const waterOffset = calculateMovementOffset(10);
  const floorOffset = 0;

  return (
    <div className="expanded-fish-tank" onMouseMove={handleMouseMove}>
      <div className="fish-container">
        {tasks.map((task) => (
          <div key={task.id} className="task2">
            <Fish
              name={task.name}
              source="ExpandedFishTank"
              selectedTime={task.time}
              description={task.description}
              date={task.date}
            />
          </div>
        ))}
      </div>
      <img
        src={bg1}
        className="background-water"
        style={{
          filter: `hue-rotate(${waterHue}deg) blur(2px)`,
          transform: `translateX(${waterOffset}px)`,
        }}
      />
      <img
        src={f1}
        className="background-floor"
        style={{
          filter: `hue-rotate(${floorHue}deg)`,
          transform: `translateX(${floorOffset}px)`,
        }}
      />
      <Plants source = 'expanded'/>
      <button onClick={toggleMusic} className="music-b">
        <img src={isMusicPlaying ? On : Off} alt="Music Icon" />
      </button>
      <Bubble source='expanded'/>
    </div>
  );
};

export default ExpandedFishTank;
