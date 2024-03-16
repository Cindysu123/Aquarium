import React, { useState, useEffect, useRef } from 'react';
import FishTank from './FishTank';
import CenterFishTank from './CenterFishTank';
import '../assets/css/TaskManager.css';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

import user from '../assets/img/user.png';
import earth from '../assets/img/earth.png';
import email from '../assets/img/email.png';
import check from '../assets/img/check.png'
import edit from '../assets/img/edit.png'

const Setting = () => {
    return(
        <div>
            <div style={{position:"absolute", top:"150vh", left:"16vw", color:"#445376"}}>
                <div style={{display:"flex", justifyContent:"space-between", width:"52vw"}}>
                    <div style={{display:"flex", width:"10vw", alignItems:"center"}}>
                        <img src={user} style={{width:"3vw"}}/>
                        <div style={{fontWeight:"bold"}}>User Name</div>
                    </div>
                    <button style={{display:"flex", border:"solid 2px #445376",width:"10vw", alignItems:"center", borderRadius:"0.5vw"}}>
                        <img src={edit} style={{width:"2vw"}}/>
                        <div style={{color:"#445376"}}>Edit Setting</div>
                    </button>
                </div>
                <hr color='#445376'></hr>
                <div style={{display:"flex", justifyContent:"space-between", padding:"1vw 3vw"}}>
                    <div style={{margin:"1vw"}}>
                        <div>
                            <div style={{display:"flex", alignItems:"center"}}>
                                <img src={earth} style={{width:"2vw"}}/>
                                <div style={{fontWeight:"bold"}}>Localization</div>
                            </div>
                            <div style={{display:"flex", width:"20vw", justifyContent:"space-between", margin:"0.5vw"}}>
                                <div>
                                    Time Zone
                                </div>
                                <select name="timeZone" id="timeZone" style={{border:"2px solid #445376", padding:"0.5vw", borderRadius:"0.5vw"}}>
                                    <option value="UTC-12:00">UTC-12:00</option>
                                    <option value="UTC-11:00">UTC-11:00</option>
                                    <option value="UTC-10:00">UTC-10:00, Hawaii</option>
                                    <option value="UTC-09:00">UTC-09:00, Alaska</option>
                                </select>
                            </div>
                            <div style={{display:"flex", width:"20vw", justifyContent:"space-between", margin:"0.5vw"}}>
                                <div>
                                    Language
                                </div>
                                <select name="language" id="language" style={{border:"2px solid #445376", padding:"0.5vw", borderRadius:"0.5vw"}}>
                                    <option value="en">English</option>
                                    <option value="es">Spanish</option>
                                    <option value="fr">French</option>
                                    <option value="de">German</option>
                                </select>
                            </div>

                        </div>
                        <div>
                            <div style={{fontWeight:"bold"}}>Account Security</div>
                            <div style={{display:"flex", width:"20vw", justifyContent:"space-between"}}>
                                <div>
                                    Two-Factor Authentication
                                </div>
                                <img src={check}/>
                            </div>
                            <button style={{color:"white", background:"#445376", borderRadius:"0.5vw", padding:"1vw", border:"none"}}>Change Password</button>
                        </div>
                    </div>
                    <div style={{margin:"1vw"}}>
                        <div style={{display:"flex"}}>
                            <img src={email} style={{width:"2vw"}}/>
                            <div style={{fontWeight:"bold"}}>Email Notification</div>
                        </div>
                        <div>
                            <div style={{display:"flex", width:"16vw", justifyContent:"space-between", margin:"1vw"}}>
                                <div>Task Assignments</div>
                                <img src={check} style={{width:"2vw"}}/>
                            </div>
                            <div style={{display:"flex", width:"16vw", justifyContent:"space-between", margin:"1vw"}}>
                                <div>Deadline Reminders</div>
                                <img src={check} style={{width:"2vw"}}/>
                            </div>
                            <div style={{display:"flex", width:"16vw", justifyContent:"space-between", margin:"1vw"}}>
                                <div>Weekly Summary</div>
                                <img src={check} style={{width:"2vw"}}/>
                            </div>
                        </div>
                        <button style={{float:"right",color:"white", background:"#bb486e", borderRadius:"0.5vw", padding:"1vw", border:"2px solid #445376"}}>Delete Account</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Setting;