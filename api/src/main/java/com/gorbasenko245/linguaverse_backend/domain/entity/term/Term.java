package com.gorbasenko245.linguaverse_backend.domain.entity.term;

import com.gorbasenko245.linguaverse_backend.domain.entity.PersistenceObject;
import com.gorbasenko245.linguaverse_backend.domain.entity.module.Module;
import com.gorbasenko245.linguaverse_backend.domain.entity.practice.UserTermProgress;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/**
 * Entity representing a term in the system.
 * <p>
 * A term consists of an order number, a term word, and its corresponding definition.
 * Each term is associated with a {@link Module} and tracks user progress through the
 * {@link UserTermProgress} entity. The term is stored in the {@code terms} table in the database.
 * </p>
 *
 * @see Module
 * @see UserTermProgress
 */
@Entity(name = "Term")
@Table(name = "terms")
@Data
@EqualsAndHashCode(callSuper = true)
public class Term extends PersistenceObject {

    /**
     * The order number of the term.
     * <p>
     * This field represents the position or order of the term within a module. It is stored
     * in the {@code order_number} column in the database.
     * </p>
     */
    @Basic
    @Column(name = "order_number")
    private Long orderNumber;

    /**
     * The term word.
     * <p>
     * This field stores the term itself, which is the word or phrase that is being defined.
     * It is stored in the {@code term} column in the database.
     * </p>
     */
    @Basic
    @Column(name = "term")
    private String term;

    /**
     * The definition of the term.
     * <p>
     * This field contains the definition or explanation of the term. It is stored in the
     * {@code definition} column in the database.
     * </p>
     */
    @Basic
    @Column(name = "definition")
    private String definition;

    /**
     * The module to which the term belongs.
     * <p>
     * This is a many-to-one relationship with the {@link Module} entity. A term is associated
     * with a specific module. The relationship is managed by the {@code module_id} foreign key
     * in the {@code terms} table.
     * </p>
     *
     * @see Module
     */
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @ManyToOne(targetEntity = Module.class, fetch = FetchType.LAZY)
    @JoinColumn(
            name = "module_id",
            referencedColumnName = "id",
            foreignKey = @ForeignKey(name = "fk_term_to_module")
    )
    private Module module;

    /**
     * The list of user progress associated with the term.
     * <p>
     * This is a one-to-many relationship with the {@link UserTermProgress} entity. Each term can
     * track multiple user progress records, indicating the user's learning or interaction with
     * the term. The relationship is managed by the {@code originTerm} field in the
     * {@link UserTermProgress} entity.
     * </p>
     *
     * @see UserTermProgress
     */
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @OneToMany(mappedBy = "originTerm", cascade = CascadeType.ALL, fetch = FetchType.LAZY, targetEntity = UserTermProgress.class, orphanRemoval = true)
    private List<UserTermProgress> progressList = new ArrayList<>();
}
