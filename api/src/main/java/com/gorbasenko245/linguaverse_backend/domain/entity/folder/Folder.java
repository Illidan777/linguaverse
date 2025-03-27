package com.gorbasenko245.linguaverse_backend.domain.entity.folder;

import com.gorbasenko245.linguaverse_backend.domain.entity.AuditableEntity;
import com.gorbasenko245.linguaverse_backend.domain.entity.module.Module;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Entity(name = "Folder")
@Table(name = "folders")
@Data
@EqualsAndHashCode(callSuper = true)
public class Folder extends AuditableEntity {

    @Basic
    @Column(name = "name")
    private String name;

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
