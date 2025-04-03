package com.gorbasenko245.linguaverse_backend.mapper;

import com.gorbasenko245.linguaverse_backend.domain.dto.IdNameDto;
import com.gorbasenko245.linguaverse_backend.domain.dto.module.BaseModuleDto;
import com.gorbasenko245.linguaverse_backend.domain.dto.module.ModuleDto;
import com.gorbasenko245.linguaverse_backend.domain.entity.module.Module;
import com.gorbasenko245.linguaverse_backend.utils.DateUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service class responsible for mapping Module entities to DTOs.
 */
@Service
@RequiredArgsConstructor
public class ModuleMapper {

    /**
     * Mapper for converting Term entities to DTOs.
     */
    private final TermMapper termMapper;

    /**
     * Converts a {@link Module} entity to a {@link ModuleDto}.
     *
     * @param entity The Module entity to convert.
     * @return The corresponding {@link ModuleDto}, or {@code null} if the entity is {@code null}.
     */
    public ModuleDto toModuleDto(final Module entity) {
        if(entity == null) return null;

        final ModuleDto dto = new ModuleDto();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setStatus(entity.getStatus());
        dto.setDescription(entity.getDescription());
        dto.setTermsCount(entity.getTerms().size());
        dto.setTerms(termMapper.toTermDtoList(entity.getTerms()));
        dto.setCreatedAt(DateUtils.convertLocalDateTimeToString(entity.getCreatedAt(),
                DateTimeFormatter.ofPattern(DateUtils.DATE_TIME_HOUR_MINUTE_SECOND_FORMAT)));
        dto.setFolders(entity.getFolders().stream()
                .map(folder -> new IdNameDto(folder.getId(), folder.getName()))
                .collect(Collectors.toList()));
        return dto;
    }

    /**
     * Converts a {@link Module} entity to a {@link BaseModuleDto}.
     *
     * @param entity The Module entity to convert.
     * @return The corresponding {@link BaseModuleDto}, or {@code null} if the entity is {@code null}.
     */
    public BaseModuleDto toBaseModuleDto(final Module entity) {
        if(entity == null) return null;

        final BaseModuleDto dto = new BaseModuleDto();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setStatus(entity.getStatus());
        dto.setTermsCount(entity.getTerms().size());
        dto.setCreatedAt(DateUtils.convertLocalDateTimeToString(entity.getCreatedAt(),
                DateTimeFormatter.ofPattern(DateUtils.DATE_TIME_HOUR_MINUTE_SECOND_FORMAT)));
        dto.setFolders(entity.getFolders().stream()
                .map(folder -> new IdNameDto(folder.getId(), folder.getName()))
                .collect(Collectors.toList()));
        return dto;
    }

    /**
     * Converts a list of {@link Module} entities to a list of {@link BaseModuleDto}.
     *
     * @param entityList The list of Module entities to convert.
     * @return A list of corresponding {@link BaseModuleDto} objects, or an empty list if {@code entityList} is null.
     */
    public List<BaseModuleDto> toBaseModuleDtoList(final List<Module> entityList) {
        if(entityList == null) return Collections.emptyList();

        return entityList.stream()
                .map(this::toBaseModuleDto)
                .collect(Collectors.toList());
    }
}
