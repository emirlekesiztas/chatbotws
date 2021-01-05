package com.emir.chatbot.repository;

import com.emir.chatbot.entity.User;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User,Long> {
    List<User> findAll(Sort sort);
    User findByUserName(String userName);
}
