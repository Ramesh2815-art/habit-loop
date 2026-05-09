import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { faCube } from '@fortawesome/free-solid-svg-icons/faCube'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAuth } from '../context/AuthContext'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/dashboard'

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setError('')
    const ok = login(username, password)
    if (ok) {
      navigate(from, { replace: true })
    } else {
      setError('Invalid credentials. Use demo / password')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-xl shadow-gray-100 p-8 w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <FontAwesomeIcon icon={faCube} className="text-white" />
          </div>
          <div>
            <p className="font-bold text-gray-800 leading-tight">HabitLoop</p>
            <p className="text-[11px] text-gray-400">Track your progress</p>
          </div>
        </div>

        <h1 className="text-xl font-bold text-gray-800 mb-1">Welcome back</h1>
        <p className="text-sm text-gray-400 mb-6">Sign in to continue</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="demo"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400"
            />
          </div>

          {error && (
            <p className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Sign In
          </button>
        </form>

        <p className="text-xs text-gray-400 text-center mt-5">
          Use <span className="font-mono text-indigo-500">demo</span> /{' '}
          <span className="font-mono text-indigo-500">password</span>
        </p>
      </div>
    </div>
  )
}

export default Login
