package org.example.backend.Controller;

import org.example.backend.Repository.SalleRepository;
import org.example.backend.model.Salle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class SalleController {

    @Autowired
    private SalleRepository salleRepository;

    // Méthode pour récupérer toutes les salles depuis la base de données
    @GetMapping("/salles")
    public List<Salle> getAllSalles() {
        return salleRepository.findAll();
    }

    

}