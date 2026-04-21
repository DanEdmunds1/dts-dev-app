import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <>
            <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-lg shadow-md text-center">
                <h1 className="text-4xl font-bold mb-4">Task Manager</h1>
                <p className="text-gray-600 mb-8">Organize your tasks and stay productive</p>
                <Link 
                    to="/create-task"
                    className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline"
                >
                    Create New Task
                </Link>
            </div>
        </>
    )
}