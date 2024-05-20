import React, { useState, useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import ReservationForm from "./ReservationForm";
import EditForm from "./EditForm";
import SalleSelector from "./SalleSelector";

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const calendarRef = useRef(null);
  const [showForm, setShowForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [selectedSalle, setSelectedSalle] = useState(null);

  useEffect(() => {
    if (selectedSalle) {
      fetchData(selectedSalle);
    }
  }, [selectedSalle]);

  const fetchData = async (salleId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/salles/${salleId}/reservations`
      );
      const reservations = response.data.map((reservation) => ({
        id: reservation.id || uuidv4(),
        title: reservation.comment,
        start: reservation.startTime,
        end: reservation.endTime,
        color: reservation.color,
        user: reservation.user,
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
    setShowForm(true);
    console.log("Selected date range:", info.startStr, " - ", info.endStr);
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
    setShowForm(true); // Ajoutez cette ligne pour afficher le formulaire lorsque vous cliquez sur une réservation existante
  };

  const handleSaveReservation = (updatedReservation) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === updatedReservation.id ? updatedReservation : event
      )
    );
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
    setShowForm(false);
    setSuccessMessage(true); // Set success message to true after saving the reservation
    setTimeout(() => {
      setSuccessMessage(false); // Set success message to false after 1 second
    }, 1000);
  };

  const renderEventContent = (eventInfo) => {
    const formatTime = (date) => {
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      return `${hours}:${minutes}`;
    };

    const startTime = formatTime(eventInfo.event.start);
    const endTime = formatTime(eventInfo.event.end);
    return (
      <div>
        <b>{eventInfo.event.title}</b>
        <br />
        <p>
          [{startTime} - {endTime}]
        </p>
      </div>
    );
  };

  const handleEventMount = (info) => {
    const eventEl = info.el;
    eventEl.style.cursor = "pointer";
  };

  const handleSalleSelect = (salleId) => {
    console.log("Selected room:", salleId);
    setSelectedSalle(salleId);
  };

  const handleCancel = () => {
    setShowForm(false);
  };
  const handleCancelEdit = () => {
    setShowForm(false);
  };
  return (
    <div className="relative p-4 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      <div className="mb-6">
        <SalleSelector onSelect={handleSalleSelect} />
      </div>
      <div className="relative bg-white rounded-lg shadow-md p-4 mb-6">
        <FullCalendar
          ref={calendarRef}
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
          eventContent={renderEventContent}
          eventDidMount={handleEventMount}
        />
      </div>
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-md p-6 max-w-lg mx-auto">
            <ReservationForm
              selectedDates={selectedDates}
              setEvents={setEvents}
              onCancel={handleCancel}
              onSave={handleSaveReservation}
            />
          </div>
        </div>
      )}
      {selectedReservation && showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-md p-6 max-w-lg mx-auto">
            <EditForm
              reservation={selectedReservation}
              onSave={handleSaveReservation}
              onCancel={handleCancelEdit}
            />
          </div>
        </div>
      )}

      {successMessage && (
        <div className="absolute top-4 right-4 bg-green-500 text-white p-2 rounded">
          Réservation créée avec succès!
        </div>
      )}
    </div>
  );
};

export default Calendar;
