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
    console.log("CREATE TASK HIT")
    console.log("REQ.CURRENTUSER:", req.currentUser)

    const { title, description, status, dueDateTime } = req.body
    const owner = req.currentUser?._id

    const newTask = await Task.create({
      title,
      description,
      status,
      dueDateTime,
      owner
    })

    return res.status(201).json(newTask)
  } catch (error) {
    console.log(error)
    return res.status(400).json(error)
  }
}


export const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params
      const task = await Task.findById(taskId)

      if(!task) {
        return res.status(404).json({ message: 'Task Not Found' })
      }

      if(!task.owner.equals(req.currentUser._id)) {
          return res.status(401).json({ message: 'Unauthorized' })
      }

      Object.assign(task, req.body)
      await task.save()
      return res.json(task)
  } catch (error) {
      console.log(error)
  }
}

export const deleteTask = async (req, res) => {
  console.log('Hit Delete')

  try {
    const { taskId } = req.params

    // Find the task first
    const task = await Task.findById(taskId)

    if (!task) {
      return res.status(404).json({ message: "Task not found" })
    }

    // Check ownership
    if (!task.owner.equals(req.currentUser._id)) {
      return res.status(401).json({ message: "Unauthorized" })
    }

    // Now delete it
    await task.deleteOne()

    return res.sendStatus(204)

  } catch (error) {
    console.error(error)
    return res.status(400).json(error)
  }
}
