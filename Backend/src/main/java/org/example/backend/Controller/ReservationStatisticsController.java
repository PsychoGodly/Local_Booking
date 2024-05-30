package org.example.backend.Controller;

import org.example.backend.Repository.ReservationRepository;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.time.Month;
import java.time.Year;
import java.util.HashMap;
import java.util.List;
import java.util.Map;



@RestController
@RequestMapping("/api")
public class ReservationStatisticsController {

    private final ReservationRepository reservationRepository;

    public ReservationStatisticsController(ReservationRepository reservationRepository) {
        this.reservationRepository = reservationRepository;
    }

    @GetMapping("/reservation-statistics")
    public Map<String, Integer> getReservationStatistics() {
        Map<String, Integer> statistics = new HashMap<>();

        for (Month month : Month.values()) {
            int reservationsCount = countReservationsByMonth(month);
            statistics.put(month.toString(), reservationsCount);
        }

        return statistics;
    }

    private int countReservationsByMonth(Month month) {
        // Extract month and year from the current iteration
        int monthValue = month.getValue();
        int year = Year.now().getValue();

        // Call the repository method to count reservations for the specified month and year
        return reservationRepository.countByMonthAndYear(monthValue, year);
    }
}
