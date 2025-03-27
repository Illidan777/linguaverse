package com.gorbasenko245.linguaverse_backend.mapper;

import com.gorbasenko245.linguaverse_backend.domain.dto.folder.BaseFolderDto;
import com.gorbasenko245.linguaverse_backend.domain.dto.folder.FolderDto;
import com.gorbasenko245.linguaverse_backend.domain.entity.folder.Folder;
import com.gorbasenko245.linguaverse_backend.utils.DateUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;

@Service
@RequiredArgsConstructor
public class FolderMapper {

    private final ModuleMapper moduleMapper;

    public FolderDto toFolderDto(final Folder entity) {
        if(entity == null) return null;

        final FolderDto dto = new FolderDto();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setModulesCount(entity.getModules().size());
        dto.setUpdatedAt(DateUtils.convertLocalDateTimeToString(entity.getUpdatedAt(),
                DateTimeFormatter.ofPattern(DateUtils.DATE_TIME_HOUR_MINUTE_SECOND_FORMAT)));
        dto.setModules(moduleMapper.toBaseModuleDtoList(entity.getModules()));
        return dto;
    }

    public BaseFolderDto toBaseFolderDto(final Folder entity) {
        if(entity == null) return null;

        final BaseFolderDto dto = new BaseFolderDto();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setModulesCount(entity.getModules().size());
        dto.setUpdatedAt(DateUtils.convertLocalDateTimeToString(entity.getUpdatedAt(),
                DateTimeFormatter.ofPattern(DateUtils.DATE_TIME_HOUR_MINUTE_SECOND_FORMAT)));
        return dto;
    }
}
