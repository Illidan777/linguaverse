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

@Entity(name = "Term")
@Table(name = "terms")
@Data
@EqualsAndHashCode(callSuper = true)
public class Term extends PersistenceObject {

    @Basic
    @Column(name = "order_number")
    private Long orderNumber;

    @Basic
    @Column(name = "term")
    private String term;

    @Basic
    @Column(name = "definition")
    private String definition;

    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @ManyToOne(targetEntity = Module.class, fetch = FetchType.LAZY)
    @JoinColumn(
            name = "module_id",
            referencedColumnName = "id",
            foreignKey = @ForeignKey(name = "fk_term_to_module")
    )
    private Module module;

    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @OneToMany(mappedBy = "originTerm", cascade = CascadeType.ALL, fetch = FetchType.LAZY, targetEntity = UserTermProgress.class, orphanRemoval = true)
    private List<UserTermProgress> progressList = new ArrayList<>();
}
