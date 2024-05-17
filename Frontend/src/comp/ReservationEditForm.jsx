import React, { useState } from "react";
import axios from "axios";

const ReservationEditForm = ({ eventData, onUpdate, onCancel }) => {
  const [title, setTitle] = useState(eventData.title);
  const [start, setStart] = useState(eventData.start);
  const [end, setEnd] = useState(eventData.end);
  const [color, setColor] = useState(eventData.color);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedEventData = { ...eventData, title, start, end, color };
      await axios.put(`http://localhost:8080/api/reservations/${eventData.id}`, updatedEventData);
      onUpdate(updatedEventData);
    } catch (error) {
      console.error("Error updating reservation:", error);
    }
  };

  return (
    <div>
      <h2>Modifier la réservation</h2>
      <form onSubmit={handleSubmit}>
        <label>Titre:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Date de début:</label>
        <input
          type="datetime-local"
          value={start}
          onChange={(e) => setStart(e.target.value)}
        />
        <label>Date de fin:</label>
        <input
          type="datetime-local"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
        />
        <label>Couleur:</label>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <button type="submit">Modifier</button>
        <button type="button" onClick={onCancel}>Annuler</button>
      </form>
    </div>
  );
};

export default ReservationEditForm;
