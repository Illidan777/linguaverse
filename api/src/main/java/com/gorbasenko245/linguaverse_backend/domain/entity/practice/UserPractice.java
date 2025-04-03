package com.gorbasenko245.linguaverse_backend.domain.entity.practice;

import com.gorbasenko245.linguaverse_backend.domain.entity.AuditableEntity;
import com.gorbasenko245.linguaverse_backend.domain.entity.module.Module;
import com.gorbasenko245.linguaverse_backend.domain.enums.PracticeType;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

/**
 * Entity representing a user's practice session.
 * <p>
 * This entity captures the details of a user's practice session, including their preferences
 * (such as shuffling terms or following progress), the specific module they are practicing,
 * and the associated term progress for that session.
 * The entity is stored in the {@code user_practice} table in the database.
 * </p>
 *
 * @see Module
 * @see UserTermProgress
 * @see PracticeType
 */
@Entity(name = "UserPractice")
@Table(name = "user_practice")
@Data
@EqualsAndHashCode(callSuper = true)
public class UserPractice extends AuditableEntity {

    /**
     * The current term number in the practice session.
     * <p>
     * This field tracks the current term number the user is working on in their practice
     * session. It is used to indicate the position within the set of terms being practiced.
     * The default value is {@code 1}, and it cannot be {@code null}.
     * </p>
     */
    @Basic
    @Column(name = "current_term_number", columnDefinition = "bigint default 1", nullable = false)
    private Long currentTermNumber;

    /**
     * Indicates whether the user's progress should be followed during the practice session.
     * <p>
     * This field tracks whether the user wants to follow their progress in the session.
     * If {@code true}, the progress is monitored and recorded. The default value is {@code false},
     * and it cannot be {@code null}.
     * </p>
     */
    @Basic
    @Column(name = "follow_progress", columnDefinition = "boolean default false", nullable = false)
    private Boolean followProgress;

    /**
     * Indicates whether the terms should be shuffled during the practice session.
     * <p>
     * This field tracks whether the user wants to shuffle the terms in the practice session.
     * If {@code true}, the terms will be presented in random order. The default value is {@code false},
     * and it cannot be {@code null}.
     * </p>
     */
    @Basic
    @Column(name = "suffle_mode", columnDefinition = "boolean default false", nullable = false)
    private Boolean shuffleMode;

    /**
     * The type of practice session being conducted.
     * <p>
     * This field indicates the type of practice the user is performing, such as flashcards.
     * The type is stored in the {@code practice_type} column as an enum value from the
     * {@link PracticeType} enum.
     * </p>
     *
     * @see PracticeType
     */
    @Basic
    @Column(name = "practice_type")
    @Enumerated(value = EnumType.STRING)
    private PracticeType practiceType;

    /**
     * The module associated with this user practice session.
     * <p>
     * This is a many-to-one relationship with the {@link Module} entity. It links the practice
     * session to the specific module being practiced. The relationship is managed by the
     * {@code module_id} foreign key in the {@code user_practice} table.
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
            foreignKey = @ForeignKey(name = "fk_practice_to_module")
    )
    private Module module;

    /**
     * The progress of the user on individual terms in this practice session.
     * <p>
     * This is a one-to-many relationship with the {@link UserTermProgress} entity. It tracks the
     * user's progress on each term in the session. The relationship is managed by the {@code userPractice}
     * field in the {@link UserTermProgress} entity.
     * </p>
     *
     * @see UserTermProgress
     */
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @OneToMany(mappedBy = "userPractice", cascade = CascadeType.ALL, fetch = FetchType.LAZY, targetEntity = UserTermProgress.class)
    private List<UserTermProgress> terms = new ArrayList<>();
}
