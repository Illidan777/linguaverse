package com.gorbasenko245.linguaverse_backend.mapper;

import com.gorbasenko245.linguaverse_backend.domain.dto.practice.UserPracticeDto;
import com.gorbasenko245.linguaverse_backend.domain.entity.module.Module;
import com.gorbasenko245.linguaverse_backend.domain.entity.practice.UserPractice;
import com.gorbasenko245.linguaverse_backend.domain.entity.practice.UserTermProgress;
import com.gorbasenko245.linguaverse_backend.domain.entity.term.Term;
import com.gorbasenko245.linguaverse_backend.domain.enums.TermStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserPracticeMapper {

    private final TermMapper termMapper;

    public UserPracticeDto toUserPracticeDto(final UserPractice entity) {
        if (entity == null) {
            return null;
        }

        final UserPracticeDto dto = new UserPracticeDto();
        dto.setShuffleMode(entity.getShuffleMode());
        dto.setFollowProgress(entity.getFollowProgress());
        dto.setCurrentTermNumber(entity.getCurrentTermNumber());

        List<UserTermProgress> userTermProgressList = entity.getTerms();
        List<Term> fullTermList = entity.getModule().getTerms();

        if(userTermProgressList.isEmpty()) {
            dto.setLearnedTerms(Collections.emptyList());
            dto.setInProgressTerms(termMapper.toTermDtoList(fullTermList));
            return dto;
        }

        Set<Long> learnedTermIds = userTermProgressList.stream()
                .filter(term -> term.getStatus() == TermStatus.LEARNED)
                .map(progress -> progress.getTerm().getId())
                .collect(Collectors.toSet());

        Set<Long> inProgressTermIds = userTermProgressList.stream()
                .filter(term -> term.getStatus() == TermStatus.IN_PROGRESS || term.getStatus() == TermStatus.NOT_STARTED)
                .map(progress -> progress.getTerm().getId())
                .collect(Collectors.toSet());

        List<Term> learnedTerms = fullTermList.stream()
                .filter(term -> learnedTermIds.contains(term.getId()))
                .toList();

        List<Term> inProgressTerms = fullTermList.stream()
                .filter(term -> inProgressTermIds.contains(term.getId()))
                .toList();

        dto.setTermsCount(fullTermList.size());
        dto.setLearnedTerms(termMapper.toTermDtoList(learnedTerms));
        dto.setInProgressTerms(termMapper.toTermDtoList(inProgressTerms));

        return dto;
    }
}
