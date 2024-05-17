package org.example.backend.Controller;


import org.example.backend.Repository.UserRepository;
import org.example.backend.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173/")
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // List des Users
    @GetMapping("/users")
    public List<User> get_Users() {
        return userRepository.findAll();
    }



}

