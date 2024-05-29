package org.example.backend.Controller;

import org.example.backend.Repository.UserRepository;
import org.example.backend.Service.UserService;
import org.example.backend.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
//@CrossOrigin(origins = "http://localhost:5173/")
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    private final UserService userService;

    @Autowired // This annotation injects the UserService dependency
    public UserController(UserService userService) {
        this.userService = userService;
    }

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

    @PostMapping("/addUser")
    public ResponseEntity<User> addUser(@RequestBody User user) {
        return userService.addUser(user);
    }
}
