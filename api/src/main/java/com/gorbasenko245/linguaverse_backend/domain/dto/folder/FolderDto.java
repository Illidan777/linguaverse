package com.gorbasenko245.linguaverse_backend.domain.dto.folder;

import com.gorbasenko245.linguaverse_backend.domain.dto.module.BaseModuleDto;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.ArrayList;
import java.util.List;

/**
 * Data Transfer Object (DTO) that represents a folder, extending from {@link BaseFolderDto}.
 * <p>
 * This class is used to transfer detailed information about a folder, including the list of modules
 * associated with the folder. It builds upon {@link BaseFolderDto} by adding the modules associated with
 * the folder, providing a more comprehensive representation of the folder's content.
 * </p>
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class FolderDto extends BaseFolderDto {

    /**
     * A list of modules associated with the folder.
     * <p>
     * This field contains a list of {@link BaseModuleDto} objects, each representing a module associated
     * with the folder. These modules include essential details such as their ID, name, and terms count.
     * </p>
     */
    public List<BaseModuleDto> modules = new ArrayList<>();
}
