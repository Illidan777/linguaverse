package com.gorbasenko245.linguaverse_backend.domain.dto.practice;

import com.gorbasenko245.linguaverse_backend.domain.dto.term.TermDto;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

/**
 * Data Transfer Object (DTO) that represents the user's practice progress.
 * <p>
 * This class is used to transfer data about a user's practice, including whether they are following progress,
 * their shuffle mode settings, the current term number, and the count of terms. It also holds lists of terms
 * categorized by their learning status: in-progress and learned terms.
 * </p>
 */
@Data
public class UserPracticeDto {

    /**
     * Indicates whether the user is following their progress.
     * <p>
     * This field determines whether the user is tracking their learning progress.
     * If {@code true}, the user is following their progress, otherwise not.
     * </p>
     */
    private Boolean followProgress;

    /**
     * Indicates whether shuffle mode is enabled for the user's practice.
     * <p>
     * This field determines whether the terms are presented in a random order during practice.
     * If {@code true}, shuffle mode is enabled, otherwise, it is disabled.
     * </p>
     */
    private Boolean shuffleMode;

    /**
     * The current term number the user is practicing.
     * <p>
     * This field represents the index or number of the term the user is currently practicing
     * in the sequence. It helps track the user's position in their practice session.
     * </p>
     */
    private Long currentTermNumber;

    /**
     * The total number of terms the user is practicing.
     * <p>
     * This field holds the count of terms included in the user's practice session. It helps to
     * calculate the user's progress and provide an overview of the number of terms involved.
     * </p>
     */
    private Integer termsCount;

    /**
     * List of terms that are currently in progress in the user's practice.
     * <p>
     * This field holds the list of {@link TermDto} objects representing the terms that the user is
     * actively working on in their practice. These terms are considered "in-progress".
     * </p>
     */
    private List<TermDto> inProgressTerms = new ArrayList<>();

    /**
     * List of terms that the user has already learned.
     * <p>
     * This field holds the list of {@link TermDto} objects representing the terms that the user has
     * completed and learned. These terms are categorized as "learned".
     * </p>
     */
    private List<TermDto> learnedTerms = new ArrayList<>();
}
