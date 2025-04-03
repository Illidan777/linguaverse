package com.gorbasenko245.linguaverse_backend.domain.entity;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import lombok.Data;

/**
 * Base class for persistence entities.
 * <p>
 * This class serves as a base for all entities that require an {@link Id} field.
 * It is annotated with {@link MappedSuperclass} so that it can be inherited
 * by other entity classes, providing them with an {@link Id} field and default
 * behavior for persistence in the database.
 * </p>
 *
 * @see jakarta.persistence.MappedSuperclass
 * @see jakarta.persistence.Entity
 */
@Data
@MappedSuperclass
public class PersistenceObject {

    /**
     * The unique identifier for the entity.
     * <p>
     * This field is automatically generated and serves as the primary key for
     * any entity that extends {@link PersistenceObject}. The ID is assigned by
     * the database upon entity creation.
     * </p>
     *
     * @see jakarta.persistence.Id
     * @see jakarta.persistence.GeneratedValue
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
}
