package com.gorbasenko245.linguaverse_backend.domain.entity.practice;

import com.gorbasenko245.linguaverse_backend.domain.entity.AuditableEntity;
import com.gorbasenko245.linguaverse_backend.domain.entity.term.Term;
import com.gorbasenko245.linguaverse_backend.domain.enums.TermStatus;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Entity(name = "UserTermProgress")
@Table(name = "user_term_practice")
@Data
@EqualsAndHashCode(callSuper = true)
public class UserTermProgress extends AuditableEntity {

    @Basic
    @Column(name = "status")
    @Enumerated(value = EnumType.STRING)
    private TermStatus status;

    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @ManyToOne(targetEntity = Term.class, fetch = FetchType.LAZY)
    @JoinColumn(
            name = "term_id",
            referencedColumnName = "id",
            foreignKey = @ForeignKey(name = "fk_practice_to_origin_term")
    )
    private Term term;

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
