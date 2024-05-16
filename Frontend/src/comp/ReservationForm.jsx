// ReservationForm.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const ReservationForm = ({ selectedDates }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [comment, setComment] = useState("");
  const [duration, setDuration] = useState(60);
  const [color, setColor] = useState("#ff0000");

  useEffect(() => {
    // Mettre à jour les valeurs initiales du formulaire si les dates sont sélectionnées
    if (selectedDates.length > 0) {
      const { startDate, endDate } = selectedDates[0];
      // Mettre à jour les valeurs du formulaire avec les dates sélectionnées
      setStartDate(startDate);
      setEndDate(endDate);
    }
  }, [selectedDates]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/reservations", {
        startTime: startDate,
        endTime: endDate,
        comment,
        duration,
        color,
      });
      console.log("Reservation created:", response.data);
      // Réinitialiser les champs du formulaire
      setComment("");
      setDuration(60);
      setColor("#ff0000");
    } catch (error) {
      console.error("Error creating reservation:", error);
    }
  };

  return (
    <div>
      <h2>Réserver une réservation</h2>
      <form onSubmit={handleFormSubmit}>
        <label>Date de début:</label>
        <input
          type="datetime-local"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <label>Date de fin:</label>
        <input
          type="datetime-local"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <label>Commentaire:</label>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <label>Durée (en minutes):</label>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
        <label>Couleur:</label>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <button type="submit">Réserver</button>
      </form>
    </div>
  );
};

export default ReservationForm;
