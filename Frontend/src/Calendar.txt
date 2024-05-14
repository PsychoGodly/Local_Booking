import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from 'axios';
function Calendar() {
  const [eventInfo, setEventInfo] = useState(null);
  const [rooms, setRooms] = useState([
    {
      id: "meeting",
      title: "Salle de réunion",
      events: [],
    },
    {
      id: "conference",
      title: "Salle de conférence",
      events: [],
    },
    {
      id: "event",
      title: "Espace événementiel",
      events: [],
    },
  ]);

  const sendDataToBackend = async (eventData) => {
    try {
      const response = await axios({
        method: 'post',
        url: 'http://localhost:8080/api/events',
        data: eventData
      });
      console.log("Event created:", response.data);
      // Ajoutez ici toute logique supplémentaire après la création de l'événement
    } catch (error) {
      console.error("Error creating event:", error);
      // Gérez les erreurs ici
    }
  };
  


  const [selectedRoom, setSelectedRoom] = useState(""); // État pour la salle sélectionnée

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
    const updatedEvent = {
      ...arg.event.toPlainObject(),
      start: arg.event.start,
      end: arg.event.end,
    };

    const updatedRooms = rooms.map((room) => {
      if (room.id === roomId) {
        return {
          ...room,
          events: room.events.map((event) =>
            event.id === updatedEvent.id ? updatedEvent : event
          ),
        };
      }
      return room;
    });

    setRooms(updatedRooms);
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
      roomType: formData.roomType,
      comment: formData.comment,
      start: eventInfo.start,
      end: eventInfo.end,
      allDay: eventInfo.allDay,
      participants: formData.participants,
      color: formData.color,
    };
  
    sendDataToBackend(newEvent);

    const updatedRooms = rooms.map((room) => {
      if (room.id === formData.roomType) {
        return {
          ...room,
          events: [...room.events, newEvent],
        };
      }
      return room;
    });

    // Met à jour les événements de la salle sélectionnée
    setRooms(updatedRooms);

    // Réinitialise l'état de eventInfo
    setEventInfo(null);

    console.log(newEvent);
  };

  const generateEventId = () => {
    // Fonction simple pour générer un identifiant unique pour les événements
    return Math.random().toString(36).substring(7);
  };

  const eventRender = (info) => {
    const event = info.event;
    const title = event.title;
    const comment = event.extendedProps.comment;
    const participants = event.extendedProps.participants;

    const startDate = event.start;
    const endDate = event.end;

    const startTime = startDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const endTime = endDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    info.el.innerHTML = `
      <div>
        <strong>${title}</strong> - ${comment} <br>
        Début : ${startTime} - Fin : ${endTime} <br>
        ${participants ? "Participants : " + participants : ""}
      </div>
    `;
  };

  return (
    <div>
      {/* Formulaire pour choisir une salle */}
      <div>
        <label>Choisir une salle :</label>
        <select
          value={selectedRoom}
          onChange={(e) => setSelectedRoom(e.target.value)}
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
              roomType={room.id}
              onSubmit={handleSubmit}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function EventForm({ eventInfo, roomType, onSubmit }) {
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

    // Vérifier si les champs obligatoires sont remplis
    if (!event) {
      alert("Veuillez saisir le nom de l'événement.");
      return;
    }

    // Valider les données du formulaire si nécessaire
    onSubmit({ event, comment, participants, color, roomType });
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
