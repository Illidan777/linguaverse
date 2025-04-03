package com.gorbasenko245.linguaverse_backend.repository;

import com.gorbasenko245.linguaverse_backend.domain.entity.practice.UserPractice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repository interface for accessing UserPractice entities.
 * Provides methods for querying the database for UserPractice records.
 */
@Repository
public interface UserPracticeRepository extends JpaRepository<UserPractice, Long> {

    /**
     * Finds a UserPractice entity by the module ID.
     *
     * @param moduleId the ID of the module for which the UserPractice is to be fetched
     * @return an Optional containing the UserPractice entity if found, or empty if not found
     */
    Optional<UserPractice> findByModule_Id(Long moduleId);
}
