package org.example.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.fasterxml.jackson.annotation.JsonBackReference;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String color;

    @ManyToOne
    @JoinColumn(name = "salleID")
    @JsonBackReference
    private Salle salle;

    @ManyToOne
    @JoinColumn(name = "userID")
    @JsonBackReference
    private User user;

    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private int duration;
    private String comment;
}
