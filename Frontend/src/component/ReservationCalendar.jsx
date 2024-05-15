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
  const [selectedDate, setSelectedDate] = useState(null);
  const [comment, setComment] = useState("");
  const [color, setColor] = useState("#000000");

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

  // Dans la fonction handleDateClick
// Dans la fonction handleDateClick
const handleDateClick = (arg) => {
    // Utilise la date exacte de la sélection
    setSelectedDate(arg.date);
  };
  
  // Dans la fonction handleSubmit
  const handleSubmit = () => {
    if (!selectedDate) {
      console.error("No selected date.");
      return;
    }
  
    // Crée un nouvel objet de réservation avec les données du formulaire
    const newReservation = {
      salleID: selectedSalle,
      startTime: selectedDate.toISOString(), // Utilise la date exacte de la sélection
      endTime: selectedDate.toISOString(), // Utilise la date exacte de la sélection
      comment: comment,
      color: color,
    };
  
    // Effectue une requête AJAX pour ajouter la nouvelle réservation
    axios
      .post("http://localhost:8080/api/salles/reservations", newReservation)
      .then((response) => {
        console.log("Reservation added:", response.data);
        // Met à jour les événements affichés dans le calendrier
        setEvents([
          ...events,
          {
            title: response.data.comment,
            start: response.data.startTime,
            end: response.data.endTime,
            color: response.data.color,
          },
        ]);
        // Réinitialise les champs du formulaire
        setSelectedDate(null);
        setComment("");
        setColor("#000000");
      })
      .catch((error) => {
        console.error("Error adding reservation:", error);
      });
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
            select={(info) => setSelectedDate(info.start)}
            unselectAuto={false}
          />
          {selectedDate && (
            <div>
              <h2>Add Reservation</h2>
              <label>Comment:</label>
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <label>Color:</label>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
              <button onClick={handleSubmit}>Submit</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ReservationCalendar;
