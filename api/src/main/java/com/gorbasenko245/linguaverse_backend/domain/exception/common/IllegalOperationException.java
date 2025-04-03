package com.gorbasenko245.linguaverse_backend.domain.exception.common;

import com.gorbasenko245.linguaverse_backend.domain.exception.BaseApiException;

import java.util.Collection;

/**
 * Exception thrown when an illegal operation is attempted.
 * This exception is typically used to handle situations where an operation is
 * attempted that is not allowed within the current context or violates business rules.
 */
public class IllegalOperationException extends BaseApiException {

    /**
     * Constructor that accepts a technical message.
     *
     * @param technicalMessage The technical message providing detailed information about the error.
     */
    public IllegalOperationException(String technicalMessage) {
        super(technicalMessage);
    }

    /**
     * Constructor that accepts a technical message and a localized message.
     *
     * @param technicalMessage The technical message providing detailed information about the error.
     * @param localizedMessage The localized message to be displayed to the user.
     */
    public IllegalOperationException(String technicalMessage, String localizedMessage) {
        super(technicalMessage, localizedMessage);
    }

    /**
     * Constructor that accepts a technical message, localized message, and arguments.
     *
     * @param technicalMessage The technical message providing detailed information about the error.
     * @param localizedMessage The localized message to be displayed to the user.
     * @param args             The arguments to be used for the localized message.
     */
    public IllegalOperationException(String technicalMessage, String localizedMessage, Collection<Object> args) {
        super(technicalMessage, localizedMessage, args);
    }
}
