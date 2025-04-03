package com.gorbasenko245.linguaverse_backend.domain.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

/**
 * Base class for auditable entities.
 * <p>
 * This class extends {@link PersistenceObject} and adds fields for tracking
 * the creation and update timestamps of an entity. It is typically used for
 * entities where tracking of creation and modification times is required.
 * The class is annotated with {@link MappedSuperclass} so that it can be inherited
 * by other entities that require audit fields.
 * </p>
 *
 * @see PersistenceObject
 * @see jakarta.persistence.EntityListeners
 * @see org.hibernate.annotations.CreationTimestamp
 */
@Data
@EqualsAndHashCode(callSuper = false)
@EntityListeners(AuditingEntityListener.class)
@MappedSuperclass
public class AuditableEntity extends PersistenceObject{

    /**
     * The timestamp when the entity was created.
     * <p>
     * This field is automatically populated when the entity is first persisted.
     * The value is set by the persistence provider when the entity is created.
     * </p>
     *
     * @see org.hibernate.annotations.CreationTimestamp
     */
    @CreationTimestamp
    @Basic
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    /**
     * The timestamp when the entity was last updated.
     * <p>
     * This field is automatically updated whenever the entity is updated in the database.
     * The value is set by the persistence provider each time the entity is modified.
     * </p>
     *
     * @see org.hibernate.annotations.CreationTimestamp
     */
    @CreationTimestamp
    @Basic
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
