import express from 'express'

import {
    getAllTasks,
    getSingleTask
} from '../controllers/tasks.js'


const router = express.Router()

router.route('/tasks')
  .get(getAllTasks)

router.route('/tasks/:taskId')
  .get(getSingleTask)


export default router