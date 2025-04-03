package com.gorbasenko245.linguaverse_backend.mapper;

import com.gorbasenko245.linguaverse_backend.domain.dto.term.TermDto;
import com.gorbasenko245.linguaverse_backend.domain.entity.term.Term;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service class responsible for mapping Term entities to DTOs and vice versa.
 */
@Service
public class TermMapper {

    /**
     * Updates a {@link Term} entity with values from a {@link TermDto}.
     *
     * @param target The existing Term entity to update.
     * @param dto    The TermDto containing updated values.
     * @return The updated {@link Term} entity, or {@code null} if either parameter is {@code null}.
     */
    public Term toTerm(final Term target, final TermDto dto) {
        if (target == null || dto == null) return null;

        target.setOrderNumber(dto.getOrderNumber());
        target.setTerm(dto.getTerm());
        target.setDefinition(dto.getDefinition());
        return target;
    }

    /**
     * Converts a {@link Term} entity to a {@link TermDto}.
     *
     * @param entity The Term entity to convert.
     * @return The corresponding {@link TermDto}, or {@code null} if the entity is {@code null}.
     */
    public TermDto toTermDto(final Term entity) {
        if (entity == null) return null;

        final TermDto dto = new TermDto();
        dto.setId(entity.getId());
        dto.setOrderNumber(entity.getOrderNumber());
        dto.setTerm(entity.getTerm());
        dto.setDefinition(entity.getDefinition());
        return dto;
    }

    /**
     * Converts a list of {@link Term} entities to a list of {@link TermDto}.
     *
     * @param entityList The list of Term entities to convert.
     * @return A list of corresponding {@link TermDto} objects, or an empty list if {@code entityList} is null.
     */
    public List<TermDto> toTermDtoList(final List<Term> entityList) {
        if (entityList == null) return Collections.emptyList();

        return entityList.stream()
                .map(this::toTermDto)
                .collect(Collectors.toList());
    }
}
