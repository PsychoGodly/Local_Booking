import React, { useState } from "react";

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

    if (!event) {
      alert("Please enter the event name.");
      return;
    }

    onSubmit({ event, comment, participants, color, roomType });
  };

  return (
    <div className="event-form">
      <h2>New Event</h2>
      <form onSubmit={handleSubmit}>
        <label>Event Name:</label>
        <input
          type="text"
          name="event"
          value={formData.event}
          onChange={handleChange}
        />
        <label>Comment:</label>
        <textarea
          name="comment"
          value={formData.comment}
          onChange={handleChange}
        ></textarea>
        <label>Participants:</label>
        <input
          type="text"
          name="participants"
          value={formData.participants}
          onChange={handleChange}
        />
        <label>Color:</label>
        <input
          type="color"
          name="color"
          value={formData.color}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default EventForm;