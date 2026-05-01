import express from 'express'

import {
  getAllTasks,
  getSingleTask,
  createTask
} from '../controllers/tasks.js'

import { register, login, getProfile, updateUserImage } from '../controllers/users.js'

import secureRoute from './secureRoute.js'

const router = express.Router()

router.route('/tasks')
  .get(getAllTasks)
  .post(secureRoute, createTask)

router.route('/tasks/:taskId')
  .get(getSingleTask)

router.route('/login')
  .post(login)

router.route('/register')
  .post(register)

router.route('/users')
  .get(secureRoute, getProfile)
  .put(secureRoute, updateUserImage)

export default router