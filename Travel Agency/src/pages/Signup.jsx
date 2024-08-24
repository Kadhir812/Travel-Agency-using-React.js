import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiMail, FiLock, FiUser } from 'react-icons/fi'; // Importing icons
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // For showing/hiding password

const Signup = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    window.particlesJS('particles-js', {
      particles: {
        number: { value: 50 },
        size: { value: 3 },
        move: { speed: 1 },
        line_linked: {
          enable: true,
          distance: 150,
          opacity: 0.4,
          color: "#ffffff",
        },
      },
    });
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        fullName,
        email,
        password,
      });

      if (response.status === 201) {
        navigate('/login');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to sign up. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-[url('../bg2.jpeg')] flex items-center justify-center">
      <div id="particles-js" className="absolute inset-0 z-0"></div>
      <div className="absolute inset-0 bg-red-400 opacity-60 z-1"></div>
      <div className="relative z-10 w-full max-w-md bg-white bg-opacity-20 p-8 shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-white">Sign Up</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSignup}>
          <div className="mb-4 relative">
            <label className="block text-white-700 mb-1">Full Name</label>
            <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-blue-500">
              <FiUser className="text-gray-500 ml-3" />
              <input
                type="text"
                className="w-full px-3 py-2 focus:outline-none border-0 rounded-r-md"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
              />
            </div>
          </div>
          <div className="mb-4 relative">
            <label className="block text-white-700 mb-1">Email</label>
            <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-blue-500">
              <FiMail className="text-gray-500 ml-3" />
              <input
                type="email"
                className="w-full px-3 py-2 focus:outline-none border-0 rounded-r-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>
          </div>
          <div className="mb-6 relative">
            <label className="block text-white-700 mb-1">Password</label>
            <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-blue-500">
              <FiLock className="text-gray-500 ml-3" />
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-3 py-2 focus:outline-none border-0 rounded-r-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-500 mr-3 focus:outline-none"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-2 px-4 rounded-full"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-white mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-400 underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
