package com.gorbasenko245.linguaverse_backend.domain.dto.practice;

import com.gorbasenko245.linguaverse_backend.domain.dto.term.TermDto;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class UserPracticeDto {
    private Boolean followProgress;
    private Boolean shuffleMode;
    private Long currentTermNumber;
    private Integer termsCount;
    private List<TermDto> inProgressTerms = new ArrayList<>();
    private List<TermDto> learnedTerms = new ArrayList<>();
}
