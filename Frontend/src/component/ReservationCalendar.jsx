import React, { useState, useEffect } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

function ReservationCalendar() {
  const [salles, setSalles] = useState([]);
  const [selectedSalle, setSelectedSalle] = useState("");
  const [events, setEvents] = useState([]);
  const [eventInfo, setEventInfo] = useState({});
  const [selectedDates, setSelectedDates] = useState([]);

  useEffect(() => {
    // Effectuer une requête AJAX pour récupérer les salles depuis le backend
    axios
      .get("http://localhost:8080/api/salles")
      .then((response) => {
        setSalles(response.data);
      })
      .catch((error) => {
        console.error("Error fetching salles:", error);
      });
  }, []);

  useEffect(() => {
    if (selectedSalle) {
      // Effectuer une requête AJAX pour récupérer les réservations de la salle sélectionnée depuis le backend
      axios
        .get(`http://localhost:8080/api/salles/${selectedSalle}/reservations`)
        .then((response) => {
          // Formater les données pour FullCalendar
          const formattedEvents = response.data.map((reservation) => ({
            title: reservation.comment,
            start: reservation.startTime,
            end: reservation.endTime,
          }));
          setEvents(formattedEvents);
        })
        .catch((error) => {
          console.error("Error fetching reservations:", error);
        });
    }
  }, [selectedSalle]);

  const handleSalleChange = (event) => {
    setSelectedSalle(event.target.value);
  };

  const handleDateClick = (arg) => {
    // Ajoute la date cliquée à la liste des dates sélectionnées
    setSelectedDates([...selectedDates, arg.date]);
  };

  const handleSubmit = (formData) => {
    // Crée un nouvel objet de réservation avec les données du formulaire
    const newReservation = {
      salleID: selectedSalle,
      startTime: selectedDates[0],
      endTime: selectedDates[selectedDates.length - 1],
      comment: formData.comment,
      color: formData.color,
    };

    // Effectuer une requête AJAX pour ajouter la nouvelle réservation
    axios
      .post("http://localhost:8080/api/salles/reservations", newReservation)
      .then((response) => {
        console.log("Reservation added:", response.data);
        // Mettre à jour les événements affichés dans le calendrier
        setEvents([
          ...events,
          {
            title: response.data.comment,
            start: response.data.startTime,
            end: response.data.endTime,
            color: response.data.color,
          },
        ]);
        // Réinitialiser les informations d'événement
        setEventInfo({});
      })
      .catch((error) => {
        console.error("Error adding reservation:", error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventInfo({ ...eventInfo, [name]: value });
  };

  return (
    <div>
      <div>
        <select onChange={handleSalleChange} value={selectedSalle}>
          <option value="">Choose a salle</option>
          {salles.map((salle) => (
            <option key={salle.salleID} value={salle.salleID}>
              {salle.salleName}
            </option>
          ))}
        </select>
      </div>
      {selectedSalle && (
        <div>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={events}
            dateClick={handleDateClick}
            selectable={true}
            select={(info) => setSelectedDates([info.start])}
            unselectAuto={false}
          />
          {selectedDates.length > 0 && (
            <div>
              <h2>Add Reservation</h2>
                <label>Comment:</label>
                <input
                  type="text"
                  name="comment"
                  value={eventInfo.comment || ""}
                  onChange={handleChange}
                />
                <label>Color:</label>
                <input
                  type="color"
                  name="color"
                  value={eventInfo.color || "#000000"}
                  onChange={handleChange}
                />
                <button onClick={handleSubmit} type="submit">Submit</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ReservationCalendar;
