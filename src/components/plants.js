import React, { useState, useEffect } from 'react';
import p1 from '../assets/img/plants/Synfig Animation 8.gif';
import p2 from '../assets/img/plants/Synfig Animation 9.gif';
import p3 from '../assets/img/plants/Synfig Animation 10.gif';
import p4 from '../assets/img/plants/Synfig Animation 11.gif';
import p5 from '../assets/img/plants/Synfig Animation 13.gif';
import p6 from '../assets/img/plants/Synfig Animation 7.gif';
import p7 from '../assets/img/plants/Synfig Animation 12.gif';
import '../assets/css/Plants.css';

const Plants = ({source}) => {
      
      return (
        <div className={`plants-container ${source === 'center' ? 'center-p' : 'expanded-p'}`}>
          <img src={p2} className={`p2 plants`}/>
          <img src={p3} className={`p3 plants`}/>
          <img src={p4} className={`p4 plants`}/>
          <img src={p5} className={`p5 plants`}/>
          <img src={p6} className={`p6 plants`}/>
          <img src={p7} className={`p7 plants`}/>
          <img src={p1} className={`p1 plants`}/>
        </div>
      );
      
};

export default Plants;