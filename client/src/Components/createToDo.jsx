// src/components/TaskForm.js
import './createToDo.css'
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {message} from 'antd';

const TaskForm = () => {
  const navigate = useNavigate();
  const [task, setTask] = useState({ title: '', description: '', date: '' });
  const naviagte = useNavigate();
  const { id } = useParams();
  console.log(task);

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3001/tasks/${id}`)
        .then(response => setTask(response.data))
        .catch(error => console.error(error));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      axios.put(`http://localhost:3001/tasks/${id}`, task)
        .then(() => naviagte('/'))
        .catch(error => console.error(error));
    } else {
      axios.post('http://localhost:3001/tasks', task)
        .then((res)=>{
          message.success("Task added successfully.")
          console.log(res);})
        .catch(error => console.error(error));
    }
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
                Create New Task
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
          <div className="create-todo-mobile-3-1" style={{backgroundColor:"green"}} onClick={()=>{
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

export default TaskForm;
