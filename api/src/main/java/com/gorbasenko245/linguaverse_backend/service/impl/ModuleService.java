package com.gorbasenko245.linguaverse_backend.service.impl;

import com.gorbasenko245.linguaverse_backend.domain.dto.module.BaseModuleDto;
import com.gorbasenko245.linguaverse_backend.domain.dto.module.ModuleDto;
import com.gorbasenko245.linguaverse_backend.domain.dto.term.TermDto;
import com.gorbasenko245.linguaverse_backend.domain.entity.module.Module;
import com.gorbasenko245.linguaverse_backend.domain.enums.ModuleStatus;
import com.gorbasenko245.linguaverse_backend.domain.exception.common.ResourceNotFoundException;
import com.gorbasenko245.linguaverse_backend.domain.exception.common.ValidationException;
import com.gorbasenko245.linguaverse_backend.domain.request.UpdateModuleRequest;
import com.gorbasenko245.linguaverse_backend.mapper.ModuleMapper;
import com.gorbasenko245.linguaverse_backend.repository.ModuleRepository;
import com.gorbasenko245.linguaverse_backend.service.IModuleService;
import com.gorbasenko245.linguaverse_backend.service.IPracticeService;
import com.gorbasenko245.linguaverse_backend.service.ITermService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ModuleService implements IModuleService {

    private final ModuleRepository moduleRepository;
    private final ModuleMapper moduleMapper;
    private final ITermService termService;
    private final IPracticeService practiceService;

    @Transactional
    @Override
    public BaseModuleDto createModule() {
        final Module newModule = new Module();
        newModule.setName("New Module");
        newModule.setDescription("New Module Description");
        newModule.setStatus(ModuleStatus.DRAFT);
        final Module savedModule = moduleRepository.save(newModule);

        termService.createTerm(1L, savedModule);
        termService.createTerm(2L, savedModule);
        practiceService.createUserPractice(savedModule);

        return moduleMapper.toBaseModuleDto(savedModule);
    }

    @Override
    public List<BaseModuleDto> getAllModules(final String name) {
        return moduleRepository.findAll(name).stream()
                .map(moduleMapper::toBaseModuleDto)
                .collect(Collectors.toList());
    }

    @Override
    public ModuleDto getModuleById(final Long id) {
        return moduleMapper.toModuleDto(this.getById(id));
    }

    @Transactional
    @Override
    public void deleteById(final Long id) {
        if (Objects.isNull(id)) {
            throw new ValidationException("Id cannot be null");
        }
        final Module module = this.getById(id);
        moduleRepository.deleteFolderLinks(id);

        moduleRepository.deleteById(id);
    }

    @Transactional
    @Override
    public ModuleDto updateModule(final Long id, final UpdateModuleRequest request) {
        final Module module = this.getById(id);
        module.setName(request.getName());
        module.setDescription(request.getDescription());
        return moduleMapper.toModuleDto(moduleRepository.save(module));
    }

    @Override
    public BaseModuleDto activateModule(final Long id) {
        final Module module = this.getById(id);
        module.setStatus(ModuleStatus.ACTIVE);
        return moduleMapper.toBaseModuleDto(moduleRepository.save(module));
    }

    @Override
    public TermDto createTermInModule(final Long id, final Long orderNumber) {
        final Module module = this.getById(id);
        return termService.createTerm(orderNumber, module);
    }

    @Override
    public TermDto updateTermInModule(final Long id, final Long termId, final TermDto request) {
        return termService.updateTerm(id, termId, request);
    }

    @Override
    public void deleteTermInModule(Long id, Long termId) {
        termService.deleteTerm(id, termId);
    }

    @Override
    public void shuffleTermsInModule(Long id) {
        termService.shuffleByModuleId(id);
    }

    @Override
    public List<TermDto> getModuleTerms(final Long id) {
        return termService.getTermsByModuleId(id);
    }

    @Override
    public Module getById(final Long id) {
        if (Objects.isNull(id)) {
            throw new ValidationException("Id cannot be null");
        }
        return moduleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(String.format("Module does not exist by id: %d", id), "This module does not exist!"));
    }
}
