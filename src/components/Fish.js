import React, { useRef, useEffect, useState } from 'react';
import '../assets/css/Fish.css';
import img1 from '../assets/img/fish/Synfig Animation 1.gif';
import img2 from '../assets/img/fish/Synfig Animation 2.gif';
import img3 from '../assets/img/fish/Synfig Animation 3.gif';
import img4 from '../assets/img/fish/Synfig Animation 4.gif';
import img5 from '../assets/img/fish/Synfig Animation 5.gif';
import img6 from '../assets/img/fish/Synfig Animation 6.gif';

const Fish = ({ name, source, selectedTime, description, startDate, endDate }) => {
  const fishImages = [img1, img2, img3, img4, img5, img6];

  const getRandomColor = () => {
    let randomColor = `#473b78`;
    var timeParts = selectedTime.split(":");
    var hours = parseInt(timeParts[0]);
    if (0 < hours && hours < 10) {
      randomColor = `#f1e9e7`;
    } else if (10 <= hours && hours < 14) {
      randomColor = `#f1e9e7`;
    } else if (14 <= hours && hours < 17) {
      randomColor = `#f1e9e7`;
    } else if (17 <= hours && hours < 20) {
      randomColor = `#f1e9e7`;
    } else {
      randomColor = `#f1e9e7`;
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
  
  const topPosition = `${48 + (convertToHourse() - 7) * 10.8}vh`;

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
        <img src={selectedImage} alt="Fish" className={`fish-image1 ${num}`} style={{width:"10vw"}}/> 
        <h4 className="fish-text_name">
          {name}
        </h4>
        <div>{selectedTime}</div>
        <p style={{textAlign:"center"}} className={`fish-text_date ${source !== 'FishTank' ? 'Onlyhover' : ''}`}>
          From: {startDate} &nbsp;
          To: {endDate}
        </p>
        {/* <p className={`fish-text_description ${source !== 'FishTank' ? 'Onlyhover' : ''}`}>Description: {description}</p> */}
    </div>
  );
};

export default Fish;
