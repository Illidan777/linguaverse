package com.gorbasenko245.linguaverse_backend.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

/**
 * Data Transfer Object (DTO) that represents an entity with an {@code id}.
 * <p>
 * This class is used to encapsulate the {@code id} of an entity. It provides a simple structure
 * for transferring the identifier across layers or between systems. It includes Lombok annotations
 * to automatically generate the getter, setter, equals, hashCode, and toString methods.
 * </p>
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class IdDto {

    /**
     * The identifier of the entity.
     * <p>
     * This field holds the {@code id} value for the entity represented by this DTO.
     * It is typically used when only the identifier of an entity needs to be transferred.
     * </p>
     */
    private Long id;
}
