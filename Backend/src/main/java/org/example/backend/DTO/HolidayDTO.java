package org.example.backend.DTO;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.time.LocalDate;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class HolidayDTO {
    private LocalDate date;
    private String name;

    // Getters and Setters


}
