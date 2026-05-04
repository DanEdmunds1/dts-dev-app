import { useEffect } from 'react'
import { Form, useActionData, useNavigate } from 'react-router-dom'
import { setToken } from '../utils/helpers/common'

export default function Login() {
    const res = useActionData()
    const navigate = useNavigate()

    useEffect(() => {
        if (res?.status === 202) {
            setToken(res.data.token)
            navigate('/')
        }
    }, [res, navigate])

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
                <button
                    onClick={() => navigate('/')}
                    className="absolute top-4 left-4 text-gray-500 hover:text-gray-700 transition duration-200"
                >
                    ← Back
                </button>

                {/* Header */}
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-8 text-center text-white">
                    <h1 className="text-4xl font-bold mb-2">🔐 Welcome Back</h1>
                    <p className="text-blue-100">Sign in to your account</p>
                </div>

                {/* Form */}
                <div className="p-8">
                    <Form method="POST" className="space-y-6">
                        {/* Email Input */}
                        <div>
                            <label className="block text-gray-700 text-sm font-semibold mb-3" htmlFor="email">
                                📧 Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email..."
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-gray-700 focus:border-blue-500 focus:outline-none transition duration-200 placeholder-gray-400"
                                required
                            />
                        </div>

                        {/* Password Input */}
                        <div>
                            <label className="block text-gray-700 text-sm font-semibold mb-3" htmlFor="password">
                                🔑 Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter your password..."
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-gray-700 focus:border-blue-500 focus:outline-none transition duration-200 placeholder-gray-400"
                                required
                            />
                        </div>

                        {/* Error Message */}
                        {res && res.status !== 202 && (
                            <div className="p-4 rounded-lg bg-red-100 text-red-700 border-2 border-red-300 text-sm font-semibold">
                                ❌ {res.data.message || 'Login failed. Please try again.'}
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 shadow-md hover:shadow-lg"
                        >
                            ✨ Login
                        </button>
                    </Form>

                    {/* Demo Credentials Info */}
                    <div className="mt-8 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                        <p className="text-sm text-gray-700 font-semibold mb-2">📝 Demo Credentials:</p>
                        <p className="text-xs text-gray-600">Email: admin@email.com</p>
                        <p className="text-xs text-gray-600">Password: pass</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
