package com.gorbasenko245.linguaverse_backend.domain.exception.common;

import com.gorbasenko245.linguaverse_backend.domain.exception.BaseApiException;

import java.util.Collection;

/**
 * Exception thrown when no content is found or available for a requested operation.
 * This exception is typically used when the requested resource exists but has no content.
 * It indicates that the operation has been successfully executed, but there is no content to return.
 */
public class NoContentException extends BaseApiException {

    /**
     * Constructor that accepts a technical message.
     *
     * @param technicalMessage The technical message providing detailed information about the error.
     */
    public NoContentException(String technicalMessage) {
        super(technicalMessage);
    }

    /**
     * Constructor that accepts a technical message and a localized message.
     *
     * @param technicalMessage The technical message providing detailed information about the error.
     * @param localizedMessage The localized message to be displayed to the user.
     */
    public NoContentException(String technicalMessage, String localizedMessage) {
        super(technicalMessage, localizedMessage);
    }

    /**
     * Constructor that accepts a technical message, localized message, and arguments.
     *
     * @param technicalMessage The technical message providing detailed information about the error.
     * @param localizedMessage The localized message to be displayed to the user.
     * @param args The arguments to be used for the localized message.
     */
    public NoContentException(String technicalMessage, String localizedMessage, Collection<Object> args) {
        super(technicalMessage, localizedMessage, args);
    }
}

