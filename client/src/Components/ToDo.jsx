import './createToDo.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

const TaskList = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/tasks')
      .then((response) => {
        setTasks(response.data.data)})
      .catch(error => console.error(error));
  }, []);
  

  const updateTask = (id, index) => {
    const taskstatus = tasks[index].status;
    let status = '';
    if(taskstatus === 'Pending'){
      tasks[index].status = 'In Progress';
      status = 'In Progress';
      setTasks(tasks);
    }else if(taskstatus === 'In Progress'){
      tasks[index].status = 'Completed';
      status = 'Completed';
      setTasks(tasks);
    }else{
      tasks[index].status = 'Pending';
      status = 'Pending';
      setTasks(tasks);
    }
    console.log(status);
    const body = {status:status}
    axios.put(`http://localhost:3001/tasks/${id}`,body)
      .then(() => {
        message.success("Updated Succesafully");})
      .catch(error => console.error(error));
  };

  const deleteTask = (id) => {
    axios.delete(`http://localhost:3001/tasks/${id}`)
      .then(() => {
        message.success("Deleted Successfully");
        setTasks(tasks.filter(task => task._id !== id))})
      .catch(error => console.error(error));
  };

  const openDescription = (index) => {
    setOpen(index);
  }

  return (
    <div className='create-todo'>
      <div className="create-todo-mobile">
        <div className="create-todo-mobile-1">
          TODO - App &nbsp; <i class="fa-solid fa-carrot"></i>
        </div>
        <div className="create-todo-mobile-2">
          <div className="create-todo-mobile-2-1">
            Task List
          </div>
          <div className="create-todo-mobile-2-2">
            <ul>
              {tasks ? tasks.map((task, index) => (
                <li key={index} onClick={() => openDescription(index)}>
                  <div className="list-title">
                    <div className='list-left'>
                      <div className="list-left-top">
                        {task.title}
                      </div>
                      <div className="list-left-bottom">
                        {task.date}
                      </div>
                    </div>
                    <div className='list-right'>
                      <div className="list-right-button" onClick={()=> updateTask(task._id, index)}>
                        {task.status}
                      </div>
                    </div>
                    
                  </div>
                  <div id={index} style={{ height: index === open ? '100px' : '0px',
                    display: index === open ? 'block' : 'none' ,
                    backgroundColor: '#f0f0f0',
                    cursor:'pointer',
                    transition: '0.3s ease-in-out' }} className="list-left-description">
                      <div className="list-left-description-1" onClick={() => deleteTask(task._id)}>
                          <i class="fa-solid fa-trash"></i>
                      </div>
                      <div className="list-left-description-2">
                        {task.description}
                      </div>
                  </div>
                </li>
              )) : <>No Tasks are there</>}
            </ul>
          </div>
        </div>
        <div className="create-todo-mobile-3">
          <div className="create-todo-mobile-3-1" style={{backgroundColor:"green"}} onClick={()=>{
            navigate("/")
          }}>
            <i className="fa-solid fa-bars"></i>
          </div>
          <div className="create-todo-mobile-3-1" onClick={()=>{
            navigate("/create")
          }}>
            <i className="fa-regular fa-square-plus"></i>
          </div>
          <div className="create-todo-mobile-3-1" onClick={()=>{
            navigate("/update")
          }}>
            <i className="fa-solid fa-pen-to-square"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
