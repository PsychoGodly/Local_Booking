import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import ReservationForm from "./ReservationForm";
import EditForm from "./EditForm"; 

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/salle/reservations");
      const reservations = response.data.map((reservation) => ({
        id: reservation.id,
        title: reservation.comment,
        start: reservation.startTime,
        end: reservation.endTime,
        color: reservation.color,
      }));
      setEvents(reservations);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDateSelect = (info) => {
    const startDate = info.startStr;
    const endDate = info.endStr;
    setSelectedDates([{ startDate, endDate }]);
    console.log("Date sélectionnée:", info.startStr, " - ", info.endStr);
  };

  const handleEventClick = (clickInfo) => {
    const clickedEventId = clickInfo.event.id; // Récupérer l'identifiant unique de l'événement cliqué
    const clickedReservation = events.find(event => event.id === clickedEventId); // Rechercher la réservation correspondante
    setSelectedReservation(clickedReservation); // Mettre à jour la réservation sélectionnée
  };
  

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        headerToolbar={{
          start: "prev,next today",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        height={"90vh"}
        selectable={true}
        select={handleDateSelect}
        eventClick={handleEventClick}
      />
      {selectedDates.length > 0 && (
        <div>
          <ReservationForm selectedDates={selectedDates} setEvents={setEvents} />
        </div>
      )}
      {selectedReservation && (
        <div>
          <EditForm reservation={selectedReservation} onSave={(updatedReservation) => {
            setEvents((prevEvents) =>
              prevEvents.map((event) =>
                event.id === updatedReservation.id ? updatedReservation : event
              )
            );
            setSelectedReservation(null);
          }} />
        </div>
      )}
    </>
  );
};

export default Calendar;
