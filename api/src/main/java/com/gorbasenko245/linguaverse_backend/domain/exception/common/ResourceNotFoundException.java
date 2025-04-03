package com.gorbasenko245.linguaverse_backend.domain.exception.common;

import com.gorbasenko245.linguaverse_backend.domain.exception.BaseApiException;

import java.util.Collection;

/**
 * Exception thrown when a requested resource is not found.
 * <p>
 * This custom exception extends {@link BaseApiException} to provide
 * specific handling for cases where a resource could not be found,
 * such as in the case of a 404 HTTP status code.
 * </p>
 *
 * @see BaseApiException
 */
public class ResourceNotFoundException extends BaseApiException {

    /**
     * Constructs a new ResourceNotFoundException with the specified technical message
     * and localized message.
     * <p>
     * The technical message is meant for developers, while the localized message
     * is intended for the end-user in their preferred language.
     * </p>
     *
     * @param technicalMessage the technical message describing the error in detail
     * @param localizedMessage the user-friendly message describing the error in the user's language
     */
    public ResourceNotFoundException(String technicalMessage, String localizedMessage) {
        super(technicalMessage, localizedMessage);
    }
}

