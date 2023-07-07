import React, { useState, useEffect } from 'react';
import Fish from './Fish';
import './ExpandedFishTank.css';
import bg1 from '../img/fish/bg1.png';
import f1 from '../img/fish/f1.png';
import underwaterSound from '../Sound/underwater.mp3';
import On from '../img/fish/Volume Up.png';
import Off from '../img/fish/Volume Off.png';

const ExpandedFishTank = ({ tasks, waterHue, floorHue }) => {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
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

  return (
    <div className="expanded-fish-tank">
      <div className="fish-container">
        {tasks.map((task) => (
          <div key={task.id} className="task2">
            <Fish
              name={task.name}
              source="ExpandedFishTank"
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
      <button onClick={toggleMusic} className="music-b">
        <img src={isMusicPlaying ? On : Off} alt="Music Icon"/>
      </button>
    </div>
  );
};

export default ExpandedFishTank;
