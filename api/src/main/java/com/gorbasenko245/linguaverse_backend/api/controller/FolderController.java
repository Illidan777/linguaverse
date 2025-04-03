package com.gorbasenko245.linguaverse_backend.api.controller;

import com.gorbasenko245.linguaverse_backend.domain.api.ApiResponse;
import com.gorbasenko245.linguaverse_backend.domain.dto.folder.BaseFolderDto;
import com.gorbasenko245.linguaverse_backend.domain.dto.folder.FolderDto;
import com.gorbasenko245.linguaverse_backend.domain.request.CreateFolderRequest;
import com.gorbasenko245.linguaverse_backend.domain.request.UpdateFolderRequest;
import com.gorbasenko245.linguaverse_backend.service.IFolderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller that manages folders.
 * <p>
 * This class provides endpoints to perform CRUD operations on folders, including creating, retrieving,
 * updating, and deleting folders. Additionally, it allows adding and removing modules from folders.
 * </p>
 */
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/folder")
@RestController
public class FolderController {

    // Main service
    private final IFolderService folderService;

    /**
     * Creates a new folder.
     *
     * @param request The request containing the details to create a folder.
     * @return A response containing the created folder's information.
     */
    @PostMapping
    public ApiResponse<BaseFolderDto> createFolder(@RequestBody CreateFolderRequest request) {
        log.info("[FolderController] Creating folder.");
        final BaseFolderDto result = folderService.createFolder(request);
        log.info("[FolderController] Folder has been created. Id: {}", result.getId());
        return new ApiResponse<BaseFolderDto>()
                .body(result)
                .status(ApiResponse.ApiStatus.OK)
                .message("OK");
    }

    /**
     * Retrieves all folders, optionally filtering by name.
     *
     * @param name Optional name parameter to filter folders by name.
     * @return A response containing a list of all folders.
     */
    @GetMapping
    public ApiResponse<List<BaseFolderDto>> getAllFolders(@RequestParam(required = false) String name) {
        log.info("[FolderController] Getting all folders. {}", name);
        final List<BaseFolderDto> result = folderService.getAllFolders(name);
        log.info("[FolderController] All folders have been received. Size: {}", result.size());
        return new ApiResponse<List<BaseFolderDto>>()
                .body(result)
                .status(ApiResponse.ApiStatus.OK)
                .message("OK");
    }

    /**
     * Retrieves a folder by its ID.
     *
     * @param id The ID of the folder to retrieve.
     * @return A response containing the folder's details.
     */
    @GetMapping("/{id}")
    public ApiResponse<FolderDto> getFolderById(@PathVariable("id") Long id) {
        log.info("[FolderController] Getting folder by id. {}", id);
        final FolderDto result = folderService.getFolderById(id);
        log.info("[FolderController] Folder by id has been received. Id: {}", result.getId());
        return new ApiResponse<FolderDto>()
                .body(result)
                .status(ApiResponse.ApiStatus.OK)
                .message("OK");
    }

    /**
     * Deletes a folder by its ID.
     *
     * @param id The ID of the folder to delete.
     * @return A response confirming the deletion.
     */
    @DeleteMapping("/{id}")
    public ApiResponse<Void> deleteFolderById(@PathVariable("id") Long id) {
        log.info("[FolderController] Deleting folder by id. {}", id);
        folderService.deleteById(id);
        log.info("[FolderController] Folder by id has been deleted. Id: {}", id);
        return new ApiResponse<Void>()
                .status(ApiResponse.ApiStatus.OK)
                .message("Ok");
    }

    /**
     * Updates an existing folder by its ID.
     *
     * @param id The ID of the folder to update.
     * @param request The request containing the updated folder details.
     * @return A response containing the updated folder's information.
     */
    @PutMapping("/{id}")
    public ApiResponse<BaseFolderDto> updateFolderById(@PathVariable("id") Long id, @RequestBody UpdateFolderRequest request) {
        log.info("[FolderController] Updating folder by id. {}", id);
        final BaseFolderDto result = folderService.updateFolder(id, request);
        log.info("[FolderController] Folder by id has been updated. Id: {}", id);
        return new ApiResponse<BaseFolderDto>()
                .body(result)
                .status(ApiResponse.ApiStatus.OK)
                .message("OK");
    }

    /**
     * Adds a module to a folder.
     *
     * @param id The ID of the folder to add the module to.
     * @param moduleId The ID of the module to add.
     * @return A response confirming the addition of the module.
     */
    @PatchMapping("/{id}/add-module/{moduleId}")
    public ApiResponse<Void> addModuleToFolder(@PathVariable("id") Long id, @PathVariable("moduleId") Long moduleId) {
        log.info("[FolderController] Adding module to folder by id. Folder id: {}. Module id: {}", id, moduleId);
        folderService.addModuleToFolder(id, moduleId);
        log.info("[FolderController] Module by id {} has been added to folder {}.", moduleId, id);
        return new ApiResponse<Void>()
                .status(ApiResponse.ApiStatus.OK)
                .message("OK");
    }

    /**
     * Deletes a module from a folder.
     *
     * @param id The ID of the folder to remove the module from.
     * @param moduleId The ID of the module to remove.
     * @return A response confirming the removal of the module.
     */
    @DeleteMapping("/{id}/delete-module/{moduleId}")
    public ApiResponse<Void> deleteModuleFromFolder(@PathVariable("id") Long id, @PathVariable("moduleId") Long moduleId) {
        log.info("[FolderController] Deleting module from folder by id. Folder id: {}. Module id: {}", id, moduleId);
        folderService.deleteModuleFromFolder(id, moduleId);
        log.info("[FolderController] Module by id {} has been deleted from folder {}.", moduleId, id);
        return new ApiResponse<Void>()
                .status(ApiResponse.ApiStatus.OK)
                .message("OK");
    }
}
