import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { activeUser, getToken } from '../utils/helpers/common'
import { updateTask } from '../utils/actions/task'
import { singleTaskLoader } from "../utils/loaders";


export default function EditTask() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState('pending')
    const [dueDateTime, setDueDateTime] = useState('')
    const [message, setMessage] = useState('')
    const [isLoading, setIsLoading] = useState(true)

    const navigate = useNavigate()
    const { id } = useParams<{ id: string }>()
    const userId = activeUser()

    useEffect(() => {
        if (!userId) {
            window.alert('You must be logged in to edit a task.')
            navigate('/login')
        }
    }, [userId])

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const task = await singleTaskLoader(id || '')
                setTitle(task.title)
                setDescription(task.description || '')
                setStatus(task.status)
                // Format the date for the datetime-local input
                const date = new Date(task.dueDateTime)
                const formattedDate = date.toISOString().slice(0, 16)
                setDueDateTime(formattedDate)
            } catch (error) {
                console.error('Error:', error)
                setMessage('An error occurred while loading the task.')
            } finally {
                setIsLoading(false)
            }
        }
        fetchTask()
    }, [id])

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        try {
            if (!userId) {
                setMessage('You must be logged in to update a task.')
                return
            }

            // Create FormData for the update
            const formData = new FormData()
            formData.append('title', title)
            formData.append('description', description)
            formData.append('status', status)
            formData.append('dueDateTime', new Date(dueDateTime).toISOString())

            const request = new Request('', {
                method: 'PUT',
                body: formData
            })

            const response = await updateTask(request, id!)

            if (response.status === 200 || response.status === 204) {
                setMessage('Task updated successfully!')
                setTimeout(() => navigate('/'), 1500)
            } else {
                setMessage('Failed to update task.')
            }
        } catch (error) {
            console.error('Error:', error)
            setMessage('An error occurred while updating the task.')
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 py-8">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800">Edit Task</h1>
                    <Link to="/" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition duration-200">
                        ← Back
                    </Link>
                </div>

                {/* Form Container */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    {isLoading ? (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">⏳ Loading task...</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Title Input */}
                            <div>
                                <label className="block text-gray-700 text-sm font-semibold mb-3" htmlFor="title">
                                    📝 Task Title
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Enter task title..."
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-gray-700 focus:border-blue-500 focus:outline-none transition duration-200 placeholder-gray-400"
                                    required
                                />
                            </div>

                            {/* Description Input */}
                            <div>
                                <label className="block text-gray-700 text-sm font-semibold mb-3" htmlFor="description">
                                    📄 Description
                                </label>
                                <textarea
                                    id="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Add more details about your task..."
                                    rows={4}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-gray-700 focus:border-blue-500 focus:outline-none transition duration-200 placeholder-gray-400 resize-vertical"
                                />
                            </div>

                            {/* Status Input */}
                            <div>
                                <label className="block text-gray-700 text-sm font-semibold mb-3" htmlFor="status">
                                    🎯 Status
                                </label>
                                <select
                                    id="status"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-gray-700 focus:border-blue-500 focus:outline-none transition duration-200 cursor-pointer bg-white"
                                >
                                    <option value="pending">⏳ Pending</option>
                                    <option value="in-progress">🚀 In Progress</option>
                                    <option value="completed">✅ Completed</option>
                                </select>
                            </div>

                            {/* Due Date Input */}
                            <div>
                                <label className="block text-gray-700 text-sm font-semibold mb-3" htmlFor="dueDateTime">
                                    ⏰ Due Date & Time
                                </label>
                                <input
                                    type="datetime-local"
                                    id="dueDateTime"
                                    value={dueDateTime}
                                    onChange={(e) => setDueDateTime(e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-gray-700 focus:border-blue-500 focus:outline-none transition duration-200"
                                    required
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 shadow-md hover:shadow-lg mt-8"
                            >
                                ✏️ Update Task
                            </button>
                        </form>
                    )}

                    {/* Message Display */}
                    {message && (
                        <div className={`mt-6 p-4 rounded-lg font-semibold text-center ${message.includes('successfully')
                            ? 'bg-green-100 text-green-700 border-2 border-green-300'
                            : 'bg-red-100 text-red-700 border-2 border-red-300'
                            }`}>
                            {message}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
