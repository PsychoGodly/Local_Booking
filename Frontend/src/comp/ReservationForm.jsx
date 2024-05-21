import React, { useState, useEffect } from "react";
import axios from "axios";

const ReservationForm = ({ selectedDates, setEvents, onCancel, salleId }) => {
  // State variables for form inputs and UI state
  const [startDate, setStartDate] = useState(""); // Start date of the reservation
  const [endDate, setEndDate] = useState(""); // End date of the reservation
  const [comment, setComment] = useState(""); // Comment for the reservation
  const [duration, setDuration] = useState(60); // Duration of the reservation in minutes
  const [color, setColor] = useState("#ff0000"); // Color for the reservation
  const [reservationCreated, setReservationCreated] = useState(false); // Flag to indicate if reservation has been successfully created

  // Effect to update form inputs when selected dates change
  useEffect(() => {
    setReservationCreated(false);

    if (selectedDates.length > 0) {
      const { startDate, endDate } = selectedDates[0];
      setStartDate(startDate + "T09:00"); // Set start date to 9:00 AM
      setEndDate(endDate + "T10:00"); // Set end date to 10:00 AM
    }
  }, [selectedDates]);

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send reservation data to the server
      const response = await axios.post(
        `http://localhost:8080/api/reservations?salleId=${salleId}`,
        {
          startTime: startDate,
          endTime: endDate,
          comment,
          duration,
          color,
        }
      );
      console.log("Reservation created:", response.data);

      // Construct a new reservation object
      const newReservation = {
        id: response.data.id, // Ensure the event has a unique identifier
        title: response.data.comment,
        start: response.data.startTime,
        end: response.data.endTime,
        color: response.data.color,
      };

      // Add the new reservation to the events array
      setEvents((events) => [...events, newReservation]);

      // Reset form inputs
      setStartDate("");
      setEndDate("");
      setComment("");
      setDuration(60);
      setColor("#ff0000");

      // Set reservation created flag to true and reset it after 1 second
      setReservationCreated(true);
      setTimeout(() => {
        setReservationCreated(false); // Reset reservationCreated after 1 second
        onCancel(); // Return to the calendar after 1 second
      }, 1000);
    } catch (error) {
      console.error("Error creating reservation:", error);
    }
  };

  // Handle cancel button click
  const handleCancel = () => {
    onCancel();
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Réserver une réservation</h2>
      {reservationCreated ? (
        <p className="text-green-600 font-medium">
          Réservation créée avec succès!
        </p>
      ) : (
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Date de début:
            </label>
            <input
              type="datetime-local"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Date de fin:
            </label>
            <input
              type="datetime-local"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Commentaire:
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Durée (en minutes):
            </label>
            <input
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Couleur:</label>
            <input
              type="color"
              className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
            >
              Réserver
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-md mt-2"
            >
              Annuler
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ReservationForm;