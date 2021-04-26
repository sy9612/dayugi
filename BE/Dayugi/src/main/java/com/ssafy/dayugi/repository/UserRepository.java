package com.ssafy.dayugi.repository;

import com.ssafy.dayugi.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    public Optional<User> findUserByEmail(String Email);
    public int deleteUserByEmail(String Email);
}
