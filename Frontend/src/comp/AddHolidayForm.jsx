import React, { useState } from 'react';
import axios from 'axios';
import config from '../Config';

const AddHolidayForm = () => {
  const [holiday, setHoliday] = useState({
    date: '',
    name: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHoliday({
      ...holiday,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:${config.portBackend}/api/addEvent`, holiday)
      .then(response => {
        console.log('Holiday added successfully');
        // You can add more logic here, such as showing a success message or redirecting the user
      })
      .catch(error => {
        console.error('Error adding holiday:', error);
        // You can add more logic here, such as showing an error message
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          name="date"
          value={holiday.date}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={holiday.name}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Add Holiday</button>
    </form>
  );
};

export default AddHolidayForm;
