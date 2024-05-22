package org.example.backend.Service;

import org.example.backend.DTO.HolidayDTO;
import org.example.backend.Repository.HolidayRepository;
import org.example.backend.model.Holiday;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class HolidayService {
    private final HolidayRepository repository;

    public HolidayService(HolidayRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public List<Holiday> saveHolidays(List<HolidayDTO> holidayDTOs) {
        List<Holiday> holidays = holidayDTOs.stream().map(dto -> {
            Holiday holiday = new Holiday();
            holiday.setDate(dto.getDate());
            holiday.setName(dto.getName());
            return holiday;
        }).toList();
        return repository.saveAll(holidays);
    }

    public List<Holiday> findAll() {
        return repository.findAll();
    }
}

