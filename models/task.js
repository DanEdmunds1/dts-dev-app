import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, maxlength: 60 },
    description: { type: String, required: false },
    status: { type: String, required: true },
    dueDateTime: { type: Date, required: true },
    owner: { type: mongoose.ObjectId, ref: 'User', required: true }
  },
  { collection: 'Tasks' } // force the exact collection name
)

export default mongoose.model('Task', taskSchema)
