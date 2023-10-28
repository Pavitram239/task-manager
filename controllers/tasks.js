const Task = require("../models/tasks");
const asyncWrapper = require("../middlewares/async");
const { createError } = require("../errors/custom-error");
const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ status: "success", tasks: tasks });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

const getTask = asyncWrapper(async (req, res, next) => {
  const task = await Task.findOne({ _id: req.params.id });
  if (!task) {
    return next(createError("No task found", 404));
  }
  res.status(200).json({ task: task });
});

const updateTask = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const task = await Task.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return next(createError("No task found", 404));
  }
  res.status(200).json({ task: task });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) {
    return next(createError("No task found", 404));
  }
  res.status(200).json({ msg: "task deleted successfully" });
});

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
