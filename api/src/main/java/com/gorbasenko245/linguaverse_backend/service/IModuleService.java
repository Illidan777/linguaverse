package com.gorbasenko245.linguaverse_backend.service;

import com.gorbasenko245.linguaverse_backend.domain.dto.module.BaseModuleDto;
import com.gorbasenko245.linguaverse_backend.domain.dto.module.ModuleDto;
import com.gorbasenko245.linguaverse_backend.domain.dto.term.TermDto;
import com.gorbasenko245.linguaverse_backend.domain.entity.module.Module;
import com.gorbasenko245.linguaverse_backend.domain.request.UpdateModuleRequest;

import java.util.List;

public interface IModuleService {

    BaseModuleDto createModule();

    List<BaseModuleDto> getAllModules(String name);

    ModuleDto getModuleById(Long id);

    void deleteById(Long id);

    ModuleDto updateModule(Long id, UpdateModuleRequest request);

    BaseModuleDto activateModule(Long id);

    TermDto createTermInModule(Long id, Long orderNumber);

    TermDto updateTermInModule(Long id, Long termId, TermDto request);

    void deleteTermInModule(Long id, Long termId);

    void shuffleTermsInModule(Long id);

    List<TermDto> getModuleTerms(Long id);

    Module getById(Long id);
}
