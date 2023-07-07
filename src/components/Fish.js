import React, { useRef, useEffect, useState } from 'react';
import './Fish.css';
import img1 from '../img/fish/fish_1.gif';
import img2 from '../img/fish/fish_2.gif';
import img3 from '../img/fish/fish_3.gif';
import img4 from '../img/fish/fish_4.gif';
import img5 from '../img/fish/fish_5.gif';

const Fish = ({ name, source, selectedTime, description }) => {
  // Array of fish images
  const fishImages = [img1, img2, img3, img4, img5];

  const getRandomColor = () => {
    let randomColor = `#473b78`;
    if (0 < selectedTime && selectedTime < 10) {
      randomColor = `#DFF6FD`;
    } else if (10 <= selectedTime && selectedTime < 14) {
      randomColor = `#CBE5FF`;
    } else if (14 <= selectedTime && selectedTime < 17) {
      randomColor = `#B8C9E8`;
    } else if (17 <= selectedTime && selectedTime < 20) {
      randomColor = `#959CC1`;
    } else {
      randomColor = `#C1BADD`;
    }
    return randomColor;
  };

  const topPosition = `${45 + (selectedTime - 7) * 10.5}vh`;
  const topPosition2 = `${(selectedTime - 7) * 10.5 / 2 - 20}vh`;

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
    fishStyle.width = '60vh';
  }

  if (source === 'FishTank') {
    fishStyle.backgroundColor = document.fishColors[name];
    fishStyle.width = '30vh';
    fishStyle.color = '#51516F';
    fishStyle.padding = '10px';
    fishStyle.margin = '10px';
  }

  if (source === 'ExpandedFishTank') {
    fishStyle.position = 'absolute';
    fishStyle.top = topPosition2;
    fishStyle.width = '60vh';
  }

  // Calculate the index based on the sum of lengths
  const imageIndex = (name.length + selectedTime.toString().length + description.length) % 5;
  const selectedImage = fishImages[imageIndex];

  return (
    <div
      className={`fish ${source === 'CenterFishTank' ? 'fish-center' : ''} ${
        source === 'ExpandedFishTank' ? 'fish-expand' : ''
      }`}
      style={fishStyle}
    >
      <h4 className="fish-text_name">
        {name} ({selectedTime}:00)
      </h4>
      <h4 className={`fish-text_description ${source === 'SearchResults' ? 'remove' : ''}`}>{description}</h4>
      <img src={selectedImage} alt="Fish" className="fish-image1" />
    </div>
  );
};

export default Fish;
