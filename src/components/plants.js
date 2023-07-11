import React, { useState, useEffect } from 'react';
import p1 from '../assets/img/plants/plant_1.png';
import p2 from '../assets/img/plants/plant_2.png';
import p3 from '../assets/img/plants/plant_3.png';
import p4 from '../assets/img/plants/plant_4.png';
import p5 from '../assets/img/plants/plant_5.png';
import p6 from '../assets/img/plants/plant_6.png';
import p7 from '../assets/img/plants/plant_7.png';
import p8 from '../assets/img/plants/plant_8.png';
import p9 from '../assets/img/plants/plant_9.png';
import p10 from '../assets/img/plants/plant_10.png';
import p11 from '../assets/img/plants/plant_11.png';
import p12 from '../assets/img/plants/plant_12.png';
import p13 from '../assets/img/plants/plant_13.png';
import p14 from '../assets/img/plants/plant_14.png';
import p15 from '../assets/img/plants/plant_15.png';
import p16 from '../assets/img/plants/plant_16.png';
import pl1 from '../assets/img/plants/plant_long_1.png';
import pl2 from '../assets/img/plants/plant_long_2.png';
import pl3 from '../assets/img/plants/plant_long_3.png';
import shell from '../assets/img/plants/shell_1.png';
import '../assets/css/Plants.css';

const Plants = ({source}) => {
    const [randomPlants, setRandomPlants] = useState([]);
    const [randomLongPlants, setRandomLongPlants] = useState([]);

    const plantImages = [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15, p16];
    const longPlantImages = [pl1, pl2, pl3];
    const getRandomPlants = (images, count) => {
        const shuffled = images.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
      };
      
      useEffect(() => {
        const selectedPlants = getRandomPlants(plantImages, 6);
        const selectedLongPlants = getRandomPlants(longPlantImages, 3);
        setRandomPlants(selectedPlants);
        setRandomLongPlants(selectedLongPlants);
      }, []);
      
      return (
        <div className={`plants-container ${source === 'center' ? 'center-p' : 'expanded-p'}`}>
          {randomPlants.map((image, index) => (
            <img key={index} src={image} className={`p${index + 1} plants`} />
          ))}
          {randomLongPlants.map((image, index) => (
            <img key={index} src={image} className={`pl${index + 1} plants`} />
          ))}
          <img src={shell} className='Shell'></img>
        </div>
      );
      
};

export default Plants;