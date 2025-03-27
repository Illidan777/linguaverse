package com.gorbasenko245.linguaverse_backend.service;

import com.gorbasenko245.linguaverse_backend.domain.dto.term.TermDto;
import com.gorbasenko245.linguaverse_backend.domain.entity.module.Module;
import com.gorbasenko245.linguaverse_backend.domain.entity.term.Term;

import java.util.List;

public interface ITermService {

    List<TermDto> getTermsByModuleId(Long moduleId);

    TermDto createTerm(Long orderNumber, Module module);

    TermDto updateTerm(Long moduleId, Long termId, TermDto termDto);

    void deleteTerm(Long moduleId, Long termId);

    void shuffleByModuleId(Long moduleId);

    Term getById(Long termId);
}
