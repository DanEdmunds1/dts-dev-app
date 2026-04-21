import task from '../models/task.js'
import taskData from './data/tasks.js'

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

        // Seed new data
        const tasksCreated = await task.create(taskData)
        console.log(`Seeded ${tasksCreated.length} tasks to the database`)

        console.log(tasksCreated)

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