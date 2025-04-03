package com.gorbasenko245.linguaverse_backend.repository;

import com.gorbasenko245.linguaverse_backend.domain.entity.practice.UserTermProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repository interface for accessing UserTermProgress entities.
 * Provides methods for querying the database for UserTermProgress records.
 */
@Repository
public interface UserTermProgressRepository extends JpaRepository<UserTermProgress, Long> {

    /**
     * Finds a UserTermProgress entity by the term ID and user practice ID.
     *
     * @param termId the ID of the term for which the UserTermProgress is to be fetched
     * @param userPracticeId the ID of the user practice associated with the term
     * @return an Optional containing the UserTermProgress entity if found, or empty if not found
     */
    @Query("select utp from UserTermProgress utp where utp.originTerm.id = :termId and utp.userPractice.id = :userPracticeId")
    Optional<UserTermProgress> findByTerm_IdAndUserPractice_Id(@Param("termId") Long termId, @Param("userPracticeId") Long userPracticeId);
}
