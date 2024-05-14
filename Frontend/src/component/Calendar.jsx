import React, { useState } from "react";
import EventForm from "./EventForm";
import RoomCalendar from "./RoomCalendar";
import axios from 'axios';

function Calendar() {
  const [eventInfo, setEventInfo] = useState(null);
  const [rooms, setRooms] = useState([
    {
      id: "meeting",
      title: "Meeting Room",
      events: [],
    },
    {
      id: "conference",
      title: "Conference Room",
      events: [],
    },
    {
      id: "event",
      title: "Event Space",
      events: [],
    },
  ]);
  const [selectedRoom, setSelectedRoom] = useState("");

  const sendDataToBackend = async (eventData) => {
    try {
      const response = await axios({
        method: 'post',
        url: 'http://localhost:8080/api/events',
        data: eventData
      });
      console.log("Event created:", response.data);
      // Additional logic after event creation
    } catch (error) {
      console.error("Error creating event:", error);
      // Error handling
    }
  };

  const handleSubmit = (formData) => {
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

    setRooms(updatedRooms);
    setEventInfo(null);

    console.log(newEvent);
  };

  const handleDateClick = (arg) => {
    const eventData = {
      start: arg.date,
      end: arg.date,
      allDay: true,
    };
    setEventInfo(eventData);
  };

  const handleEventDrop = (arg, roomId) => {
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
    const eventData = {
      start: arg.start,
      end: arg.end,
      allDay: true,
    };
    setEventInfo(eventData);
  };

  return (
    <div>
      <div>
        <label>Select a room:</label>
        <select
          value={selectedRoom}
          onChange={(e) => setSelectedRoom(e.target.value)}
        >
          <option value="">Select a room</option>
          {rooms.map((room) => (
            <option key={room.id} value={room.id}>
              {room.title}
            </option>
          ))}
        </select>
      </div>
      {rooms.map((room) => (
        <RoomCalendar
          key={room.id}
          room={room}
          selectedRoom={selectedRoom}
          eventInfo={eventInfo}
          handleDateClick={handleDateClick}
          handleEventDrop={handleEventDrop}
          handleDateRangeSelect={handleDateRangeSelect}
          handleSubmit={handleSubmit}
        />
      ))}
    </div>
  );
}

export default Calendar;
