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

    /*
    @GetMapping("/salles/reservations")
    public List<Reservation> get_Reservation() {
        return reservationRepository.findAll();
    }

     */

    @GetMapping("/salle/reservations")
    public List<Reservation> getReservationsBySalleName(@RequestParam String salleName) {
        return reservationRepository.findBySalleSalleName(salleName);
    }
}

