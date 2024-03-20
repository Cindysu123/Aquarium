
import React from 'react';
import '../assets/css/Modal.css';

import close2 from '../assets/img/close2.png'

import bg from '../assets/img/popup_bg.png'

const Modal = ({ isOpen, close, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={close}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img className='close_btn' src={close2} onClick={close} style={{position:"absolute", right:"2vw", cursor:"pointer"}}></img>
        {children}
      </div>
      <img className='popup_bg' src={bg} style={{top:"-36vw"}}/>
      <div className='popup_bg2'></div>
    </div>
  );
};

export default Modal;
