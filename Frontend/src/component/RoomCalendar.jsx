import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import EventForm from "./EventForm";

function RoomCalendar({ room, selectedRoom, eventInfo, handleDateClick, handleEventDrop, handleDateRangeSelect, handleSubmit }) {
  return (
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
  );
}

export default RoomCalendar;
