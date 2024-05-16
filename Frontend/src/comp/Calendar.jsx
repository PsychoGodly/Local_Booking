import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';

const Calendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/salle/reservations');
      const reservations = response.data.map(reservation => ({
        title: reservation.comment,
        start: reservation.startTime,
        end: reservation.endTime,
        color: reservation.color
      }));
      setEvents(reservations);

      console.log(reservations);
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={events}
    />
  );
};

export default Calendar;