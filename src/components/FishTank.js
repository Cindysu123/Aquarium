import React, { useState } from 'react';
import Fish from './Fish';
import Modal from './Modal';
import '../assets/css/FishTank.css';

import img1 from '../assets/img/fish/Synfig Animation 1.gif';
import img2 from '../assets/img/fish/Synfig Animation 2.gif';
import img3 from '../assets/img/fish/Synfig Animation 3.gif';
import img4 from '../assets/img/fish/Synfig Animation 4.gif';
import img5 from '../assets/img/fish/Synfig Animation 5.gif';
import img6 from '../assets/img/fish/Synfig Animation 6.gif';

import check from '../assets/img/check.png';
import file from '../assets/img/file.png';

const FishTank = ({ tasks, tankName, onTaskDelete, setTasks }) => {
  const [expanded, setExpanded] = useState(true);
  const [selectedTank, setSelectedTank] = useState(tankName);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const toggleExpansion = () => {
    setSelectedTank(tankName);
    setExpanded(!expanded);
  };

  const handleTankChange = (taskId, event) => {
    const newSelectedTank = event.target.value;
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, tank: newSelectedTank };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const getColor = () => {
    let color = ``;
    if (tankName === 'To do') {
      color = `#8bd1c7`;
    } else if (tankName === 'In Progress') {
      color = `#f0b8bd`;
    } else {
      color = `#f0cfaa`;
    }
    return color;
  };

  const handleTaskDelete = (taskId) => {
    onTaskDelete(taskId);
  };

  const handleDetailClick = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const getFishImage = (task) => {
    const fishImages = [img1, img2, img3, img4, img5, img6];
    const imageIndex = (task.name.length + task.time.toString().length + task.description.length) % fishImages.length;
    return fishImages[imageIndex];
  };

  return (
    <div className={`fish-tank`}>
      <div className="button-container">
        <button onClick={toggleExpansion} style={{border:"2px solid #445376"}} className={`expand-b ${expanded ? 'expanded' : 'collapsed'}`}>
          {expanded ? '-' : '+'}
        </button>
        <span className={`tank-name`}>{tankName}</span>
        <div className='Task-count' style={{ backgroundColor: getColor() }}>{tasks.length}</div>
      </div>
      {tasks.map((task) => (
        <div key={task.id} className={`task ${expanded ? 'expanded' : 'collapsed'}`}>
          <Fish
            name={task.name}
            source="FishTank"
            selectedTime={task.time}
            description={task.description}
            startDate={task.dateRange.startDate}
            endDate={task.dateRange.endDate}
          />
          <div style={{display:"flex", justifyContent:"space-between"}}>
            <select
              value={selectedTank}
              onChange={(event) => handleTankChange(task.id, event)}
              className="tank-select"
            >
              {<option value="To do">To do</option>}
              {<option value="In Progress">In Progress</option>}
              {<option value="Completed">Completed</option>}
            </select>
            <button style={{padding:"0.5vw 1vw", border:"none", background:"#445376", borderRadius:"0.2vw", color:"white", fontSize:"2.6vh", cursor:"pointer"}}
              onClick={handleDetailClick.bind(null, task)}>Detail</button>
            <button onClick={() => handleTaskDelete(task.id)} className="delete-task-button">
              Delete
            </button>
          </div>
        </div>
      ))}
      <Modal isOpen={isModalOpen} close={() => setIsModalOpen(false)}>
        {selectedTask && (
          <div style={{marginBottom:"10vw"}}>
            <div style={{display:"flex", margin:"0 auto" , width:"20vw", alignItems:"center"}}>
              <img className="flip-horizontal" src={getFishImage(selectedTask)} alt="Fish" style={{width:"5vw", height:"3vw"}} />
              <h3 style={{fontWeight:"normal", fontSize:"2vw"}}>{selectedTask.name}</h3>
              <img src={getFishImage(selectedTask)} alt="Fish" style={{width:"5vw", height:"3vw"}}/>
            </div>
            <div style={{display:"flex", justifyContent:"space-between", width:"60vw", margin:"0 auto"}}>
              <div style={{fontWeight:"bold", borderStyle:"dashed", borderWidth:"4px", borderColor:"#445376", borderRadius:"0.8vw", padding:"1vw", width:"30vw", textDecoration:"underline"}}>
                <div style={{margin:"0.8vw", fontSize:"1.4vw"}}>Status: In Progress</div>
                <div style={{margin:"0.8vw", fontSize:"1.4vw"}}>Priority: High</div>
                <div style={{margin:"0.8vw", fontSize:"1.4vw"}}>Due At: {selectedTask.time}</div>
                <div style={{margin:"0.8vw", fontSize:"1.4vw"}}>From: {selectedTask.dateRange.startDate}</div>
                <div style={{margin:"0.8vw", fontSize:"1.4vw"}}>To: {selectedTask.dateRange.endDate}</div>
              </div>
              <div style={{fontSize:"1.4vw"}}>
                <div style={{display:"flex"}}>
                  <img src={file}/>
                  <div>Attachment</div>
                </div>
                <ul>
                  <li>Brand Guidelines.pdf</li>
                  <li>Website Redesign Requirements.docx</li>
                  <li>Initial Wireframe Ideas.sketch</li>
                </ul>
              </div>
            </div>
            <div style={{width:"60vw", margin:"2vw auto"}}>
              <div style={{fontWeight:"bold", fontSize:"1.4vw"}}>Description</div>
              <div style={{textDecoration:"underline", fontSize:"1.2vw"}}>{selectedTask.description}</div>
            </div>
            <div style={{borderRadius:"1vw", width:"60vw", margin:"2vw auto", borderStyle:"dashed", borderWidth:"4px", borderColor:"#445376"}}>
              <div style={{margin:"1vw",fontWeight:"bold", fontSize:"1.4vw"}}>Subtasks:</div>
              <ol style={{fontSize:"1.2vw", margin:"1vw"}}>
                <li>
                  <div style={{display:"flex", justifyContent:"space-between"}}>
                    <div style={{display:"flex"}}>
                      <div style={{fontWeight:"bold"}}>Research Design Trends</div>
                      <div>- Due: March 20, 2024</div>
                    </div>
                    <img src={check}/>
                  </div>
                </li>
                <li>
                  <div style={{display:"flex", justifyContent:"space-between"}}>
                    <div style={{display:"flex"}}>
                      <div style={{fontWeight:"bold"}}>Create Wireframes</div>
                      <div>- Due: March 25, 2024</div>
                    </div>
                    <img src={check}/>
                  </div>
                </li>
                <li>
                  <div style={{display:"flex", justifyContent:"space-between"}}>
                    <div style={{display:"flex"}}>
                      <div style={{fontWeight:"bold"}}>Develop Mockups</div>
                      <div>- Due: April 1, 2024</div>
                    </div>
                    <img src={check}/>
                  </div>
                </li>
                <li>
                  <div style={{display:"flex", justifyContent:"space-between"}}>
                    <div style={{display:"flex"}}>
                      <div style={{fontWeight:"bold"}}>Gather Feedback on Mockups</div>
                      <div>- Due: April 5, 2024</div>
                    </div>
                    <img src={check}/>
                  </div>
                </li>
                <li>
                  <div style={{display:"flex", justifyContent:"space-between"}}>
                    <div style={{display:"flex"}}>
                      <div style={{fontWeight:"bold"}}>Finalize Design</div>
                      <div>- Due: April 10</div>
                    </div>
                    <img src={check}/>
                  </div>
                </li>
                <li>
                  <div style={{display:"flex", justifyContent:"space-between"}}>
                    <div style={{display:"flex"}}>
                      <div style={{fontWeight:"bold"}}>Implement Design on Website</div>
                      <div>- Due: April 14, 2024</div>
                    </div>
                    <img src={check}/>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default FishTank;