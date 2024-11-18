import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon, UserCircleIcon, LockClosedIcon } from '@heroicons/react/24/outline';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const baseURL = process.env.REACT_APP_API_URL || 'https://blood-bridge-admin.vercel.app';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post(`${baseURL}/api/login`, { username, password });
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        onLogin();
        navigate('/dashboard');
      } else {
        setError('Invalid response from server. Please try again.');
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setError(error.response.data.message || 'Invalid credentials. Please try again.');
      } else if (error.request) {
        // The request was made but no response was received
        setError('No response from server. Please check your internet connection.');
      } else {
        // Something happened in setting up the request that triggered an Error
        setError('An error occurred. Please try again.');
      }
      console.error('Login error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-500 to-red-600 p-4">
      <div className="max-w-4xl w-full bg-white md:rounded-2xl shadow-2xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Side - Image and Welcome */}
          <div className="md:flex flex-col justify-center items-center bg-red-100 p-12">
            <img
              src="/img/blood-drop.png"
              alt="Blood Drop"
              className="w-32 h-32 object-contain m-auto mb-8"
            />
            <h2 className="text-3xl font-bold text-red-600 text-center mb-4">
              Welcome Back, Admin!
            </h2>
            <p className="text-center text-gray-600">
              Sign in to access your dashboard and manage blood donations efficiently.
            </p>
          </div>

          {/* Right Side - Login Form */}
          <div className="flex flex-col justify-center p-8 md:p-12">
            <Link to="/" className="absolute top-6 left-6 text-red-600 hover:text-red-700 transition duration-200 md:text-white">
              <ArrowLeftIcon className="h-6 w-6" />
            </Link>

            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center md:text-left">
              Admin Login
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <UserCircleIcon className="h-6 w-6 text-gray-400 absolute top-3 left-3" />
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-200"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="relative">
                <LockClosedIcon className="h-6 w-6 text-gray-400 absolute top-3 left-3" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-200"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {error && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg transition duration-300 ease-in-out">
                  <p className="font-bold">Error</p>
                  <p>{error}</p>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition duration-200"
              >
                Sign In
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-gray-500 md:hidden">
              Welcome Back! Sign in to manage your blood donation dashboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;