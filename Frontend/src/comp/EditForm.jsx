import React, { useState } from "react";
import axios from "axios";

const EditForm = ({ reservation, onSave, onCancel, onDelete }) => {
  const [editedReservation, setEditedReservation] = useState({
    startDate: new Date(reservation.start).toISOString().slice(0, 16),
    endDate: new Date(reservation.end).toISOString().slice(0, 16),
    comment: reservation.title,
    duration: 60,
    color: reservation.color,
  });

  const [successMessage, setSuccessMessage] = useState('');

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
      onSave(response.data); // Update the parent state with modified data
      setSuccessMessage('Réservation modifiée avec succès.');
      setTimeout(() => setSuccessMessage(''), 3000); // Remove message after 3 seconds
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la réservation :", error);
      // Display an error message to the user or handle the error in another way
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm("Êtes-vous sûr de vouloir supprimer cette réservation ?");
    if (confirmed) {
      try {
        await onDelete(reservation.id);
      } catch (error) {
        console.error("Error deleting reservation:", error);
      }
    }
  };

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">Modifier la réservation</h3>
      {successMessage && (
        <div className="mb-4 p-2 bg-green-100 text-green-700 border border-green-400 rounded">
          {successMessage}
        </div>
      )}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Date de début:</label>
        <input
          type="datetime-local"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          name="startDate"
          value={editedReservation.startDate}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Date de fin:</label>
        <input
          type="datetime-local"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          name="endDate"
          value={editedReservation.endDate}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Commentaire:</label>
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          name="comment"
          value={editedReservation.comment}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Durée (en minutes):</label>
        <input
          type="number"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          name="duration"
          value={editedReservation.duration}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Couleur:</label>
        <input
          type="color"
          className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md"
          name="color"
          value={editedReservation.color}
          onChange={handleChange}
        />
      </div>
      <div className="flex justify-between">
        <button
          onClick={handleSave}
          className="w-1/3 bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md mr-2"
        >
          Enregistrer
        </button>
        <button
          onClick={onCancel}
          className="w-1/3 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-md mx-2"
        >
          Annuler
        </button>
        <button
          onClick={handleDelete}
          className="w-1/3 bg-red-500 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md ml-2"
        >
          Supprimer
        </button>
      </div>
    </div>
  );
};

export default EditForm;
