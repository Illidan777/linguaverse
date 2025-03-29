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

@RequiredArgsConstructor
@Service
public class FolderService implements IFolderService {

    private final FolderRepository folderRepository;
    private final FolderMapper folderMapper;
    private final IModuleService moduleService;

    @Override
    public BaseFolderDto createFolder(final CreateFolderRequest request) {
        this.validate(request);

        final Folder newFolder = new Folder();
        newFolder.setName(request.getFolderName());
        return folderMapper.toBaseFolderDto(folderRepository.save(newFolder));
    }

    @SneakyThrows
    @Override
    public List<BaseFolderDto> getAllFolders(final String name) {
        return folderRepository.findAll(name).stream()
                .map(folderMapper::toBaseFolderDto)
                .collect(Collectors.toList());
    }

    @Override
    public FolderDto getFolderById(final Long id) {
        return folderMapper.toFolderDto(this.getById(id));
    }

    @Transactional
    @Override
    public void deleteById(final Long id) {
        if (Objects.isNull(id)) {
            throw new ValidationException("Id cannot be null");
        }
        folderRepository.deleteModuleLinks(id);
        folderRepository.deleteById(id);
    }

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

    @Override
    public void addModuleToFolder(final Long id, final Long moduleId) {
        final Folder folder = this.getById(id);
        final Module module = moduleService.getById(moduleId);

        if (folder.getModules().stream().noneMatch(m -> m.getId().equals(moduleId))) {
            folder.getModules().add(module);
            folderRepository.save(folder);
        }
    }

    @Override
    public void deleteModuleFromFolder(final Long id, final Long moduleId) {
        final Folder folder = this.getById(id);
        folder.getModules().removeIf(module -> module.getId().equals(moduleId));
        folderRepository.save(folder);
    }

    private void validate(final CreateFolderRequest request) {
        ValidationUtils.validate(request);
        final String name = request.getFolderName();
        if (Objects.isNull(name) || name.trim().isEmpty()) {
            throw new ValidationException("Folder name cannot be null or empty", "Invalid folder name");
        }
    }

    private Folder getById(final Long id) {
        if (Objects.isNull(id)) {
            throw new ValidationException("Id cannot be null");
        }
        return folderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(String.format("Folder does not exist by id: %d", id), "This folder does not exist!"));
    }
}
