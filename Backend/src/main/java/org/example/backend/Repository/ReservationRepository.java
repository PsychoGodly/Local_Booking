package org.example.backend.Repository;

import org.example.backend.model.Reservation;
import org.example.backend.model.Salle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.Month;
import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    List<Reservation> findBySalle(Salle salle);

    List<Reservation> findBySalleId(Long id);

    long count();

    @Query("SELECT COUNT(r) FROM Reservation r WHERE MONTH(r.startTime) = :month AND YEAR(r.startTime) = :year")
    int countByMonthAndYear(@Param("month") int month, @Param("year") int year);
}