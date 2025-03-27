package com.gorbasenko245.linguaverse_backend.repository;

import com.gorbasenko245.linguaverse_backend.domain.entity.folder.Folder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Objects;

@Repository
public interface FolderRepository extends JpaRepository<Folder, Long> {

    @Query(nativeQuery = true, value = "select * from folders f where f.name ilike '%' || (:name) || '%'")
    List<Folder> findAllByName(@Param("name") String name);

    default List<Folder> findAll(String name) {
        if(Objects.isNull(name) || name.trim().isEmpty()) {
            return findAll();
        }
        return findAllByName(name);
    }
}
