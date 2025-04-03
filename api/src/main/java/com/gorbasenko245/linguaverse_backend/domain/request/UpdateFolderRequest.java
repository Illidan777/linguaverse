package com.gorbasenko245.linguaverse_backend.domain.request;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * Request DTO for updating a folder.
 * <p>
 * This class extends {@link CreateFolderRequest} and inherits the folder name property. It is used to carry the data necessary
 * for updating an existing folder.
 * </p>
 */
@Data
@EqualsAndHashCode(callSuper=false)
public class UpdateFolderRequest extends CreateFolderRequest {
    // The UpdateFolderRequest class inherits the folderName property from CreateFolderRequest,
    // so no additional fields are needed unless you plan to add more properties for updating.
}
