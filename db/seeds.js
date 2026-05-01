import task from '../models/task.js'
import User from '../models/user.js'

import taskData from './data/tasks.js'
import userData from './data/users.js'

import mongoose from 'mongoose'
import 'dotenv/config'

async function seed() {
    try {
        // Establish connection to database
        await mongoose.connect(process.env.CONNECTION_STRING)
        console.log('Database connection established')

        console.log("DB:", mongoose.connection.name)
        console.log("Host:", mongoose.connection.host)


        // Remove existing data
        const { deletedCount: deletedTaskCount } = await task.deleteMany()
        console.log(`Deleted ${deletedTaskCount} tasks from the database`)

        const { deletedCount: deletedUserCount } = await User.deleteMany()
        console.log(`Deleted ${deletedUserCount} users from the database`)

        // Seed new data
        const usersCreated = await User.create(userData)
        console.log(`Seeded ${usersCreated.length} users to the database`)

        const ownedTasks = taskData.map(task => {
            return { ...task, owner: usersCreated[0]._id }
        })

        const tasksCreated = await task.create(ownedTasks)
        console.log(`Seeded ${tasksCreated.length} tasks to the database`)

        console.log(tasksCreated)
        console.log(usersCreated)
        console.log(ownedTasks)

        // Close connection to the database
        await mongoose.connection.close()
        console.log('Connection to database is closed')

    } catch (error) {
        console.log(error)

        await mongoose.connection.close()
        console.log('Connection to database is closed')
    }
}
seed()