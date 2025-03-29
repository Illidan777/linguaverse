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

@Repository
public interface FolderRepository extends JpaRepository<Folder, Long> {

    @Query(nativeQuery = true, value = "select * from folders f where f.name ilike '%' || (:name) || '%'")
    List<Folder> findAllByName(@Param("name") String name, Sort sort);

    default List<Folder> findAll(String name) {
        if(Objects.isNull(name) || name.trim().isEmpty()) {
            return findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
        }
        return findAllByName(name, Sort.by(Sort.Direction.DESC, "created_at"));
    }

    @Query(nativeQuery = true, value = "DELETE FROM folder_modules fm where fm.folder_id = :folderId ")
    @Modifying
    @Transactional
    void deleteModuleLinks(@Param("folderId") Long folderId);
}
