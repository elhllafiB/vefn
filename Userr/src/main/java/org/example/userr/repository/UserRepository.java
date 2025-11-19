package org.example.userr.repository;

import org.example.userr.entity.UserCredential;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface UserRepository extends JpaRepository<UserCredential, Integer> {
    Optional<UserCredential> findByName(String name);

    Optional<UserCredential> findByEmail(String email);

}
