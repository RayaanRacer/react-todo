import './createToDo.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UpdateTodoList = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/tasks')
      .then((response) => {
        setTasks(response.data.data)})
      .catch(error => console.error(error));
  }, []);
  
  const navigateToDetails = (id, index) => {
    const jsonData = {
      id: tasks[index]._id,
      title: tasks[index].title,
      description: tasks[index].description,
      status:tasks[index].status
    };
    console.log(jsonData);

    navigate('/update-page', { state: { jsonData } });
  };

  return (
    <div className='create-todo'>
      <div className="create-todo-mobile">
        <div className="create-todo-mobile-1">
          TODO - App &nbsp; <i class="fa-solid fa-carrot"></i>
        </div>
        <div className="create-todo-mobile-2">
          <div className="create-todo-mobile-2-1">
            Update Task List
          </div>
          <div className="create-todo-mobile-2-2">
            <ul>
              {tasks ? tasks.map((task, index) => (
                <li key={index} style={{cursor:'text'}}>
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
                      <div className="list-right-button" style={{cursor:'pointer'}} onClick={()=> navigateToDetails(task._id, index)}>
                      <i class="fa-regular fa-pen-to-square"></i>
                      </div>
                    </div>
                    
                  </div>
                </li>
              )) : <>No Tasks are there</>}
            </ul>
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

export default UpdateTodoList;
