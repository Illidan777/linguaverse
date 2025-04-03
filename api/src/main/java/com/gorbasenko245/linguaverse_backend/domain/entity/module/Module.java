package com.gorbasenko245.linguaverse_backend.domain.entity.module;

import com.gorbasenko245.linguaverse_backend.domain.entity.AuditableEntity;
import com.gorbasenko245.linguaverse_backend.domain.entity.folder.Folder;
import com.gorbasenko245.linguaverse_backend.domain.entity.practice.UserPractice;
import com.gorbasenko245.linguaverse_backend.domain.entity.term.Term;
import com.gorbasenko245.linguaverse_backend.domain.enums.ModuleStatus;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

/**
 * Entity representing a module in the system.
 * <p>
 * A module can have a name, description, and a status. It can be associated with multiple
 * {@link Folder} entities and contains multiple {@link Term} entities. The module also
 * tracks user practices through the {@link UserPractice} entity. It inherits from
 * {@link AuditableEntity}, which provides audit fields for tracking creation and update timestamps.
 * </p>
 *
 * @see AuditableEntity
 * @see Folder
 * @see Term
 * @see UserPractice
 */
@Entity(name = "Module")
@Table(name = "modules")
@Data
@EqualsAndHashCode(callSuper = true)
public class Module extends AuditableEntity {

    /**
     * The name of the module.
     * <p>
     * This field represents the name given to the module. It is stored in the
     * {@code name} column in the database.
     * </p>
     */
    @Basic
    @Column(name = "name")
    private String name;

    /**
     * The description of the module.
     * <p>
     * This field provides a textual description of the module, which can be used to explain
     * its content or purpose. It is stored in the {@code description} column in the database.
     * </p>
     */
    @Basic
    @Column(name = "description")
    private String description;

    /**
     * The status of the module.
     * <p>
     * This field represents the current status of the module, which is of type {@link ModuleStatus}.
     * It is stored in the {@code status} column in the database, with values mapped from the
     * {@link ModuleStatus} enum.
     * </p>
     *
     * @see ModuleStatus
     */
    @Basic
    @Column(name = "status")
    @Enumerated(value = EnumType.STRING)
    private ModuleStatus status;

    /**
     * The list of terms associated with the module.
     * <p>
     * This is a one-to-many relationship with the {@link Term} entity. Each module can have multiple
     * terms associated with it. The list is ordered by {@code orderNumber} in ascending order.
     * </p>
     *
     * @see Term
     */
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @OrderBy("orderNumber ASC")
    @OneToMany(mappedBy = "module", cascade = CascadeType.ALL, fetch = FetchType.LAZY, targetEntity = Term.class, orphanRemoval = true)
    private List<Term> terms = new ArrayList<>();

    /**
     * The list of folders that contain this module.
     * <p>
     * This is a many-to-many relationship with the {@link Folder} entity. A module can be part of
     * multiple folders. The relationship is mapped by the {@code modules} field in the {@link Folder} entity.
     * </p>
     *
     * @see Folder
     */
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @ManyToMany(mappedBy = "modules", cascade = CascadeType.DETACH, fetch = FetchType.LAZY, targetEntity = Folder.class)
    private List<Folder> folders = new ArrayList<>();

    /**
     * The list of user practices associated with the module.
     * <p>
     * This is a one-to-many relationship with the {@link UserPractice} entity. Each module can have multiple
     * user practices associated with it, tracking the interaction of users with the module content.
     * </p>
     *
     * @see UserPractice
     */
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @OneToMany(mappedBy = "module", cascade = CascadeType.ALL, fetch = FetchType.LAZY, targetEntity = UserPractice.class, orphanRemoval = true)
    private List<UserPractice> practices = new ArrayList<>();
}
