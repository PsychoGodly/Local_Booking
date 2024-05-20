import React, { useState } from "react";
import axios from "axios";

const EditForm = ({ reservation, onSave, onCancel }) => {
  const [editedReservation, setEditedReservation] = useState({
    startDate: new Date(reservation.start).toISOString().slice(0, 16),
    endDate: new Date(reservation.end).toISOString().slice(0, 16),
    comment: reservation.title,
    duration: 60,
    color: reservation.color,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedReservation({ ...editedReservation, [name]: value });
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/reservations/${reservation.id}`,
        {
          startTime: new Date(editedReservation.startDate),
          endTime: new Date(editedReservation.endDate),
          comment: editedReservation.comment,
          duration: editedReservation.duration,
          color: editedReservation.color,
        }
      );
      onSave(response.data); // Mettre à jour le state parent avec les données modifiées
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la réservation :", error);
      // Afficher un message d'erreur à l'utilisateur ou gérer l'erreur d'une autre manière
    }
  };

  return (
    <div>
      <h3>Modifier la réservation</h3>
      <label>Date de début:</label>
      <input
        type="datetime-local"
        name="startDate"
        value={editedReservation.startDate}
        onChange={handleChange}
      />
      <label>Date de fin:</label>
      <input
        type="datetime-local"
        name="endDate"
        value={editedReservation.endDate}
        onChange={handleChange}
      />
      <label>Commentaire:</label>
      <input
        type="text"
        name="comment"
        value={editedReservation.comment}
        onChange={handleChange}
      />
      <label>Durée (en minutes):</label>
      <input
        type="number"
        name="duration"
        value={editedReservation.duration}
        onChange={handleChange}
      />
      <label>Couleur:</label>
      <input
        type="color"
        name="color"
        value={editedReservation.color}
        onChange={handleChange}
      />
      <button onClick={handleSave}>Enregistrer</button>
      <button onClick={onCancel}>Annuler</button>
    </div>
  );
};

export default EditForm;
