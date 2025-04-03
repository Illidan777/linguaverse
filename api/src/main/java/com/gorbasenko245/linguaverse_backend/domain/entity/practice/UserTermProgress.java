package com.gorbasenko245.linguaverse_backend.domain.entity.practice;

import com.gorbasenko245.linguaverse_backend.domain.entity.AuditableEntity;
import com.gorbasenko245.linguaverse_backend.domain.entity.term.Term;
import com.gorbasenko245.linguaverse_backend.domain.enums.TermStatus;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

/**
 * Entity representing the progress of a user for a specific term during their practice.
 * <p>
 * This entity tracks the status of a user's interaction with a term in the context of
 * a practice session. It stores the status of the term, the term being practiced,
 * and the specific user practice session to which the progress belongs.
 * The entity is stored in the {@code user_term_practice} table in the database.
 * </p>
 *
 * @see Term
 * @see UserPractice
 * @see TermStatus
 */
@Entity(name = "UserTermProgress")
@Table(name = "user_term_practice")
@Data
@EqualsAndHashCode(callSuper = true)
public class UserTermProgress extends AuditableEntity {

    /**
     * The status of the term in the context of the user's practice session.
     * <p>
     * This field tracks the current status of the term for the user. The status can be
     * one of the values defined in the {@link TermStatus} enum, such as {@code NOT_STARTED},
     * {@code IN_PROGRESS}, or {@code LEARNED}. It is stored in the {@code status} column
     * in the database.
     * </p>
     *
     * @see TermStatus
     */
    @Basic
    @Column(name = "status")
    @Enumerated(value = EnumType.STRING)
    private TermStatus status;

    /**
     * The term associated with the user's practice progress.
     * <p>
     * This is a many-to-one relationship with the {@link Term} entity. It links the
     * user's progress to the specific term being practiced. The relationship is managed
     * by the {@code term_id} foreign key in the {@code user_term_practice} table.
     * </p>
     *
     * @see Term
     */
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @ManyToOne(targetEntity = Term.class, fetch = FetchType.LAZY)
    @JoinColumn(
            name = "term_id",
            referencedColumnName = "id",
            foreignKey = @ForeignKey(name = "fk_practice_to_origin_term")
    )
    private Term originTerm;

    /**
     * The user practice session associated with the progress.
     * <p>
     * This is a many-to-one relationship with the {@link UserPractice} entity. It links the
     * user's progress to a specific practice session. The relationship is managed by the
     * {@code practice_id} foreign key in the {@code user_term_practice} table.
     * </p>
     *
     * @see UserPractice
     */
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @ManyToOne(targetEntity = UserPractice.class, fetch = FetchType.LAZY)
    @JoinColumn(
            name = "practice_id",
            referencedColumnName = "id",
            foreignKey = @ForeignKey(name = "fk_practice_to_term")
    )
    private UserPractice userPractice;
}
