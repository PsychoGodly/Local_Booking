import React, { useState } from 'react';
import placeholderImage from "../assets/azura.png"; // Make sure to have a placeholder image in the same directory

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility

  const handleLoginForm = (evt) => {
    evt.preventDefault();
    setErrors(validateCredentials(credentials));
  };

  const validateCredentials = (credentials) => {
    let errors = {};

    if (credentials.username === '') {
      errors.username = 'This field is required';
    }

    if (credentials.password === '') {
      errors.password = 'This field is required';
    }

    return errors;
  };

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setCredentials((prevCredentials) => ({ ...prevCredentials, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-center mb-6">
          <img src={placeholderImage} alt="Logo" className="h-auto w-30" />
        </div>
        <form onSubmit={handleLoginForm} className="space-y-6">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Email
            </label>
            <input
              id="username"
              className={`border mb-2 py-2 px-3 rounded text-gray-700 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.username ? "border-red-500" : ''}`}
              name="username"
              type="text"
              placeholder="e.g. houssam.elouafi@azura.ma"
              value={credentials.username}
              onChange={handleInputChange}
            />
            {errors.username && <p className="text-red-500 text-xs italic">{errors.username}</p>}
          </div>
          <div className="relative">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              className={`border mb-2 py-2 px-3 rounded text-gray-700 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.password ? "border-red-500" : ''}`}
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="* * * * * * * *"
              value={credentials.password}
              onChange={handleInputChange}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <svg
                  className="h-5 w-5 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12m4 0a9 9 0 11-18 0 9 9 0 0118 0zM15 12m2 2a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13.875 18.825a4 4 0 01-5.66-5.66M8.121 15.121A9.026 9.026 0 003 12a9 9 0 0118 0c0 1.494-.368 2.9-1.018 4.131m-2.272 1.272A9.026 9.026 0 0112 21c-1.494 0-2.9-.368-4.131-1.018m2.272-1.272a4 4 0 005.66-5.66M9.36 6.47a4 4 0 015.641 5.641"
                  />
                </svg>
              )}
            </button>
            {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
          </div>
          <button
            type="submit"
            className="bg-[#2f74b6] hover:bg-[#5375d3] text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign in
          </button>
        </form>
        <div className="text-center mt-4">
          <a href="#" className="text-blue-500 hover:text-blue-700 text-sm">
            Forgot your password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
