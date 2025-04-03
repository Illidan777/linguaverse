package com.gorbasenko245.linguaverse_backend.domain.dto.folder;

import com.gorbasenko245.linguaverse_backend.domain.dto.IdNameDto;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * Data Transfer Object (DTO) that represents a base folder.
 * <p>
 * This class is used to transfer data related to a folder, including its name, update timestamp, and
 * the count of associated modules. It extends {@link IdNameDto} to inherit the ID and name properties.
 * </p>
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class BaseFolderDto extends IdNameDto {

    /**
     * The date and time when the folder was last updated.
     * <p>
     * This field stores the timestamp of the last update to the folder, typically in string format,
     * following the ISO 8601 date-time standard.
     * </p>
     */
    private String updatedAt;

    /**
     * The number of modules associated with the folder.
     * <p>
     * This field holds the count of modules that are currently associated with the folder.
     * </p>
     */
    private Integer modulesCount;
}
