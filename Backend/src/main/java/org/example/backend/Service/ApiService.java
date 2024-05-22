package org.example.backend.Service;

import org.example.backend.DTO.HolidayDTO;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.client.HttpClientErrorException;

import java.util.Arrays;
import java.util.List;

@Service
public class ApiService {
    private final RestTemplate restTemplate;

    public ApiService() {
        this.restTemplate = new RestTemplate();
    }

    public List<HolidayDTO> fetchHolidays(String apiUrl) {
        try {
            HolidayDTO[] holidays = restTemplate.getForObject(apiUrl, HolidayDTO[].class);
            return Arrays.asList(holidays);
        } catch (HttpClientErrorException e) {
            // Handle the error
            e.printStackTrace();
            return null;
        }
    }
}
