package com.gorbasenko245.linguaverse_backend.domain.entity.term;

import com.gorbasenko245.linguaverse_backend.domain.entity.PersistenceObject;
import com.gorbasenko245.linguaverse_backend.domain.entity.module.Module;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

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
}
