import React, { useState } from "react";
import axios from "axios";

const EditForm = ({ reservation, onSave, onCancel }) => {
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
      const response = await axios.put(
        `http://localhost:8080/api/reservations/${reservation.id}`,
        {
          startTime: editedReservation.startDate,
          endTime: editedReservation.endDate,
          comment: editedReservation.comment,
          duration: editedReservation.duration,
          color: editedReservation.color,
        }
      );
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

  const handleCancel = () => {
    onCancel(); // Appeler la fonction pour indiquer l'annulation
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-medium mb-4">Modifier la réservation</h3>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Date de début:</label>
        <input
          type="datetime-local"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          value={new Date(editedReservation.startDate).toISOString().slice(0, 16)}
          onChange={(e) =>
            setEditedReservation({
              ...editedReservation,
              startDate: e.target.value,
            })
          }
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Date de fin:</label>
        <input
          type="datetime-local"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          value={new Date(editedReservation.endDate).toISOString().slice(0, 16)}
          onChange={(e) =>
            setEditedReservation({
              ...editedReservation,
              endDate: e.target.value,
            })
          }
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Commentaire:</label>
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          value={editedReservation.comment}
          onChange={(e) =>
            setEditedReservation({
              ...editedReservation,
              comment: e.target.value,
            })
          }
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Durée (en minutes):
        </label>
        <input
          type="number"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          value={editedReservation.duration}
          onChange={(e) =>
            setEditedReservation({
              ...editedReservation,
              duration: e.target.value,
            })
          }
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Couleur:</label>
        <input
          type="color"
          className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md"
          value={editedReservation.color}
          onChange={(e) =>
            setEditedReservation({
              ...editedReservation,
              color: e.target.value,
            })
          }
        />
      </div>
      <div className="flex justify-between">
        <button
          onClick={handleCancel}
          className="w-1/2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-md"
        >
          Annuler
        </button>

        <button
          onClick={handleSave}
          className="w-1/2 bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
        >
          Enregistrer
        </button>
      </div>
    </div>
  );
};

export default EditForm;
