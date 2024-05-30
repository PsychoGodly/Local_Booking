package org.example.backend.Controller;

import jakarta.transaction.Transactional;
import org.example.backend.DTO.HolidayDTO;
import org.example.backend.Repository.HolidayRepository;
import org.example.backend.Service.ApiService;
import org.example.backend.Service.HolidayService;
import org.example.backend.model.Holiday;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class HolidayController {
    private final ApiService apiService;
    private final HolidayService holidayService;
    private final HolidayRepository holidayRepository;

    public HolidayController(ApiService apiService, HolidayService holidayService, HolidayRepository holidayRepository) {
        this.apiService = apiService;
        this.holidayService = holidayService;
        this.holidayRepository = holidayRepository;
    }

    @GetMapping("/fetch-and-save")
    public List<Holiday> fetchAndSaveHolidays() {
        String apiUrl = "https://date.nager.at/api/v3/PublicHolidays/2024/MA";
        List<HolidayDTO> holidayDTOs = apiService.fetchHolidays(apiUrl);
        if (holidayDTOs != null) {
            return holidayService.saveHolidays(holidayDTOs);
        } else {
            // Handle error appropriately
            return null;
        }
    }

    @GetMapping("/holidays")
    public List<Holiday> getAllHolidays() {
        return holidayService.findAll();
    }

    @GetMapping("/Num_event")
    public Long get_Users() {
        return holidayRepository.count();
    }



    @PostMapping("/addEvent")
    public ResponseEntity<String> addEvent(@RequestBody Holiday event) {
        try {
            Holiday savedHoliday = holidayRepository.save(event);
            return new ResponseEntity<>("Holiday added with ID: " + savedHoliday.getId(), HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to add holiday", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
