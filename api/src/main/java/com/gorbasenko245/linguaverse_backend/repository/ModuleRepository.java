package com.gorbasenko245.linguaverse_backend.repository;

import com.gorbasenko245.linguaverse_backend.domain.entity.module.Module;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Objects;

/**
 * Repository interface for accessing Module entities.
 * Provides methods for querying the database for Module records.
 */
@Repository
public interface ModuleRepository extends JpaRepository<Module, Long> {

    /**
     * Finds modules by their name using a case-insensitive search.
     *
     * @param name the name to search for in module names
     * @param sort the sorting criteria for the results
     * @return a list of modules matching the search criteria
     */
    @Query(nativeQuery = true, value = "select * from modules m where m.name ilike '%' || (:name) || '%'")
    List<Module> findAllByName(@Param("name") String name, Sort sort);

    /**
     * Finds all modules, either by name (if provided) or by default sorting by creation date in descending order.
     *
     * @param name the name to search for, or null for fetching all modules
     * @return a list of modules sorted by creation date
     */
    default List<Module> findAll(String name) {
        if(Objects.isNull(name) || name.trim().isEmpty()) {
            return findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
        }
        return findAllByName(name, Sort.by(Sort.Direction.DESC, "created_at"));
    }

    /**
     * Deletes the links between modules and folders based on the module's ID.
     *
     * @param moduleId the ID of the module for which folder links should be deleted
     */
    @Query(nativeQuery = true, value = "DELETE FROM folder_modules fm where fm.module_id = :moduleId ")
    @Modifying
    @Transactional
    void deleteFolderLinks(@Param("moduleId") Long moduleId);
}
