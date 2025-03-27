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

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/folder")
@RestController
public class FolderController {

    private final IFolderService folderService;

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

    @DeleteMapping("/{id}")
    public ApiResponse<Void> deleteFolderById(@PathVariable("id") Long id) {
        log.info("[FolderController] Deleting folder by id. {}", id);
        folderService.deleteById(id);
        log.info("[FolderController] Folder by id has been deleted. Id: {}", id);
        return new ApiResponse<Void>()
                .status(ApiResponse.ApiStatus.OK)
                .message("Ok");
    }

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

    @PatchMapping("/{id}/add-module/{moduleId}")
    public ApiResponse<Void> addModuleToFolder(@PathVariable("id") Long id, @PathVariable("moduleId") Long moduleId) {
        log.info("[FolderController] Adding module to folder by id. Folder id: {}. Module id: {}", id, moduleId);
        folderService.addModuleToFolder(id, moduleId);
        log.info("[FolderController] Module by id {} has been added to folder {}.", moduleId, id);
        return new ApiResponse<Void>()
                .status(ApiResponse.ApiStatus.OK)
                .message("OK");
    }

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
