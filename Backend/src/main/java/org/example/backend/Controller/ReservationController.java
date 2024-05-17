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
    @PostMapping("/reservations")
    public ResponseEntity<Reservation> addReservation(@RequestBody Reservation newReservation) {
        try {
            // Get the first user from the database
            User user = userRepository.findAll().stream().findFirst()
                    .orElseThrow(() -> new RuntimeException("No user found"));

            // Get the first salle from the database
            Salle salle = salleRepository.findAll().stream().findFirst()
                    .orElseThrow(() -> new RuntimeException("No salle found"));

            // Set the user and salle for the reservation
            newReservation.setUser(user);
            newReservation.setSalle(salle);

            // Save the new reservation to the database
            Reservation savedReservation = reservationRepository.save(newReservation);
            return ResponseEntity.ok(savedReservation);
        } catch (Exception e) {
            // If an error occurs, return an internal server error response
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }






    // Endpoint pour modifier une réservation existante
    @PutMapping("/reservations/{id}")
    public ResponseEntity<Reservation> updateReservation(@PathVariable Long id, @RequestBody Reservation updatedReservation) {
        try {
            // Rechercher la réservation dans la base de données par son ID
            Reservation existingReservation = reservationRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Reservation not found"));

            // Mettre à jour les champs de la réservation existante avec les nouvelles valeurs
            existingReservation.setStartTime(updatedReservation.getStartTime());
            existingReservation.setEndTime(updatedReservation.getEndTime());
            existingReservation.setComment(updatedReservation.getComment());
            existingReservation.setDuration(updatedReservation.getDuration());
            existingReservation.setColor(updatedReservation.getColor());

            // Enregistrer les modifications dans la base de données
            Reservation savedReservation = reservationRepository.save(existingReservation);
            return ResponseEntity.ok(savedReservation);
        } catch (Exception e) {
            // Si une erreur se produit, renvoyer une réponse d'erreur interne du serveur
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }




}