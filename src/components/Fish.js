import React, { useRef, useEffect, useState } from 'react';
import '../assets/css/Fish.css';
import img1 from '../assets/img/fish/fish_1.gif';
import img2 from '../assets/img/fish/fish_2.gif';
import img3 from '../assets/img/fish/fish_3.gif';
import img4 from '../assets/img/fish/fish_4.gif';
import img5 from '../assets/img/fish/fish_5.gif';

const Fish = ({ name, source, selectedTime, description, startDate, endDate }) => {
  // Array of fish images
  const fishImages = [img1, img2, img3, img4, img5];

  const getRandomColor = () => {
    let randomColor = `#473b78`;
    var timeParts = selectedTime.split(":");
    var hours = parseInt(timeParts[0]);
    if (0 < hours && hours < 10) {
      randomColor = `#DFF6FD`;
    } else if (10 <= hours && hours < 14) {
      randomColor = `#CBE5FF`;
    } else if (14 <= hours && hours < 17) {
      randomColor = `#B8C9E8`;
    } else if (17 <= hours && hours < 20) {
      randomColor = `#959CC1`;
    } else {
      randomColor = `#C1BADD`;
    }
    return randomColor;
  };

  const convertToHourse = () => {
    var timeParts = selectedTime.split(":");
    var hours = parseInt(timeParts[0]);
    var minutes = parseInt(timeParts[1]);
  
    var totalHourse = hours + (minutes/60);
  
    return totalHourse;
  }
  
  const topPosition = `${62 + (convertToHourse() - 7) * 10.2 - 10}vh`;

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
    fishStyle.width = '60vh';
  }

  // Calculate the index based on the sum of lengths
  const imageIndex = (name.length + selectedTime.toString().length + description.length) % 5;
  const selectedImage = fishImages[imageIndex];

  const num = "type" + ((selectedTime.toString().length + description.length) % 6).toString();

  return (
    <div
      className={`fish ${source === 'CenterFishTank' ? 'fish-center' : ''} 
      ${source === 'ExpandedFishTank' ? 'fish-expand' : ''}
      ${source === 'FishTank' ? 'fish-tank' : ''}`
    }
      style={fishStyle}> 
        <h4 className="fish-text_name">
          {name}--{selectedTime}
        </h4>
        <p className={`fish-text_date ${source !== 'FishTank' ? 'Onlyhover' : ''}`}>
          From: {startDate} &nbsp;
          To: {endDate}
        </p>
        <p className={`fish-text_description ${source !== 'FishTank' ? 'Onlyhover' : ''}`}>Description: {description}</p>
      <img src={selectedImage} alt="Fish" className={`fish-image1 ${num}`} />
    </div>
  );
};

export default Fish;
