package org.example.backend.Controller;

// EventController.java
import org.example.backend.Repository.EventRepository;
import org.example.backend.model.Event;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173") // Autorise les requêtes CORS uniquement depuis http://localhost:5173
public class EventController {

    @Autowired
    private EventRepository eventRepository;

    @PostMapping("/api/events")
    public Event createEvent(@RequestBody Event event) {
        return eventRepository.save(event);
    }

    @GetMapping("/test")
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }
}
