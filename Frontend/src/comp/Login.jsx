import React, { useState } from 'react';
import placeholderImage from "../assets/azura.png"; // Make sure to have a placeholder image in the same directory

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-center mb-6">
          <img src={placeholderImage} alt="Logo" className="h-auto w-30 "/>
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
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              className={`border mb-2 py-2 px-3 rounded text-gray-700 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.password ? "border-red-500" : ''}`}
              name="password"
              type="password"
              placeholder="* * * * * * * *"
              value={credentials.password}
              onChange={handleInputChange}
            />
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
