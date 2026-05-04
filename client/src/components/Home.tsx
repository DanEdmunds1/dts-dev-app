import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { type Task } from '../types/Task'
import { activeUser } from '../utils/helpers/common'
import { deleteTask } from '../utils/actions/task'

export default function Home() {
    const [tasks, setTasks] = useState<Task[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [openMenuId, setOpenMenuId] = useState<string | null>(null)

    const userId = activeUser()
    const user = userId

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/tasks')
                if (!response.ok) throw new Error('Failed to fetch tasks')
                const data = await response.json()
                setTasks(data)
            } catch (err: any) {
                console.error('Error fetching tasks:', err)
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchTasks()
    }, [])

    const getStatusColor = (status: string) => {
        switch(status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800'
            case 'in-progress': return 'bg-blue-100 text-blue-800'
            case 'completed': return 'bg-green-100 text-green-800'
            default: return 'bg-gray-100 text-gray-800'
        }
    }

    const getStatusEmoji = (status: string) => {
        switch(status) {
            case 'pending': return '⏳'
            case 'in-progress': return '🚀'
            case 'completed': return '✅'
            default: return '📌'
        }
    }

    const handleDeleteTask = async (taskId: string) => {
        if (!confirm('Are you sure you want to delete this task?')) return
        
        try {
            const response = await deleteTask(taskId)
            if (response.status !== 204 && response.status !== 200) throw new Error('Failed to delete task')
            setTasks(tasks.filter(t => t._id !== taskId))
            setOpenMenuId(null)
        } catch (err: any) {
            console.error('Error deleting task:', err)
            alert('Failed to delete task')
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 py-8">
            <div className="max-w-6xl mx-auto">
                {/* Header Card */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-8 text-center text-white">
                        <h1 className="text-5xl font-bold mb-2">Task Manager</h1>
                        <p className="text-blue-100">Welcome {user}</p>
                    </div>
                    <div className="p-8 text-center">
                        <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                            Organize your tasks, set deadlines, and track your progress all in one place.
                        </p>
                        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                            <Link 
                                to="/create-task"
                                className="inline-block bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 shadow-md hover:shadow-lg"
                            >
                                ✨ Create New Task
                            </Link>
                            <Link 
                                to="/login"
                                className="inline-block bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 shadow-md hover:shadow-lg"
                            >
                                🔐 Login
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Tasks Section */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">📋 All Tasks</h2>
                    
                    {loading && (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">⏳ Loading tasks...</p>
                        </div>
                    )}

                    {error && (
                        <div className="bg-red-100 text-red-700 p-4 rounded-lg border-2 border-red-300">
                            ❌ Error loading tasks: {error}
                        </div>
                    )}

                    {!loading && tasks.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">No tasks yet. Create one to get started! 🎯</p>
                        </div>
                    )}

                    {!loading && tasks.length > 0 && (
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {tasks.map((task) => {
                                const isOwnedByCurrentUser = task.owner === userId
                                return (
                                    <div key={task._id} className={`border-2 rounded-lg p-4 hover:shadow-lg transition duration-200 relative ${isOwnedByCurrentUser ? 'border-blue-400 bg-blue-50' : 'border-gray-200 bg-gray-50'}`}>
                                        <div className="flex justify-between items-start mb-3">
                                            <h3 className="text-lg font-bold text-gray-800 flex-1">{task.title}</h3>
                                            <div className="flex items-center gap-2">
                                                <span className={`px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap ${getStatusColor(task.status)}`}>
                                                    {getStatusEmoji(task.status)} {task.status}
                                                </span>
                                                {isOwnedByCurrentUser && (
                                                    <div className="relative">
                                                        <button
                                                            onClick={() => setOpenMenuId(openMenuId === task._id ? null : task._id)}
                                                            className="p-2 hover:bg-blue-200 rounded-full transition"
                                                            title="More options"
                                                        >
                                                            ⋮
                                                        </button>
                                                        {openMenuId === task._id && (
                                                            <div className="absolute right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                                                                <Link
                                                                    to={`/edit-task/${task._id}`}
                                                                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm"
                                                                    onClick={() => setOpenMenuId(null)}
                                                                >
                                                                    ✏️ Edit
                                                                </Link>
                                                                <button
                                                                    onClick={() => handleDeleteTask(task._id)}
                                                                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 text-sm border-t border-gray-200"
                                                                >
                                                                    🗑️ Delete
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        
                                        {task.description && (
                                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{task.description}</p>
                                        )}
                                        
                                        {task.dueDateTime && (
                                            <div className="text-xs text-gray-500">
                                                ⏰ Due: {new Date(task.dueDateTime).toLocaleDateString()} {new Date(task.dueDateTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                            </div>
                                        )}
                                        
                                        <div className="mt-3 pt-3 border-t border-gray-200">
                                            <span className={`text-xs font-semibold ${isOwnedByCurrentUser ? 'text-blue-600 bg-blue-100' : 'text-gray-600 bg-gray-100'} px-2 py-1 rounded`}>
                                                {isOwnedByCurrentUser ? '👤 Your Task' : '👥 Other User\'s Task'}
                                            </span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}