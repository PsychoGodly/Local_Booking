import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faUserPlus } from '@fortawesome/free-solid-svg-icons';

const UserForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'User',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add user logic here
    console.log('User added:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md p-8 mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Add New User</h2>
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-400"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-400"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-700">Password</label>
        <div className="flex items-center">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-400"
          />
          <button
            type="button"
            onClick={handlePasswordToggle}
            className="ml-2 px-4 py-2 bg-gray-200 border border-gray-300 rounded-md hover:bg-gray-300 focus:outline-none focus:border-blue-400"
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="text-gray-600" />
          </button>
        </div>
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-gray-700">Role</label>
        <div className="flex items-center">
          <label htmlFor="user" className="flex items-center mr-4">
            <input
              type="radio"
              id="user"
              name="role"
              value="User"
              checked={formData.role === 'User'}
              onChange={handleChange}
              className="mr-2 text-blue-500"
            />
            User
          </label>
          <label htmlFor="admin" className="flex items-center">
            <input
              type="radio"
              id="admin"
              name="role"
              value="Admin"
              checked={formData.role === 'Admin'}
              onChange={handleChange}
              className="mr-2 text-blue-500"
            />
            Admin
          </label>
        </div>
      </div>
      <button type="submit" className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 flex items-center">
        Add User
        <FontAwesomeIcon icon={faUserPlus} className="ml-2" />
      </button>
    </form>
  );
};

export default UserForm;
