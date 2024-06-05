package org.example.backend.Controller;


import org.example.backend.Repository.UserRepository;
import org.example.backend.Service.UserService;
import org.example.backend.model.Holiday;
import org.example.backend.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:5173/")
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    // List des Users
    @GetMapping("/users")
    public List<User> get_Users() {
        return userRepository.findAll();
    }


    @GetMapping("/Num_user")
    public Long getNum_Users() {
        return userRepository.count();
    }


    @DeleteMapping("/user/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        try {
            if (userRepository.existsById(id)) {
                userRepository.deleteById(id);
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @PostMapping(value = "/addUser", consumes = "application/json", produces = "application/json")
    public ResponseEntity<String> addUser(@RequestBody User user) {
        try {
            User savedUser = userService.addUser(user);
            return new ResponseEntity<>("User added with ID: " + savedUser.getId(), HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to add user", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }




    @GetMapping("/admin/profile")
    public ResponseEntity<User> getAdminProfile() {
        Optional<User> admin = userService.getAdminProfile();
        if (admin.isPresent()) {
            return ResponseEntity.ok(admin.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}

