package com.gorbasenko245.linguaverse_backend.domain.entity.module;

import com.gorbasenko245.linguaverse_backend.domain.entity.AuditableEntity;
import com.gorbasenko245.linguaverse_backend.domain.entity.folder.Folder;
import com.gorbasenko245.linguaverse_backend.domain.entity.term.Term;
import com.gorbasenko245.linguaverse_backend.domain.enums.ModuleStatus;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Entity(name = "Module")
@Table(name = "modules")
@Data
@EqualsAndHashCode(callSuper = true)
public class Module extends AuditableEntity {

    @Basic
    @Column(name = "name")
    private String name;

    @Basic
    @Column(name = "description")
    private String description;

    @Basic
    @Column(name = "status")
    @Enumerated(value = EnumType.STRING)
    private ModuleStatus status;

    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @OrderBy("orderNumber ASC")
    @OneToMany(mappedBy = "module", cascade = CascadeType.ALL, fetch = FetchType.LAZY, targetEntity = Term.class)
    private List<Term> terms = new ArrayList<>();

    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @ManyToMany(mappedBy = "modules", cascade = CascadeType.DETACH, fetch = FetchType.LAZY, targetEntity = Folder.class)
    private List<Folder> folders = new ArrayList<>();
}
