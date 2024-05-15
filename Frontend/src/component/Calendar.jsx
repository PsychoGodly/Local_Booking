import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from 'axios';

function Calendar() {
  const [selectedRoom, setSelectedRoom] = useState(""); // État pour la salle sélectionnée
  const [rooms, setRooms] = useState([]); // État pour les salles
  const [eventInfo, setEventInfo] = useState(null); // État pour les informations de l'événement

  useEffect(() => {
    // Effectuer une requête AJAX pour récupérer les salles depuis le backend
    axios.get('http://localhost:8080/api/salles')
      .then(response => {
        setRooms(response.data);
      })
      .catch(error => {
        console.error('Error fetching salles:', error);
      });
  }, []);

  const handleDateClick = (arg) => {
    // Ouvre un formulaire pour saisir les informations de l'événement
    const eventData = {
      start: arg.date,
      end: arg.date, // Par simplicité, on suppose que le début et la fin sont identiques
      allDay: true, // Événement sur toute la journée par défaut
    };
    setEventInfo(eventData);
  };

  const handleEventDrop = (arg, roomId) => {
    // Met à jour l'heure de début et de fin de l'événement lorsqu'il est déplacé
    // Ici, vous pouvez ajouter la logique pour mettre à jour les événements dans la base de données si nécessaire
    console.log(arg.event);
  };

  const handleDateRangeSelect = (arg) => {
    // Ouvre un formulaire pour saisir les informations de l'événement
    const eventData = {
      start: arg.start,
      end: arg.end,
      allDay: true, // Événement sur toute la journée par défaut
    };
    setEventInfo(eventData);
  };

  const handleSubmit = (formData) => {
    // Crée un nouvel objet d'événement avec les données du formulaire
    const newEvent = {
      title: formData.event,
      roomType: selectedRoom,
      comment: formData.comment,
      start: eventInfo.start,
      end: eventInfo.end,
      allDay: eventInfo.allDay,
      participants: formData.participants,
      color: formData.color,
    };
  
    // Envoie la nouvelle réservation au backend
    sendDataToBackend(newEvent);
  };

  const sendDataToBackend = async (eventData) => {
    try {
      const response = await axios.post('http://localhost:8080/api/reservations', eventData);
      console.log("Event created:", response.data);
      // Mettez à jour les événements dans le calendrier après la création de l'événement
      const newEvent = {
        title: response.data.comment,
        start: response.data.startTime,
        end: response.data.endTime,
        color: response.data.color,
      };
      const updatedRooms = rooms.map(room => {
        if (room.id === selectedRoom) {
          return {
            ...room,
            events: [...room.events, newEvent],
          };
        }
        return room;
      });
      setRooms(updatedRooms);
      // Réinitialise les informations d'événement
      setEventInfo(null);
    } catch (error) {
      console.error("Error creating event:", error);
      // Gérez les erreurs ici
    }
  };

  const handleChangeRoom = (e) => {
    setSelectedRoom(e.target.value);
  };

  return (
    <div>
      {/* Formulaire pour choisir une salle */}
      <div>
        <label>Choisir une salle :</label>
        <select
          value={selectedRoom}
          onChange={handleChangeRoom}
        >
          <option value="">Sélectionner une salle</option>
          {rooms.map((room) => (
            <option key={room.id} value={room.id}>
              {room.title}
            </option>
          ))}
        </select>
      </div>
      {/* Afficher les calendriers pour chaque salle */}
      {rooms.map((room) => (
        <div
          key={room.id}
          style={{ display: room.id === selectedRoom ? "block" : "none" }}
        >
          <h2>{room.title}</h2>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView={"dayGridMonth"}
            headerToolbar={{
              start: "today prev,next",
              center: "title",
              end: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            height={"90vh"}
            dateClick={handleDateClick}
            eventDrop={(arg) => handleEventDrop(arg, room.id)}
            select={handleDateRangeSelect}
            selectable={true}
            events={room.events}
            editable={true}
          />

          {eventInfo && selectedRoom === room.id && (
            <EventForm
              eventInfo={eventInfo}
              onSubmit={handleSubmit}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function EventForm({ eventInfo, onSubmit }) {
  const [formData, setFormData] = useState({
    event: "",
    comment: "",
    participants: "",
    color: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { event, comment, participants, color } = formData;

    // Valider les données du formulaire si nécessaire
    onSubmit({ event, comment, participants, color });
  };

  return (
    <div className="event-form">
      <h2>Nouvel événement</h2>
      <form onSubmit={handleSubmit}>
        <label>Nom de l'événement :</label>
        <input
          type="text"
          name="event"
          value={formData.event}
          onChange={handleChange}
        />
        <label>Commentaire :</label>
        <textarea
          name="comment"
          value={formData.comment}
          onChange={handleChange}
        ></textarea>
        <label>Participants :</label>
        <input
          type="text"
          name="participants"
          value={formData.participants}
          onChange={handleChange}
        />
        <label>Couleur :</label>
        <input
          type="color"
          name="color"
          value={formData.color}
          onChange={handleChange}
        />
        <button type="submit">Soumettre</button>
      </form>
    </div>
  );
}

export default Calendar;
