package com.gorbasenko245.linguaverse_backend.repository;

import com.gorbasenko245.linguaverse_backend.domain.entity.practice.UserTermProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserTermProgressRepository extends JpaRepository<UserTermProgress, Long> {

    @Query("select utp from UserTermProgress utp where utp.originTerm.id = :termId and utp.userPractice.id = :userPracticeId")
    Optional<UserTermProgress> findByTerm_IdAndUserPractice_Id(@Param("termId") Long termId, @Param("userPracticeId") Long userPracticeId);
}
