package com.gorbasenko245.linguaverse_backend.service.impl;

import com.gorbasenko245.linguaverse_backend.domain.dto.practice.UserPracticeDto;
import com.gorbasenko245.linguaverse_backend.domain.entity.module.Module;
import com.gorbasenko245.linguaverse_backend.domain.entity.practice.UserPractice;
import com.gorbasenko245.linguaverse_backend.domain.entity.practice.UserTermProgress;
import com.gorbasenko245.linguaverse_backend.domain.enums.PracticeType;
import com.gorbasenko245.linguaverse_backend.domain.enums.TermStatus;
import com.gorbasenko245.linguaverse_backend.domain.exception.common.ResourceNotFoundException;
import com.gorbasenko245.linguaverse_backend.domain.exception.common.ValidationException;
import com.gorbasenko245.linguaverse_backend.mapper.UserPracticeMapper;
import com.gorbasenko245.linguaverse_backend.repository.UserPracticeRepository;
import com.gorbasenko245.linguaverse_backend.repository.UserTermProgressRepository;
import com.gorbasenko245.linguaverse_backend.service.IPracticeService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Objects;
import java.util.Optional;

/**
 * Service class for managing user practices related to specific modules.
 * Provides methods to create user practices, retrieve practice data,
 * update term statuses, toggle progress tracking, and reset practice.
 */
@Service
@RequiredArgsConstructor
public class PracticeService implements IPracticeService {

    // Repository for accessing UserPractice entities in the database
    private final UserPracticeRepository userPracticeRepository;

    // Repository for accessing UserTermProgress entities in the database
    private final UserTermProgressRepository userTermProgressRepository;

    // Mapper for converting UserPractice entities to their corresponding DTOs
    private final UserPracticeMapper userPracticeMapper;

    // Service for managing terms
    private final TermService termService;

    /**
     * Creates a new user practice record for a given module.
     * Initializes default practice settings and persists the new record.
     *
     * @param module The module for which to create the user practice.
     * @throws ValidationException If the module is null.
     */
    @Override
    public void createUserPractice(final Module module) {
        if (Objects.isNull(module)) {
            throw new ValidationException("Module is null");
        }
        final UserPractice userPractice = new UserPractice();
        userPractice.setModule(module);
        userPractice.setCreatedAt(LocalDateTime.now());
        userPractice.setUpdatedAt(LocalDateTime.now());
        userPractice.setPracticeType(PracticeType.FLASHCARDS);
        userPractice.setFollowProgress(false);
        userPractice.setShuffleMode(false);
        userPractice.setCurrentTermNumber(0L);
        userPracticeRepository.save(userPractice);
    }

    /**
     * Retrieves the user practice settings for a given module.
     *
     * @param moduleId The ID of the module for which to retrieve the practice settings.
     * @return The DTO representing the user practice settings.
     */
    @Override
    public UserPracticeDto getUserPracticeByModuleId(final Long moduleId) {
        return userPracticeMapper.toUserPracticeDto(this.getPracticeByModuleId(moduleId));
    }

    /**
     * Toggles the "follow progress" flag for the user practice.
     * If the flag is currently false, it will be set to true, and vice versa.
     *
     * @param id The ID of the user practice record to update.
     */
    @Transactional
    @Override
    public void toggleFollowProgress(final Long id) {
        final UserPractice module = this.getPracticeByModuleId(id);
        module.setFollowProgress(!module.getFollowProgress());
        userPracticeRepository.save(module);
    }

    /**
     * Updates the status of a specific term within a user's practice for a module.
     * Marks the term as "learned" or "in progress" and updates the current index.
     *
     * @param moduleId   The ID of the module for which to update the term status.
     * @param termId     The ID of the term whose status is being updated.
     * @param learned    A boolean indicating whether the term has been learned.
     * @param currentIndex The current index of the term in the user's practice.
     */
    @Transactional
    @Override
    public void updateTermStatus(final Long moduleId, final Long termId, final Boolean learned, final Long currentIndex) {
        final UserPractice practice = this.getPracticeByModuleId(moduleId);
        final Optional<UserTermProgress> optionalTerm = userTermProgressRepository.findByTerm_IdAndUserPractice_Id(termId, practice.getId());

        final UserTermProgress userTermProgress;
        if (optionalTerm.isPresent()) {
            userTermProgress = optionalTerm.get();
        } else {
            userTermProgress = new UserTermProgress();
            userTermProgress.setOriginTerm(termService.getById(termId));
            userTermProgress.setUserPractice(practice);
        }
        userTermProgress.setStatus(learned ? TermStatus.LEARNED : TermStatus.IN_PROGRESS);
        userTermProgressRepository.save(userTermProgress);

        practice.setCurrentTermNumber(currentIndex);
        userPracticeRepository.save(practice);
    }

    /**
     * Resets the user's practice progress for a module, setting the current term number to 0.
     *
     * @param moduleId The ID of the module for which to reset the practice progress.
     */
    @Transactional
    @Override
    public void resetPractice(final Long moduleId) {
        final UserPractice practice = this.getPracticeByModuleId(moduleId);
        practice.setCurrentTermNumber(0L);
        userPracticeRepository.save(practice);
    }

    /**
     * Retrieves the user practice record for a given module.
     *
     * @param id The ID of the module to retrieve the practice settings for.
     * @return The user practice record associated with the module.
     * @throws ValidationException If the provided ID is null.
     * @throws ResourceNotFoundException If no user practice exists for the given module ID.
     */
    private UserPractice getPracticeByModuleId(final Long id) {
        if (Objects.isNull(id)) {
            throw new ValidationException("Id cannot be null");
        }
        return userPracticeRepository.findByModule_Id(id)
                .orElseThrow(() -> new ResourceNotFoundException(String.format("Module practice settings does not exist by module id: %d", id), "This module does not exist!"));
    }
}
