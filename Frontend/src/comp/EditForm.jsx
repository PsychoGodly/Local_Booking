import React, { useState } from "react";
import axios from "axios";

const EditForm = ({ reservation, onSave }) => {
  const [editedReservation, setEditedReservation] = useState({
    id: reservation.id,
    startDate: reservation.start,
    endDate: reservation.end,
    comment: reservation.title,
    duration: 60,
    color: reservation.color,
  });

  const handleSave = async () => {
    try {
      const response = await axios.put(`http://localhost:8080/api/reservations/${reservation.id}`, {
        startTime: editedReservation.startDate,
        endTime: editedReservation.endDate,
        comment: editedReservation.comment,
        duration: editedReservation.duration,
        color: editedReservation.color,
      });
      onSave({
        id: reservation.id,
        title: editedReservation.comment,
        start: editedReservation.startDate,
        end: editedReservation.endDate,
        color: editedReservation.color,
      });
    } catch (error) {
      console.error("Error updating reservation:", error);
    }
  };

  return (
    <div>
      <h3>Modifier la réservation</h3>
      <label>Date de début:</label>
      <input
        type="datetime-local"
        value={new Date(editedReservation.startDate).toISOString().slice(0, 16)}
        onChange={(e) => setEditedReservation({...editedReservation, startDate: e.target.value})}
      />
      <label>Date de fin:</label>
      <input
        type="datetime-local"
        value={new Date(editedReservation.endDate).toISOString().slice(0, 16)}
        onChange={(e) => setEditedReservation({...editedReservation, endDate: e.target.value})}
      />
      <label>Commentaire:</label>
      <input
        type="text"
        value={editedReservation.comment}
        onChange={(e) => setEditedReservation({...editedReservation, comment: e.target.value})}
      />
      <label>Durée (en minutes):</label>
      <input
        type="number"
        value={editedReservation.duration}
        onChange={(e) => setEditedReservation({...editedReservation, duration: e.target.value})}
      />
      <label>Couleur:</label>
      <input
        type="color"
        value={editedReservation.color}
        onChange={(e) => setEditedReservation({...editedReservation, color: e.target.value})}
      />
      <button onClick={handleSave}>Enregistrer</button>
    </div>
  );
};

export default EditForm;
