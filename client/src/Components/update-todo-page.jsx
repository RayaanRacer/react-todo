// src/components/TaskForm.js
import './createToDo.css'
import React, { useState} from 'react';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import {message} from 'antd';
import { useLocation } from 'react-router-dom';

const UpdatePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { jsonData } = location.state || {};
  console.log(jsonData);
  const [task, setTask] = useState({ title: jsonData.title, description: jsonData.description, date: jsonData.data, status: jsonData.status });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3001/tasks/${jsonData.id}`, task)
    .then((res)=>{
      message.success("Task Updated successfully.")
      console.log(res);})
    .catch(error => console.error(error));
  };

  return (
    <div className='create-todo'>
        <div className="create-todo-mobile">
            <div className="create-todo-mobile-1">
                TODO - App &nbsp; <i class="fa-solid fa-carrot"></i>
            </div>
            <div className="create-todo-mobile-2">
              <div className="create-todo-mobile-2-1">
                {/* {id ? 'Edit Task' : 'Create Task'} */}
                Update Task
              </div>
              <div className="create-todo-mobile-2-2">
                    <form onSubmit={handleSubmit}>
                        <div>
                        <label for='title'>Title</label>
                        <input id='title' name="title" value={task.title} onChange={handleChange} placeholder='Title' required />
                        </div>
                        <div>
                        <label for='description'>Description</label>
                        <textarea  id='description' name="description" style={{width:"80%"}} placeholder='Description' value={task.description} onChange={handleChange} required />
                        </div>
                        <div>
                        <label>Due Date</label>
                        <input type='date' name="date"  value={task.date} onChange={handleChange} required />
                        </div>
                        <div>
                        <label>Status</label>
                        <input type='text' name="status"  value={task.status} onChange={handleChange} required />
                        </div>
                        <button type="submit">Save</button>
                    </form>
              </div>

            </div>
            <div className="create-todo-mobile-3">
          <div className="create-todo-mobile-3-1" onClick={()=>{
            navigate("/")
          }}>
            <i className="fa-solid fa-bars"></i>
          </div>
          <div className="create-todo-mobile-3-1" onClick={()=>{
            navigate("/create")
          }}>
            <i className="fa-regular fa-square-plus"></i>
          </div>
          <div className="create-todo-mobile-3-1" style={{backgroundColor:"green"}} onClick={()=>{
            navigate("/update")
          }}>
            <i className="fa-solid fa-pen-to-square"></i>
          </div>
        </div>
       
        </div>
      
    </div>
  );
};

export default UpdatePage;
