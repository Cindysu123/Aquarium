import React, { useRef, useEffect, useState } from 'react';
import './Fish.css';
import img1 from '../img/fish/fish_1.gif';
import img2 from '../img/fish/fish_2.gif';
import img3 from '../img/fish/fish_3.gif';
import img4 from '../img/fish/fish_4.gif';
import img5 from '../img/fish/fish_5.gif';

const Fish = ({ name, source, selectedTime, description }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const getRandomColor = () => {
    let randomColor = `#473b78`;
    if(0<{selectedTime}<10){
      randomColor = `#DFF6FD`
    } else if(10<={selectedTime}<14){
      randomColor = `#CBE5FF`
    } else if(14<={selectedTime}<17){
      randomColor = `#B8C9E8`
    } else if(17<={selectedTime}<20){
      randomColor = `#959CC1`
    } else {
      randomColor = `#C1BADD`
    }
    return randomColor;
  };

  const topPosition = (20 + (selectedTime-7) * 30.5) + '%';

  if (!document.fishColors) {
    document.fishColors = {};
  }

  if (!document.fishColors[name]) {
    document.fishColors[name] = getRandomColor();
  }

  const fishStyle = {};

if (source === 'CenterFishTank') {
  fishStyle.position = 'absolute';
  fishStyle.top = topPosition;
  fishStyle.width = '30%';
  if (!isHovered) {
    fishStyle.animationName = 'swimAnimation';
  }
}

if (source === 'FishTank') {
  fishStyle.backgroundColor = document.fishColors[name];
  fishStyle.width = '70%';
  fishStyle.color = '#51516F';
}


  useEffect(() => {
    const flipInterval = setInterval(() => {
      setIsFlipped((prevState) => !prevState);
    }, 2000);

    return () => {
      clearInterval(flipInterval);
    };
  }, []);

  return (
    <div
      className={`fish ${source === 'CenterFishTank' ? 'fish-center' : ''}`}
      style={fishStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h4 className="fish-text_name">{name} ({selectedTime}:00)</h4>
      <h4 className="fish-text_description">{description}</h4>
      <img src={img2} style={isFlipped & source === 'CenterFishTank' ? { transform: 'scaleX(-1)' } : { transform: 'scaleX(1)' }} alt="Fish" className='fish-image1' />
    </div>
  );
};

export default Fish;
