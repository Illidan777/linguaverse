package com.gorbasenko245.linguaverse_backend.repository;

import com.gorbasenko245.linguaverse_backend.domain.entity.term.Term;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository interface for accessing Term entities.
 * Provides methods for querying the database for Term records.
 */
@Repository
public interface TermRepository extends JpaRepository<Term, Long> {

    /**
     * Finds all terms associated with a specific module, ordered by their order number.
     *
     * @param moduleId the ID of the module for which terms are to be fetched
     * @return a list of terms associated with the given module, ordered by their order number in ascending order
     */
    @Query("select t from Term t where t.module.id = :moduleId order by t.orderNumber asc")
    List<Term> findAllByModuleIdOrdered(@Param("moduleId") Long moduleId);
}
