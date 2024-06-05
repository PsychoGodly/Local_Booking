    package org.example.backend.Service;

import org.example.backend.Repository.UserRepository;
import org.example.backend.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public Optional<User> getAdminProfile() {
        return userRepository.findByRole("admin");
    }


    public User addUser(User user) throws Exception {
        try {
            return userRepository.save(user);
        } catch (Exception e) {
            throw new Exception("Failed to add user", e);
        }
    }
}
