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
import placeholderImage from "../assets/azura.png"; // Make sure to have a placeholder image in the same directory

const Calendar = () => {
  // State variables
  const [events, setEvents] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const calendarRef = useRef(null);
  const [showForm, setShowForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [selectedSalle, setSelectedSalle] = useState(null);
  const [isNewReservation, setIsNewReservation] = useState(false);

  // Fetch data when selectedSalle changes
  useEffect(() => {
    if (selectedSalle) {
      fetchData(selectedSalle);
    }
    fetchHolidays(); // Fetch holidays data
  }, [selectedSalle]);

  // Function to fetch reservations data
  const fetchData = async (salleId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/salles/${salleId}/reservations`
      );
      const reservations = response.data.map((reservation) => ({
        id: reservation.id || uuidv4(),
        title: reservation.comment,
        start: new Date(reservation.startTime),
        end: new Date(reservation.endTime),
        color: reservation.color,
        user: reservation.user,
      }));
      setEvents(reservations);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Function to fetch holidays data
  const fetchHolidays = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/holidays`);
      const holidaysData = response.data.map((holiday) => ({
        id: holiday.id || uuidv4(),
        title: holiday.name,
        start: new Date(holiday.date),
        end: new Date(holiday.date),
        color: 'red',
        allDay: true,
        isHoliday: true,
      }));
      setHolidays(holidaysData);
    } catch (error) {
      console.error("Error fetching holidays data:", error);
    }
  };

  // Combine reservations and holidays for the calendar
  const combinedEvents = [...events, ...holidays];

  // Handle date selection on the calendar
// Handle date selection on the calendar
// Handle date selection on the calendar
const handleDateSelect = (info) => {
  const startDate = info.startStr;
  const endDate =
    info.endStr.substring(0, 10) === startDate.substring(0, 10)
      ? startDate
      : new Date(new Date(info.endStr).setDate(new Date(info.endStr).getDate() - 1)).toISOString().substring(0, 10);

  // Check if any cell within the selected range corresponds to a holiday
  const isHolidayInRange = combinedEvents.some(
    (event) =>
      event.isHoliday &&
      (event.start >= info.start && event.start <= info.end) // Check if holiday is within the selected range
  );

  if (isHolidayInRange) {
    // If any cell within the selected range corresponds to a holiday
    setShowForm(false); // Do not show the form
    // Display error message to the user
    alert("You cannot reserve a salle on a holiday.");
  } else {
    // If no cell within the selected range corresponds to a holiday
    setSelectedDates([{ startDate, endDate }]);
    setShowForm(true); // Show the form
    setIsNewReservation(true);
    console.log("Selected date range:", startDate, " - ", endDate);
  }
};


// Handle click on an existing event
// Handle click on an existing event
const handleEventClick = (clickInfo) => {
  // Check if the clicked event is a holiday
  if (clickInfo.event.extendedProps.isHoliday) {
    return; // Do nothing if it's a holiday
  }

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
  setIsNewReservation(false);
  setShowForm(true); // Show the form when clicking on an existing reservation
};


  // Handle saving a reservation
  const handleSaveReservation = async (newReservation) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/reservations?salleId=${selectedSalle}`,
        newReservation
      );
      const savedReservation = response.data;
      setEvents((prevEvents) => [
        ...prevEvents,
        {
          id: savedReservation.id || uuidv4(),
          title: savedReservation.comment,
          start: savedReservation.startTime,
          end: savedReservation.endTime,
          color: savedReservation.color,
          user: savedReservation.user,
        },
      ]);
      setShowForm(false);
      setSuccessMessage(true); // Set success message to true after saving the reservation
      setTimeout(() => {
        setSuccessMessage(false); // Set success message to false after 1 second
      }, 1000);
    } catch (error) {
      console.error("Error saving reservation:", error);
    }
  };

  // Render content of an event on the calendar
  const renderEventContent = (eventInfo) => {
    const formatTime = (date) => {
      if (!date) return ""; // Return empty string if date is null or undefined
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
        {eventInfo.event.allDay ? (
          <p>All Day</p>
        ) : (
          <p>
            [{startTime} - {endTime}]
          </p>
        )}
      </div>
    );
  };

  // Set cursor pointer for events
  const handleEventMount = (info) => {
    const eventEl = info.el;
    eventEl.style.cursor = "pointer";
  };

  // Handle selection of a salle (room)
  const handleSalleSelect = (salleId) => {
    console.log("Selected room:", salleId);
    setSelectedSalle(salleId);
  };

  // Handle cancellation of reservation form
  const handleCancel = () => {
    setShowForm(false);
  };
  const handleCancelEdit = () => {
    setShowForm(false);
  };

  // Handle deletion of a reservation
  const handleDeleteReservation = async (reservationId) => {
    try {
      await axios.delete(`http://localhost:8080/api/reservations/${reservationId}`);
      // Fetch updated data after deletion
      fetchData(selectedSalle);
      setShowForm(false)
    } catch (error) {
      console.error("Error deleting reservation:", error);
    }
  };

  return (
    <div className="relative p-4 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      <div className="mb-6">
        <SalleSelector onSelect={handleSalleSelect} />
      </div>
      {!selectedSalle ? (
        <div className="flex items-center justify-center">
          <img src={placeholderImage} alt="Placeholder" className="w-1/2 h-1/2 object-contain" />
        </div>
      ) : (
        <div className="relative bg-white rounded-lg shadow-md p-4 mb-6">
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={combinedEvents}
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
      )}
      {showForm && isNewReservation && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-md p-6 max-w-lg mx-auto">
            <ReservationForm              
              selectedDates={selectedDates}
              setEvents={setEvents}
              onCancel={handleCancel}
              onSave={handleSaveReservation}
              salleId={selectedSalle}
            />
          </div>
        </div>
      )}
      {selectedReservation && !isNewReservation && showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-md p-6 max-w-lg mx-auto">
            <EditForm
              reservation={selectedReservation}
              onSave={handleSaveReservation}
              onCancel={handleCancelEdit}
              onDelete={handleDeleteReservation}
            />
          </div>
        </div>
      )}

      {/* Success message for reservation creation */}
      {successMessage && (
        <div className="absolute top-4 right-4 bg-green-500 text-white p-2 rounded">
          Réservation créée avec succès!
        </div>
      )}
    </div>
  );
};

export default Calendar;
