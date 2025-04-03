package com.gorbasenko245.linguaverse_backend.domain.request;

import lombok.Data;

/**
 * Request DTO for updating a module.
 * <p>
 * This class is used to carry the data necessary for updating an existing module. It includes fields for the module's name
 * and description.
 * </p>
 */
@Data
public class UpdateModuleRequest {

    /**
     * The name of the module to be updated.
     * <p>
     * This field specifies the new name for the module. If the name needs to be updated, this field should be provided.
     * </p>
     */
    private String name;

    /**
     * The description of the module to be updated.
     * <p>
     * This field specifies the new description for the module. If the description needs to be updated, this field should be provided.
     * </p>
     */
    private String description;
}
