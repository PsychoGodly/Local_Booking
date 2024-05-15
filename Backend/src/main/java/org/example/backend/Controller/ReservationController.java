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

    

    // Endpoint pour récupérer toutes les réservations depuis la base de données
    @GetMapping("/salle/reservations")
    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }




}