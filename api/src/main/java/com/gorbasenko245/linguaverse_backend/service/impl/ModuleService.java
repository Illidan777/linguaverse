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

/**
 * Service class for managing Module entities.
 * Provides business logic for creating, updating, deleting, and retrieving modules,
 * as well as handling the associated terms and practices.
 */
@RequiredArgsConstructor
@Service
public class ModuleService implements IModuleService {

    // Repository for accessing Module entities in the database
    private final ModuleRepository moduleRepository;

    // Mapper for converting Module entities to their corresponding DTOs
    private final ModuleMapper moduleMapper;

    // Service for managing terms related to modules
    private final ITermService termService;

    // Service for managing user practices related to modules
    private final IPracticeService practiceService;

    /**
     * Creates a new module with default values and associates terms and a user practice.
     *
     * @return the BaseModuleDto containing information about the newly created module
     */
    @Transactional
    @Override
    public BaseModuleDto createModule() {
        final Module newModule = new Module();
        newModule.setName("New Module");  // Set default name
        newModule.setDescription("New Module Description"); // Set default description
        newModule.setStatus(ModuleStatus.DRAFT);  // Set default status as DRAFT
        final Module savedModule = moduleRepository.save(newModule);

        // Create default terms and a user practice associated with the new module
        termService.createTerm(1L, savedModule);
        termService.createTerm(2L, savedModule);
        practiceService.createUserPractice(savedModule);

        return moduleMapper.toBaseModuleDto(savedModule);
    }

    /**
     * Retrieves all modules, optionally filtered by name, and returns them as a list of BaseModuleDto.
     *
     * @param name the name of the module to search for (optional)
     * @return a list of BaseModuleDto for the retrieved modules
     */
    @Override
    public List<BaseModuleDto> getAllModules(final String name) {
        return moduleRepository.findAll(name).stream()
                .map(moduleMapper::toBaseModuleDto)
                .collect(Collectors.toList());
    }

    /**
     * Retrieves a module by its ID and returns it as a ModuleDto.
     *
     * @param id the ID of the module to retrieve
     * @return the ModuleDto representing the module
     */
    @Override
    public ModuleDto getModuleById(final Long id) {
        return moduleMapper.toModuleDto(this.getById(id));
    }

    /**
     * Deletes a module by its ID and removes associated folder links.
     *
     * @param id the ID of the module to delete
     */
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

    /**
     * Updates an existing module based on the provided ID and request.
     *
     * @param id the ID of the module to update
     * @param request the request containing updated module details
     * @return the updated ModuleDto
     */
    @Override
    public ModuleDto updateModule(final Long id, final UpdateModuleRequest request) {
        final Module module = this.getById(id);
        module.setName(request.getName());
        module.setDescription(request.getDescription());
        return moduleMapper.toModuleDto(moduleRepository.save(module));
    }

    /**
     * Activates a module by setting its status to ACTIVE.
     * In ACTIVE status module can be accessed to practice on client side.
     *
     * @param id the ID of the module to activate
     * @return the BaseModuleDto for the activated module
     */
    @Override
    public BaseModuleDto activateModule(final Long id) {
        final Module module = this.getById(id);
        module.setStatus(ModuleStatus.ACTIVE);
        return moduleMapper.toBaseModuleDto(moduleRepository.save(module));
    }

    /**
     * Creates a new term within the specified module.
     *
     * @param id the ID of the module in which to create the term
     * @param orderNumber the order number for the new term
     * @return the TermDto for the created term
     */
    @Override
    public TermDto createTermInModule(final Long id, final Long orderNumber) {
        final Module module = this.getById(id);
        return termService.createTerm(orderNumber, module);
    }

    /**
     * Updates an existing term within the specified module.
     *
     * @param id the ID of the module containing the term
     * @param termId the ID of the term to update
     * @param request the TermDto containing updated term details
     * @return the updated TermDto
     */
    @Override
    public TermDto updateTermInModule(final Long id, final Long termId, final TermDto request) {
        return termService.updateTerm(id, termId, request); // Delegate to term service for updating the term
    }

    /**
     * Deletes a term within the specified module.
     *
     * @param id the ID of the module containing the term
     * @param termId the ID of the term to delete
     */
    @Override
    public void deleteTermInModule(final Long id, final Long termId) {
        termService.deleteTerm(id, termId); // Delegate to term service for deleting the term
    }

    /**
     * Shuffles the terms within the specified module.
     *
     * @param id the ID of the module whose terms to shuffle
     */
    @Override
    public void shuffleTermsInModule(final Long id) {
        termService.shuffleByModuleId(id);  // Delegate to term service for shuffling terms
    }

    /**
     * Retrieves all terms associated with a specified module.
     *
     * @param id the ID of the module
     * @return a list of TermDto for the terms in the module
     */
    @Override
    public List<TermDto> getModuleTerms(final Long id) {
        return termService.getTermsByModuleId(id); // Delegate to term service for retrieving module terms
    }

    /**
     * Retrieves a module by its ID, throwing an exception if not found.
     *
     * @param id the ID of the module to retrieve
     * @return the Module entity
     */
    @Override
    public Module getById(final Long id) {
        if (Objects.isNull(id)) {
            throw new ValidationException("Id cannot be null");
        }
        return moduleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(String.format("Module does not exist by id: %d", id), "This module does not exist!"));
    }
}
