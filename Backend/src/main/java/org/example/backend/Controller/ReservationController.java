package org.example.backend.Controller;

import org.example.backend.Repository.ReservationRepository;
import org.example.backend.Repository.SalleRepository;
import org.example.backend.Repository.UserRepository;
import org.example.backend.model.Reservation;
import org.example.backend.model.Salle;
import org.example.backend.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

    // Endpoint to insert a new reservation
    @PostMapping("/reservations")
    public ResponseEntity<Reservation> addReservation(@RequestBody Reservation newReservation) {
        try {
            // Check if the salle and user associated with the reservation exist
            Salle salle = salleRepository.findById(newReservation.getSalle().getId())
                    .orElseThrow(() -> new RuntimeException("Salle not found"));
            User user = userRepository.findById(Math.toIntExact(newReservation.getUser().getId()))
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // Assign the salle and user to the reservation
            newReservation.setSalle(salle);
            newReservation.setUser(user);

            // Save the new reservation to the database
            Reservation savedReservation = reservationRepository.save(newReservation);
            return ResponseEntity.ok(savedReservation);
        } catch (Exception e) {
            // If an error occurs, return an internal server error response
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Endpoint to retrieve reservations by salle type
    @GetMapping("/salle/reservations")
    public List<Reservation> getReservationsBySalleType(@RequestParam(defaultValue = "1") Long salleTypeId) {
        // Récupérer les réservations associées à la salle
        List<Reservation> reservations = reservationRepository.findBySalleId(salleTypeId);

        // Renvoyer les réservations avec les détails de la salle
        for (Reservation reservation : reservations) {
            // Récupérer les détails de la salle associée à cette réservation
            Salle salle = reservation.getSalle();
            // Ajouter les détails de la salle à la réservation
            reservation.setSalle(salle);
        }

        return reservations;
    }




}