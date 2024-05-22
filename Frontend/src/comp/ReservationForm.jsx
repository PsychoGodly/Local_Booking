import React, { useState, useEffect } from "react";
import axios from "axios";

const ReservationForm = ({ selectedDates, setEvents, onCancel, salleId }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [comment, setComment] = useState("");
  const [duration, setDuration] = useState(60);
  const [color, setColor] = useState("#ff0000");
  const [reservationCreated, setReservationCreated] = useState(false);

  useEffect(() => {
    setReservationCreated(false);

    if (selectedDates.length > 0) {
      const { startDate, endDate } = selectedDates[0];
      setStartDate(startDate + "T09:00");
      setEndDate(endDate + "T10:00");
    }
  }, [selectedDates]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
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
      const newReservation = {
        id: response.data.id, // Ensure the event has a unique identifier
        title: response.data.comment,
        start: response.data.startTime,
        end: response.data.endTime,
        color: response.data.color,
      };
      setEvents((events) => [...events, newReservation]);
      setStartDate("");
      setEndDate("");
      setComment("");
      setDuration(60);
      setColor("#ff0000");
      setReservationCreated(true);
      setTimeout(() => {
        setReservationCreated(false); // Reset reservationCreated after 1 second
        onCancel(); // Return to the calendar after 1 second
      }, 1000);
    } catch (error) {
      console.error("Error creating reservation:", error);
    }
  };

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