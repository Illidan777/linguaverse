package com.gorbasenko245.linguaverse_backend.domain.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

/**
 * Data Transfer Object (DTO) that represents an entity with both an {@code id} and a {@code name}.
 * <p>
 * This class extends {@link IdDto} and adds an additional field {@code name} to provide both
 * the identifier and the name of the entity. This DTO is useful when you need to transfer
 * the ID along with the name of an entity in the application.
 * </p>
 */
@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
public class IdNameDto extends IdDto {

    /**
     * The name of the entity.
     * <p>
     * This field holds the {@code name} value for the entity represented by this DTO.
     * It is typically used when transferring an entity's ID along with its name,
     * such as when displaying a list of entities with both their identifiers and names.
     * </p>
     */
    private String name;

    /**
     * Constructor to initialize the {@code IdNameDto} with an {@code id} and a {@code name}.
     *
     * @param id The identifier of the entity.
     * @param name The name of the entity.
     */
    public IdNameDto(Long id, String name) {
        super(id);
        this.name = name;
    }
}
