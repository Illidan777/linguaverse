package com.gorbasenko245.linguaverse_backend.service;

import com.gorbasenko245.linguaverse_backend.domain.dto.practice.UserPracticeDto;
import com.gorbasenko245.linguaverse_backend.domain.entity.module.Module;

public interface IPracticeService {

    void createUserPractice(Module module);

    UserPracticeDto getUserPracticeByModuleId(Long moduleId);

    void toggleFollowProgress(Long moduleId);

    void updateTermStatus(Long moduleId, Long termId, Boolean learned, Long currentIndex);

    void resetPractice(Long moduleId);
}
