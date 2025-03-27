package com.gorbasenko245.linguaverse_backend.service;

import com.gorbasenko245.linguaverse_backend.domain.dto.folder.BaseFolderDto;
import com.gorbasenko245.linguaverse_backend.domain.dto.folder.FolderDto;
import com.gorbasenko245.linguaverse_backend.domain.request.CreateFolderRequest;
import com.gorbasenko245.linguaverse_backend.domain.request.UpdateFolderRequest;

import java.util.List;

public interface IFolderService {

    BaseFolderDto createFolder(CreateFolderRequest request);

    List<BaseFolderDto> getAllFolders(String name);

    FolderDto getFolderById(Long id);

    void deleteById(Long id);

    BaseFolderDto updateFolder(Long id, UpdateFolderRequest request);

    void addModuleToFolder(Long id, Long moduleId);

    void deleteModuleFromFolder(Long id, Long moduleId);
}
