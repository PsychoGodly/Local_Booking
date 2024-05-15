package org.example.backend.Repository;

import org.example.backend.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findBySalleId(Long salleId);

    List<Reservation> findByUserId(Long userId);

    List<Reservation> findBySalleSalleName(String salleName);
}