import React, { useState, useEffect } from 'react';
import icon from '../assets/img/icon2.png'
const Footer = () => {
    return(
        <div style={{background:"#2c575a", width:"100vw", position:"absolute", top:"260vh", left:"0", height:"30vh", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
            <img src={icon} style={{margin:"4vw"}}/>
            <div style={{color:"#e0f2f0", margin:"4vw"}} className='normal_text jura'>Designed By Cindy Su</div>
        </div>
    );
};

export default Footer;