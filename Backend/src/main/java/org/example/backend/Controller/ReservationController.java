package org.example.backend.Controller;

import org.example.backend.Repository.ReservationRepository;
import org.example.backend.Repository.SalleRepository;
import org.example.backend.Repository.UserRepository;
import org.example.backend.model.Reservation;

import org.example.backend.model.Salle;
import org.example.backend.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173/")
@RequestMapping("/api")
public class ReservationController {


    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SalleRepository salleRepository;

    // Endpoint pour récupérer les réservations par type de salle
    @GetMapping("/salle/reservations")
    public ResponseEntity<List<Reservation>> getReservationsBySalleType(@RequestParam(defaultValue = "1") Long salleTypeId) {
        try {
            Salle salle = salleRepository.findById(salleTypeId)
                    .orElseThrow(() -> new RuntimeException("Salle not found"));
            List<Reservation> reservations = reservationRepository.findBySalle(salle);
            return ResponseEntity.ok(reservations);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Endpoint pour insérer une nouvelle réservation
    @PostMapping(value = "/reservations", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Reservation> addReservation(@RequestBody Reservation newReservation) {
        try {
            Reservation savedReservation = reservationRepository.save(newReservation);
            return ResponseEntity.ok(savedReservation);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }








}