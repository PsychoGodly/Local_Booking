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
    private UserRepository userRepository;

    @Autowired
    private SalleRepository salleRepository;

    @Autowired
    private ReservationRepository reservationRepository;

    // Endpoint pour insérer des données initiales (utilisateurs, salles et réservations)
    @PostMapping("/insert-data")
    public String insertData(@RequestBody DataInsertionRequest request) {
        // Insérer les utilisateurs
        List<User> users = request.getUsers();
        for (User user : users) {
            userRepository.save(user);
        }

        // Insérer les salles
        List<Salle> salles = request.getSalles();
        for (Salle salle : salles) {
            salleRepository.save(salle);
        }

        // Insérer les réservations
        List<Reservation> reservations = request.getReservations();
        for (Reservation reservation : reservations) {
            reservationRepository.save(reservation);
        }

        return "Données insérées avec succès";
    }






    // Endpoint pour récupérer les réservations d'un utilisateur spécifique avec l'ID utilisateur 1
    @GetMapping("/reservations/user/{userId}")
    public List<Reservation> getReservationsByUserId(@PathVariable Long userId) {
        return reservationRepository.findByUserId(userId);
    }

    // Endpoint pour enregistrer une nouvelle réservation
    @PostMapping("/salles/reservations")
    public ResponseEntity<Reservation> addReservation(@RequestBody Reservation newReservation) {
        try {
            // Enregistrement de la nouvelle réservation dans la base de données
            Reservation savedReservation = reservationRepository.save(newReservation);
            return ResponseEntity.ok(savedReservation);
        } catch (Exception e) {
            // En cas d'erreur, renvoyer une réponse d'erreur
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}

