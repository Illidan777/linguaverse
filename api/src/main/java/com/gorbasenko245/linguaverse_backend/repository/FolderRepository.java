package com.gorbasenko245.linguaverse_backend.repository;

import com.gorbasenko245.linguaverse_backend.domain.entity.folder.Folder;
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
 * Repository interface for accessing Folder entities.
 * Provides methods for querying the database for Folder records.
 */
@Repository
public interface FolderRepository extends JpaRepository<Folder, Long> {

    /**
     * Finds folders by their name using a case-insensitive search.
     *
     * @param name the name to search for in folder names
     * @param sort the sorting criteria for the results
     * @return a list of folders matching the search criteria
     */
    @Query(nativeQuery = true, value = "select * from folders f where f.name ilike '%' || (:name) || '%'")
    List<Folder> findAllByName(@Param("name") String name, Sort sort);

    /**
     * Finds all folders, either by name (if provided) or by default sorting by creation date in descending order.
     *
     * @param name the name to search for, or null for fetching all folders
     * @return a list of folders sorted by creation date
     */
    default List<Folder> findAll(String name) {
        if(Objects.isNull(name) || name.trim().isEmpty()) {
            return findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
        }
        return findAllByName(name, Sort.by(Sort.Direction.DESC, "created_at"));
    }

    /**
     * Deletes the links between folders and modules based on the folder's ID.
     *
     * @param folderId the ID of the folder for which module links should be deleted
     */
    @Query(nativeQuery = true, value = "DELETE FROM folder_modules fm where fm.folder_id = :folderId ")
    @Modifying
    @Transactional
    void deleteModuleLinks(@Param("folderId") Long folderId);
}
