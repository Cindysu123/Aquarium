import React, { useState, useEffect, useRef } from 'react';
import TaskManager from './components/TaskManager';
import Settingpg from './components/Setting';
import './App.css';
import img from './assets/img/Top.png';
import LoadingSpinner from './components/LoadingSpinner';
import Footer from './components/footer';
import setting from './assets/img/setting.png';
import labtop from './assets/img/labtop.png';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const settingsRef = useRef(null);
  const mainRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    document.body.style.overflowX = 'hidden';
  }, []);

  const scrollToSettings = () => {
    settingsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    document.body.style.overflow = 'hidden';
    document.body.style.overflowX = 'hidden';
  };

  const scrollToMain = () => {
    mainRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    document.body.style.overflow = '';
    document.body.style.overflowX = 'hidden';
  };

  return (
    <div className="app-container">
      <div>
        <LoadingSpinner isLoading={isLoading} />
      </div>
      <div className='fadeIn' style={{ display: 'flex', justifyContent: 'space-between', width: '90vw' }}>
        <img src={img} alt="Top" className="top-image" />
        <button
          className='home_setting'
          onClick={scrollToSettings}
          style={{ display: 'flex', alignItems: 'center', background: '#445376', border: 'none', borderRadius: '0.3vw', padding: '0.5vw 1vw' }}
        >
          <img src={setting} alt="Setting" />
          <div style={{ color: 'white', marginLeft: '0.5vw', fontSize: '1.2vw' }}>Setting</div>
        </button>
      </div>
      <div className="content-container">
        <div className="side-fish-tanks">
          <TaskManager />
        </div>
        <div className='setting_container' style={{ position: 'absolute', left: '100vw', top: '20vh' }}>
          <img src={labtop} alt="Laptop" style={{ position: 'absolute', top: '60vw', width:"88vw"}} />
          <button
            className='goback_btn' 
            style={{ 
              background: '#445376', 
              borderRadius: '0.5vw', 
              padding: '1vw', 
              position: 'absolute', 
              top: '140vh', 
              left: '16vw', 
              border: 'none', 
              width: '8vw',
              color: 'white' 
            }}
            onClick={scrollToMain}>
            <div>Go Back</div>
          </button>
          <Settingpg />
        </div>
        <div className='move_point' ref={settingsRef} style={{ position: 'absolute', left: '200vw', top: '155vh' }}></div>
        <div className='moveback_point' ref={mainRef} style={{ position: 'absolute', left: '0vw', top: '0vh' }}></div>
      </div>
      <div className='dk_green_bg' style={{width:"190vw"}}></div>
      <Footer />
    </div>
  );
};

export default App;
