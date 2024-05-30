package org.example.backend.Controller;

import jakarta.transaction.Transactional;
import org.example.backend.Repository.ReservationRepository;
import org.example.backend.Repository.SalleRepository;
import org.example.backend.model.Reservation;
import org.example.backend.model.Salle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import javax.validation.Valid;

@RestController
@RequestMapping("/api")
public class SalleController {

    @Autowired
    private SalleRepository salleRepository;

    @Autowired
    private ReservationRepository reservationRepository;

    // Méthode pour récupérer toutes les salles depuis la base de données
    @GetMapping("/salles")
    public List<Salle> getAllSalles() {
        return salleRepository.findAll();
    }
    // Backend Controller
    @GetMapping("/salles/{id}/reservations")
    public ResponseEntity<List<Reservation>> getReservationsBySalleId(@PathVariable Long id) {
        try {
            List<Reservation> reservations = reservationRepository.findBySalleId(id);
            return ResponseEntity.ok(reservations);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    //Num of rooms
    @GetMapping("/Num_salle")
    public Long get_Users() {
        return salleRepository.count();
    }

    //Add rooms

    @PostMapping("/addSalle")
    public Salle addSalle(@Valid @RequestBody Salle salle) {

        return salleRepository.save(salle);
    }
}