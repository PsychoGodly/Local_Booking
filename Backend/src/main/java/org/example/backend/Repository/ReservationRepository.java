package org.example.backend.Repository;

import org.example.backend.model.Reservation;
import org.example.backend.model.Salle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {


    List<Reservation> findBySalleId(Long salleId);


    // Méthode utilisant une requête HQL personnalisée pour récupérer les réservations par ID utilisateur
    @Query("SELECT r FROM Reservation r WHERE r.user.id = :userId")
    List<Reservation> findByUserId(Long userId);
}