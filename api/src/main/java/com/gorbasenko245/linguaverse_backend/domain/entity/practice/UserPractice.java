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

@Entity(name = "UserPractice")
@Table(name = "user_practice")
@Data
@EqualsAndHashCode(callSuper = true)
public class UserPractice extends AuditableEntity {

    @Basic
    @Column(name = "current_term_number", columnDefinition = "bigint default 1", nullable = false)
    private Long currentTermNumber;

    @Basic
    @Column(name = "follow_progress", columnDefinition = "boolean default false", nullable = false)
    private Boolean followProgress;

    @Basic
    @Column(name = "suffle_mode", columnDefinition = "boolean default false", nullable = false)
    private Boolean shuffleMode;

    @Basic
    @Column(name = "practice_type")
    @Enumerated(value = EnumType.STRING)
    private PracticeType practiceType;

    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @ManyToOne(targetEntity = Module.class, fetch = FetchType.LAZY)
    @JoinColumn(
            name = "module_id",
            referencedColumnName = "id",
            foreignKey = @ForeignKey(name = "fk_practice_to_module")
    )
    private Module module;

    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @OneToMany(mappedBy = "userPractice", cascade = CascadeType.ALL, fetch = FetchType.LAZY, targetEntity = UserTermProgress.class)
    private List<UserTermProgress> terms = new ArrayList<>();
}
