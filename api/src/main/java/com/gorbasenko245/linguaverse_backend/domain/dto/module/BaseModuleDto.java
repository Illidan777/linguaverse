package com.gorbasenko245.linguaverse_backend.domain.dto.module;

import com.gorbasenko245.linguaverse_backend.domain.dto.IdNameDto;
import com.gorbasenko245.linguaverse_backend.domain.enums.ModuleStatus;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.ArrayList;
import java.util.List;

/**
 * Data Transfer Object (DTO) that represents a base module.
 * <p>
 * This class is used to transfer data related to a module, including its name, description, status,
 * terms count, creation date, and associated folders. It also tracks whether the user is following progress
 * in the module.
 * </p>
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class BaseModuleDto extends IdNameDto {

    /**
     * The number of terms associated with the module.
     * <p>
     * This field holds the total count of terms included in the module. It is used to represent the
     * size of the module in terms of content.
     * </p>
     */
    private Integer termsCount;

    /**
     * A brief description of the module.
     * <p>
     * This field provides additional details about the module's content and purpose.
     * </p>
     */
    private String description;

    /**
     * The date and time when the module was created.
     * <p>
     * This field stores the creation date of the module in string format, typically following the ISO
     * 8601 date-time standard.
     * </p>
     */
    private String createdAt;

    /**
     * The current status of the module.
     * <p>
     * This field represents the module's status, which is one of the predefined values of the {@link ModuleStatus} enum.
     * </p>
     */
    private ModuleStatus status;

    /**
     * Indicates whether the user is following their progress in this module.
     * <p>
     * If {@code true}, the user is actively following progress in the module; otherwise, they are not.
     * </p>
     */
    private Boolean followProgress;

    /**
     * A list of folders that the module is associated with.
     * <p>
     * This field contains a list of {@link IdNameDto} objects, each representing a folder associated with the module.
     * </p>
     */
    private List<IdNameDto> folders = new ArrayList<>();
}
