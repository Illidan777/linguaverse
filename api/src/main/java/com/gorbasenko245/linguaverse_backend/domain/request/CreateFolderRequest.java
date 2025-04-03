package com.gorbasenko245.linguaverse_backend.domain.request;

import lombok.Data;

/**
 * Request DTO for creating a folder.
 * <p>
 * This class is used to carry the data necessary for creating a new folder. It includes a single property for the folder's name.
 * </p>
 */
@Data
public class CreateFolderRequest {

    /**
     * The name of the folder to be created.
     * <p>
     * This field is used to specify the name for the new folder. It is required to provide a folder name when creating a folder.
     * </p>
     */
    private String folderName;
}
