import React, { useState, useEffect } from 'react';
import bubble from '../assets/img/bubble.png'
import "../assets/css/bubble.css"
const Bubble = ({ source }) => {
    return(
        <div className={`Bubble-container ${source === 'Expanded' ? 'moveUp' : ''} ${source === 'center' ? 'centered' : ''}`}>
            <img src={bubble} className='bubble one'></img>
            <img src={bubble} className='bubble two'></img>
            <img src={bubble} className='bubble three'></img>
            <img src={bubble} className='bubble four'></img>
            <img src={bubble} className='bubble five'></img>
            <img src={bubble} className='bubble six'></img>
        </div>
    );
};

export default Bubble;