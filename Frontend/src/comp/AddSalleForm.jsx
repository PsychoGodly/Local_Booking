import React, { useState } from 'react';
import axios from 'axios';
import config from '../Config';

const AddSalleForm = () => {
  const [salleName, setSalleName] = useState('');
  const [capacity, setCapacity] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await axios.post(`http://localhost:${config.portBackend}/api/addSalle`, {
        salleName,
        capacity: parseInt(capacity) // Assuming capacity is a number
      });
      
      // Clear form inputs after successful submission
      setSalleName('');
      setCapacity('');
    } catch (error) {
      console.error('Error adding salle:', error);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-[400px]">
      <h2 className="text-lg font-bold mb-4">Add a New Salle</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="salleName" className="text-sm font-semibold mb-1">Salle Name:</label>
          <input
            type="text"
            id="salleName"
            value={salleName}
            onChange={(e) => setSalleName(e.target.value)}
            required
            className="border border-gray-300 rounded-md px-3 py-2"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="capacity" className="text-sm font-semibold mb-1">Capacity:</label>
          <input
            type="number"
            id="capacity"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            required
            className="border border-gray-300 rounded-md px-3 py-2"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">Add Salle</button>
      </form>
    </div>
  );
};

export default AddSalleForm;
