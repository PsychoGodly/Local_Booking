import React, { useState } from "react";
import axios from "axios";
import config from "../Config";
import SideBar from "./SideBar";
import Header from "./Header";

const AddHolidayForm = () => {
  const [holiday, setHoliday] = useState({
    date: "",
    name: "",
  });
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHoliday({
      ...holiday,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:${config.portBackend}/api/addEvent`, holiday)
      .then((response) => {
        setMessage({ type: "success", text: "Holiday added successfully" });
      })
      .catch((error) => {
        setMessage({ type: "error", text: "Error adding holiday" });
      });
  };

  return (
    <div>
      <Header />
      <div className="flex mt-8">
        <div className="-mt-8 mr-6">
          <SideBar />
        </div>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto h-4/5">
          {message && (
            <div
              className={`mb-4 p-4 rounded ${
                message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              }`}
            >
              {message.text}
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="date" className="block text-gray-700 text-lg font-bold mb-2">
              Add Event:
            </label>
            <label htmlFor="date" className="block text-gray-700 text-sm font-bold mb-2">
              Date:
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={holiday.date}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={holiday.name}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Holiday
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddHolidayForm;
