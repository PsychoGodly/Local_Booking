import React, { useState, useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

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
    setSelectedReservation(null);
  };

  useEffect(() => {
    // Mettre à jour le calendrier lorsque les événements changent
    if (calendarRef.current) {
      calendarRef.current.getApi().refetchEvents();
    }
  }, [events]);

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
      />
      {selectedDates.length > 0 && (
        <div>
          <ReservationForm selectedDates={selectedDates} setEvents={setEvents} />
        </div>
      )}
      {selectedReservation && (
        <div>
          <EditForm reservation={selectedReservation} onSave={handleSaveReservation} />
        </div>
      )}
    </>
  );
};

export default Calendar;
