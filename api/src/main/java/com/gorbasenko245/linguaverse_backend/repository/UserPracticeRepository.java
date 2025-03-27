package com.gorbasenko245.linguaverse_backend.repository;

import com.gorbasenko245.linguaverse_backend.domain.entity.practice.UserPractice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserPracticeRepository extends JpaRepository<UserPractice, Long> {

    Optional<UserPractice> findByModule_Id(Long moduleId);
}
