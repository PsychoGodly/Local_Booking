import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const MyCalendar = () => {
  const [salles, setSalles] = useState([]);
  const [selectedSalle, setSelectedSalle] = useState(null);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    // Charger les salles depuis l'API backend
    axios.get('http://localhost:8080/api/salles')
      .then(response => {
        setSalles(response.data);
        // Par défaut, sélectionnez la première salle
        if (response.data.length > 0) {
          setSelectedSalle(response.data[0]);
        }
      })
      .catch(error => console.error('Erreur lors de la récupération des salles:', error));
  }, []);

  useEffect(() => {
    // Charger les réservations pour la salle sélectionnée
    if (selectedSalle) {
      axios.get(`http://localhost:8080/api/salles/${selectedSalle.id}/reservations`)
        .then(response => {
          setReservations(response.data);
        })
        .catch(error => console.error('Erreur lors de la récupération des réservations:', error));
    }
  }, [selectedSalle]);

  const handleSalleChange = event => {
    const salleId = parseInt(event.target.value);
    const selected = salles.find(salle => salle.id === salleId);
    setSelectedSalle(selected);
  };

  return (
    <div>
      <select onChange={handleSalleChange}>
        {salles.map(salle => (
          <option key={salle.id} value={salle.id}>{salle.salleName}</option>
        ))}
      </select>
      {selectedSalle && (
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={reservations.map(reservation => ({
            title: reservation.user.username,
            start: reservation.startTime,
            end: reservation.endTime
          }))} />
      )}
    </div>
  );
};

export default MyCalendar;
