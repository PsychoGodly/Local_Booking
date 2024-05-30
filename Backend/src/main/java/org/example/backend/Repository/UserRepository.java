package org.example.backend.Repository;

import org.example.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepository extends JpaRepository<User, Long> {
    /*long count();

     */

    Optional<User> findByUsername(String username);
    long count();

    Optional<User> findByRole(String admin);
}
