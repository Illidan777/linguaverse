package com.gorbasenko245.linguaverse_backend.domain.exception.common;

import com.gorbasenko245.linguaverse_backend.domain.exception.BaseApiException;

import java.util.Collection;


/**
 * Exception thrown when an entity or resource already exists.
 * This exception is typically used in situations where an attempt to create or add
 * a resource that already exists in the system is made.
 */
public class AlreadyExistException extends BaseApiException {

    /**
     * Constructor that accepts a technical message, localized message, and arguments.
     *
     * @param technicalMessage The technical message providing detailed information about the error.
     * @param localizedMessage The localized message to be displayed to the user.
     * @param args The arguments to be used for the localized message.
     */
    public AlreadyExistException(String technicalMessage, String localizedMessage, Collection<Object> args) {
        super(technicalMessage, localizedMessage, args);
    }

    /**
     * Constructor that accepts a technical message, localized message, and a localized flag.
     *
     * @param technicalMessage The technical message providing detailed information about the error.
     * @param localizedMessage The localized message to be displayed to the user.
     * @param localized A flag indicating if the message is localized.
     */
    public AlreadyExistException(String technicalMessage, String localizedMessage, boolean localized) {
        super(technicalMessage, localizedMessage, localized);
    }
}
