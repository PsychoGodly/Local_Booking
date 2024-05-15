package org.example.backend.Controller;


import org.example.backend.model.Reservation;
import org.example.backend.model.Salle;
import org.example.backend.model.User;
import java.util.List;

public class DataInsertionRequest {
    private List<User> users;
    private List<Salle> salles;
    private List<Reservation> reservations;

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    public List<Salle> getSalles() {
        return salles;
    }

    public void setSalles(List<Salle> salles) {
        this.salles = salles;
    }

    public List<Reservation> getReservations() {
        return reservations;
    }

    public void setReservations(List<Reservation> reservations) {
        this.reservations = reservations;
    }
}

