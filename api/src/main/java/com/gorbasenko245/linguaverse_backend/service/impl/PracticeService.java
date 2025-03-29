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

@Service
@RequiredArgsConstructor
public class PracticeService implements IPracticeService {

    private final UserPracticeRepository userPracticeRepository;
    private final UserTermProgressRepository userTermProgressRepository;
    private final UserPracticeMapper userPracticeMapper;
    private final TermService termService;

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

    @Override
    public UserPracticeDto getUserPracticeByModuleId(final Long moduleId) {
        return userPracticeMapper.toUserPracticeDto(this.getPracticeByModuleId(moduleId));
    }

    @Transactional
    @Override
    public void toggleFollowProgress(final Long id) {
        final UserPractice module = this.getPracticeByModuleId(id);
        module.setFollowProgress(!module.getFollowProgress());
        userPracticeRepository.save(module);
    }

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

    @Transactional
    @Override
    public void resetPractice(final Long moduleId) {
        final UserPractice practice = this.getPracticeByModuleId(moduleId);
        practice.setCurrentTermNumber(0L);
        userPracticeRepository.save(practice);
    }

    private UserPractice getPracticeByModuleId(final Long id) {
        if (Objects.isNull(id)) {
            throw new ValidationException("Id cannot be null");
        }
        return userPracticeRepository.findByModule_Id(id)
                .orElseThrow(() -> new ResourceNotFoundException(String.format("Module practice settings does not exist by module id: %d", id), "This module does not exist!"));
    }
}
