package com.gorbasenko245.linguaverse_backend.domain.entity.folder;

import com.gorbasenko245.linguaverse_backend.domain.entity.AuditableEntity;
import com.gorbasenko245.linguaverse_backend.domain.entity.module.Module;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

/**
 * Entity representing a folder containing modules.
 * <p>
 * This entity represents a folder that can hold multiple modules. A folder
 * has a name and a many-to-many relationship with the {@link Module} entity.
 * The class extends {@link AuditableEntity}, which provides audit fields
 * for tracking the creation and update timestamps.
 * </p>
 *
 * @see AuditableEntity
 * @see Module
 */
@Entity(name = "Folder")
@Table(name = "folders")
@Data
@EqualsAndHashCode(callSuper = true)
public class Folder extends AuditableEntity {

    /**
     * The name of the folder.
     * <p>
     * This field represents the name given to the folder. It is stored in the
     * {@code name} column in the database.
     * </p>
     */
    @Basic
    @Column(name = "name")
    private String name;

    /**
     * The list of modules associated with the folder.
     * <p>
     * This is a many-to-many relationship with the {@link Module} entity.
     * The list contains all modules that are part of this folder. The relationship
     * is defined by the {@link JoinTable} annotation, which specifies the
     * {@code folder_modules} join table. This field is excluded from the
     * {@link ToString} and {@link EqualsAndHashCode} methods to prevent circular
     * references and infinite recursion.
     * </p>
     *
     * @see Module
     */
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @ManyToMany(cascade = CascadeType.DETACH, fetch = FetchType.LAZY, targetEntity = Module.class)
    @JoinTable(
            name = "folder_modules",
            indexes = {
                    @Index(name = "idx_fk_folder_to_module", columnList = "folder_id"),
                    @Index(name = "idx_fk_module_to_folder", columnList = "module_id"),
            },
            joinColumns = @JoinColumn(
                    name = "folder_id",
                    referencedColumnName = "id",
                    foreignKey = @ForeignKey(name = "fk_folder_to_module")
            ),
            inverseJoinColumns = @JoinColumn(
                    name = "module_id",
                    referencedColumnName = "id",
                    foreignKey = @ForeignKey(name = "fk_module_to_folder")
            )
    )
    private List<Module> modules = new ArrayList<>();
}
