// src/App.js

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TaskList from "./Components/ToDo";
import TaskForm from "./Components/createToDo";
import UpdateTodoList from "./Components/updateList";
import UpdatePage from "./Components/update-todo-page";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/create" element={<TaskForm />} />
        <Route path="/edit/:id" element={<TaskForm />} />
        <Route path="/update" element={<UpdateTodoList />} />
        <Route path="/update-page" element={<UpdatePage />} />
      </Routes>
    </Router>
  );
};

export default App;
