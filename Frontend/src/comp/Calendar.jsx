import React, { useState, useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import ReservationForm from "./ReservationForm";
import EditForm from "./EditForm";

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const calendarRef = useRef(null); // Créez une référence pour le composant FullCalendar

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/salle/reservations"
      );
      const reservations = response.data.map((reservation) => ({
        id: reservation.id || uuidv4(),
        title: reservation.comment,
        start: reservation.startTime,
        end: reservation.endTime,
        color: reservation.color,
        user: reservation.user
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
    console.log("Event clicked:", clickInfo.event);
    const reservationInfo = {
      id: clickInfo.event.id,
      title: clickInfo.event.title,
      start: clickInfo.event.start,
      end: clickInfo.event.end,
      color: clickInfo.event.backgroundColor,
    };
    console.log("Reservation info:", reservationInfo);
    setSelectedReservation(reservationInfo);
  };

  const handleSaveReservation = (updatedReservation) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === updatedReservation.id ? updatedReservation : event
      )
    );
    // Update the event in the calendar immediately
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      const event = calendarApi.getEventById(updatedReservation.id);
      if (event) {
        event.setProp("title", updatedReservation.title);
        event.setStart(updatedReservation.start);
        event.setEnd(updatedReservation.end);
        event.setProp("backgroundColor", updatedReservation.color);
      }
    }
    setSelectedReservation(null);
  };

  const renderEventContent = (eventInfo) => {
    const formatTime = (date) => {
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    };

    const startTime = formatTime(eventInfo.event.start);
    const endTime = formatTime(eventInfo.event.end);
    return (
      <div>
        <b>{eventInfo.event.title}</b>
        <br />
        <p>[{startTime} - {endTime}]</p>
      </div>
    );
  };

  return (
    <>
      <FullCalendar
        ref={calendarRef} // Associez la référence au composant FullCalendar
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
        eventContent={renderEventContent} // Ajoutez cette ligne pour personnaliser l'affichage des événements
      />
      {selectedDates.length > 0 && (
        <div>
          <ReservationForm
            selectedDates={selectedDates}
            setEvents={setEvents}
          />
        </div>
      )}
      {selectedReservation && (
        <div>
          <EditForm
            reservation={selectedReservation}
            onSave={handleSaveReservation}
          />
        </div>
      )}
    </>
  );
};

export default Calendar;
