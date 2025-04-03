package com.gorbasenko245.linguaverse_backend.domain.enums;

/**
 * Enum representing the possible statuses of a term in module.
 * <p>
 * This enum is used to track the progress of a specific term.
 * </p>
 */
public enum TermStatus {

    /**
     * The term has not yet started.
     */
    NOT_STARTED,

    /**
     * The term is currently in progress or not started or skipped.
     */
    IN_PROGRESS,

    /**
     * The term has been learned.
     */
    LEARNED;
}

