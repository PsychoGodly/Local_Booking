import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid"; // Importez le plugin timeGridPlugin
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";

const Calendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/salle/reservations"
      );
      const reservations = response.data.map((reservation) => ({
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

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]} // Ajoutez le plugin timeGridPlugin
      initialView="dayGridMonth" // Utilisez le mode timeGridWeek comme vue initiale
      events={events}
      headerToolbar={{
        start: "prev,next today",
        center: "title",
        end: "dayGridMonth,timeGridWeek,timeGridDay",
      }}
      height={"90vh"}
      selectable={true}
      select={(info) => {
        console.log("Date sélectionnée:", info.startStr, " - ", info.endStr);
      }}
    />
  );
};

export default Calendar;
