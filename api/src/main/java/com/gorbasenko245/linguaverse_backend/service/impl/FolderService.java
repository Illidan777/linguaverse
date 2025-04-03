package com.gorbasenko245.linguaverse_backend.service.impl;

import com.gorbasenko245.linguaverse_backend.domain.dto.folder.BaseFolderDto;
import com.gorbasenko245.linguaverse_backend.domain.dto.folder.FolderDto;
import com.gorbasenko245.linguaverse_backend.domain.entity.folder.Folder;
import com.gorbasenko245.linguaverse_backend.domain.entity.module.Module;
import com.gorbasenko245.linguaverse_backend.domain.exception.common.ResourceNotFoundException;
import com.gorbasenko245.linguaverse_backend.domain.exception.common.ValidationException;
import com.gorbasenko245.linguaverse_backend.domain.request.CreateFolderRequest;
import com.gorbasenko245.linguaverse_backend.domain.request.UpdateFolderRequest;
import com.gorbasenko245.linguaverse_backend.mapper.FolderMapper;
import com.gorbasenko245.linguaverse_backend.repository.FolderRepository;
import com.gorbasenko245.linguaverse_backend.service.IFolderService;
import com.gorbasenko245.linguaverse_backend.service.IModuleService;
import com.gorbasenko245.linguaverse_backend.utils.ValidationUtils;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

/**
 * Service class for managing Folder entities.
 * Provides business logic for creating, updating, deleting, and retrieving folders,
 * as well as adding and removing modules to/from folders.
 */
@RequiredArgsConstructor
@Service
public class FolderService implements IFolderService {

    // Repository for accessing Folder entities in the database
    private final FolderRepository folderRepository;

    // Mapper for converting Folder entities to their corresponding DTOs
    private final FolderMapper folderMapper;

    // Service for managing modules
    private final IModuleService moduleService;

    /**
     * Creates a new folder based on the provided request.
     *
     * @param request the request containing details for the new folder
     * @return the BaseFolderDto containing information about the newly created folder
     */
    @Override
    public BaseFolderDto createFolder(final CreateFolderRequest request) {
        this.validate(request);

        final Folder newFolder = new Folder();
        newFolder.setName(request.getFolderName());
        return folderMapper.toBaseFolderDto(folderRepository.save(newFolder));
    }

    /**
     * Retrieves all folders, optionally filtered by name, and returns them as a list of BaseFolderDto.
     *
     * @param name the name of the folder to search for (optional)
     * @return a list of BaseFolderDto for the retrieved folders
     */
    @SneakyThrows
    @Override
    public List<BaseFolderDto> getAllFolders(final String name) {
        return folderRepository.findAll(name).stream()
                .map(folderMapper::toBaseFolderDto)
                .collect(Collectors.toList());
    }

    /**
     * Retrieves a folder by its ID and returns it as a FolderDto.
     *
     * @param id the ID of the folder to retrieve
     * @return the FolderDto representing the folder
     */
    @Override
    public FolderDto getFolderById(final Long id) {
        return folderMapper.toFolderDto(this.getById(id));
    }

    /**
     * Deletes a folder by its ID and removes associated module links.
     *
     * @param id the ID of the folder to delete
     */
    @Transactional
    @Override
    public void deleteById(final Long id) {
        if (Objects.isNull(id)) {
            throw new ValidationException("Id cannot be null");
        }
        folderRepository.deleteModuleLinks(id);
        folderRepository.deleteById(id);
    }

    /**
     * Updates an existing folder based on the provided ID and request.
     *
     * @param id the ID of the folder to update
     * @param request the request containing updated folder details
     * @return the updated BaseFolderDto
     */
    @Override
    public BaseFolderDto updateFolder(final Long id, final UpdateFolderRequest request) {
        if (Objects.isNull(id)) {
            throw new ValidationException("Id cannot be null");
        }
        this.validate(request);
        final Folder folder = this.getById(id);
        folder.setName(request.getFolderName());
        return folderMapper.toBaseFolderDto(folderRepository.save(folder));
    }

    /**
     * Adds a module to a folder by their respective IDs.
     *
     * @param id the ID of the folder
     * @param moduleId the ID of the module to add
     */
    @Override
    public void addModuleToFolder(final Long id, final Long moduleId) {
        final Folder folder = this.getById(id);
        final Module module = moduleService.getById(moduleId);

        // Check if the module is not already linked to the folder
        if (folder.getModules().stream().noneMatch(m -> m.getId().equals(moduleId))) {
            folder.getModules().add(module);
            folderRepository.save(folder);
        }
    }

    /**
     * Removes a module from a folder by their respective IDs.
     *
     * @param id the ID of the folder
     * @param moduleId the ID of the module to remove
     */
    @Override
    public void deleteModuleFromFolder(final Long id, final Long moduleId) {
        final Folder folder = this.getById(id);
        folder.getModules().removeIf(module -> module.getId().equals(moduleId));
        folderRepository.save(folder);
    }

    /**
     * Validates a folder creation request.
     *
     * @param request the request to validate
     */
    private void validate(final CreateFolderRequest request) {
        ValidationUtils.validate(request);
        final String name = request.getFolderName();
        if (Objects.isNull(name) || name.trim().isEmpty()) {
            throw new ValidationException("Folder name cannot be null or empty", "Invalid folder name");
        }
    }

    /**
     * Retrieves a folder by its ID, throwing an exception if not found.
     *
     * @param id the ID of the folder to retrieve
     * @return the Folder entity
     */
    private Folder getById(final Long id) {
        if (Objects.isNull(id)) {
            throw new ValidationException("Id cannot be null");
        }
        return folderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(String.format("Folder does not exist by id: %d", id), "This folder does not exist!"));
    }
}
