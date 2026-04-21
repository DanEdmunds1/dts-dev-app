import Task from "../models/task.js";

export const getAllTasks = async (req, res) => {
  const tasks = await Task.find()
  console.log(tasks)
  return res.status(200).json(tasks)
}

export const getSingleTask = async (req, res) => {
  try {
    const { taskId } = req.params
    const task = await Task.findById(taskId)
    if (!task) {
      return res.status(404).json({ message: 'There is no task of this name.' })
    }
    return res.json(task)
  } catch (error) {
    console.log(error)
    return res.status(400).json(error)
  }
}

export const createTask = async (req, res) => {
  try {
    const { title, description, status, dueDateTime } = req.body
    const newTask = await Task.create({ title, description, status, dueDateTime })
    return res.status(201).json(newTask)
  } catch (error) {
    console.log(error)
    return res.status(400).json(error)
  }
}
