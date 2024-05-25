import taskModel from "../models/taskModel.js";
import asynchandler from "express-async-handler";

const createTask = asynchandler(async (req, res) => {
  const { title, description, date } = req.body;
  if (!title || !description || !date)
    return res
      .status(400)
      .json({ message: "Provide complete data", success: false });

  const task = new taskModel({
    title,
    description,
    date,
  });
  await task.save();
  return res
    .status(200)
    .json({ message: "Task Created successfully.", success: true });
});

const updateTask = asynchandler(async (req, res) => {
  const id = req.params.id;
  let { title, description, date, status } = req.body;
  if (!id)
    return res
      .status(400)
      .json({ message: "Provide complete data", success: false });
  const task = await taskModel.findById(id);
  if (!task)
    return res.status(400).json({ message: "Task not found", success: false });

  if (!title) title = task.title;
  if (!description) description = task.description;
  if (!date) date = task.date;
  if (!status) status = task.status;

  await taskModel.findByIdAndUpdate(
    id,
    {
      title,
      description,
      date,
      status,
    },
    { new: true }
  );

  return res
    .status(200)
    .json({ message: "Task Updated Successfully", success: true });
});

const getTask = asynchandler(async (req, res) => {
  const id = req.params.id;
  if (!id)
    return res
      .status(400)
      .json({ message: "Provide complete data", success: false });

  const task = await taskModel.findById(id);
  if (!task)
    return res
      .status(400)
      .json({ message: "No such task found", success: false });

  return res
    .status(200)
    .json({ message: "Task sent successfully", data: task, success: true });
});

const getAllTasks = asynchandler(async (req, res) => {
  const task = await taskModel.find({});
  if (task.length === 0)
    return res.status(400).json({ message: "No Task found", success: false });
  return res
    .status(200)
    .json({ message: "Tasks Sent Successfully", data: task, success: true });
});

const deleteTask = asynchandler(async (req, res) => {
  const id = req.params.id;
  if (!id)
    return res
      .status(400)
      .json({ message: "Provide complete data", success: false });
  await taskModel.findByIdAndDelete(id);
  return res
    .status(200)
    .json({ message: "Deleted Successfully", success: true });
});

export { getAllTasks, updateTask, createTask, deleteTask, getTask };
