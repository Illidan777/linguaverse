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

@Repository
public interface ModuleRepository extends JpaRepository<Module, Long> {

    @Query(nativeQuery = true, value = "select * from modules m where m.name ilike '%' || (:name) || '%'")
    List<Module> findAllByName(@Param("name") String name, Sort sort);

    default List<Module> findAll(String name) {
        if(Objects.isNull(name) || name.trim().isEmpty()) {
            return findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
        }
        return findAllByName(name, Sort.by(Sort.Direction.DESC, "created_at"));
    }

    @Query(nativeQuery = true, value = "DELETE FROM folder_modules fm where fm.module_id = :moduleId ")
    @Modifying
    @Transactional
    void deleteFolderLinks(@Param("moduleId") Long moduleId);
}
