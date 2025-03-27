package com.gorbasenko245.linguaverse_backend.mapper;

import com.gorbasenko245.linguaverse_backend.domain.dto.term.TermDto;
import com.gorbasenko245.linguaverse_backend.domain.entity.term.Term;
import org.hibernate.mapping.Collection;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TermMapper {

    public Term toTerm(final Term target, final TermDto dto) {
        if(target == null || dto == null) return null;

        target.setOrderNumber(dto.getOrderNumber());
        target.setTerm(dto.getTerm());
        target.setDefinition(dto.getDefinition());
        return target;
    }

    public TermDto toTermDto(final Term entity) {
        if(entity == null) return null;

        final TermDto dto = new TermDto();
        dto.setId(entity.getId());
        dto.setOrderNumber(entity.getOrderNumber());
        dto.setTerm(entity.getTerm());
        dto.setDefinition(entity.getDefinition());
        return dto;
    }

    public List<TermDto> toTermDtoList(final List<Term> entityList) {
        if(entityList == null) return Collections.emptyList();

        return entityList.stream()
                .map(this::toTermDto)
                .collect(Collectors.toList());
    }
}
