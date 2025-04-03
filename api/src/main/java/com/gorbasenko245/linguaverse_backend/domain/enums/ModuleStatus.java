package com.gorbasenko245.linguaverse_backend.domain.enums;

/**
 * Enum representing the possible statuses of a module.
 * <p>
 * This enum is used to track the current state of a module, indicating whether
 * the module is in a draft state or is active and available for use.
 * </p>
 */
public enum ModuleStatus {
    /**
     * The module is in a draft state and is not yet available for use.
     * It may still be under development or review.
     */
    DRAFT,

    /**
     * The module is active and available for use.
     * It has been finalized and is accessible to users.
     */
    ACTIVE;
}
