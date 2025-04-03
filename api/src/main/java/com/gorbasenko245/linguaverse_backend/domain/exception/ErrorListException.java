package com.gorbasenko245.linguaverse_backend.domain.exception;

import lombok.Getter;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

/**
 * Custom exception class that extends {@link BaseApiException} and is used to handle API exceptions
 * where a list of errors needs to be included. This exception allows the inclusion of multiple error details
 * for more granular reporting.
 */
@Getter
public class ErrorListException extends BaseApiException {

    /**
     * A list of {@link Error} objects containing error details for the exception.
     * This allows for multiple errors to be passed together.
     */
    private final transient List<Error> errors;

    /**
     * Constructs a new {@code ErrorListException} with the specified technical message,
     * and initializes the errors list to an empty list.
     *
     * @param technicalMessage The technical message describing the exception.
     */
    public ErrorListException(final String technicalMessage) {
        super(technicalMessage);
        this.errors = new ArrayList<>();
    }

    /**
     * Constructs a new {@code ErrorListException} with the specified technical message and
     * a flag indicating whether the event should be logged, and initializes the errors list to an empty list.
     *
     * @param technicalMessage The technical message describing the exception.
     * @param eventLoggable    A boolean flag indicating whether the exception event is loggable.
     */
    public ErrorListException(final String technicalMessage, final boolean eventLoggable) {
        super(technicalMessage, eventLoggable);
        this.errors = new ArrayList<>();
    }

    /**
     * Constructs a new {@code ErrorListException} with the specified technical message and
     * a list of errors.
     *
     * @param technicalMessage The technical message describing the exception.
     * @param errors           A list of {@link Error} objects containing the details of errors.
     */
    public ErrorListException(final String technicalMessage, final List<Error> errors) {
        super(technicalMessage);
        this.errors = errors;
    }

    /**
     * Constructs a new {@code ErrorListException} with the specified technical message and localized message,
     * and initializes the errors list to an empty list.
     *
     * @param technicalMessage The technical message describing the exception.
     * @param localizedMessage The localized message for internationalization purposes.
     */
    public ErrorListException(String technicalMessage, String localizedMessage) {
        super(technicalMessage, localizedMessage);
        this.errors = new ArrayList<>();
    }

    /**
     * Constructs a new {@code ErrorListException} with the specified technical message, localized message,
     * and arguments for internationalization, and initializes the errors list to an empty list.
     *
     * @param technicalMessage The technical message describing the exception.
     * @param localizedMessage The localized message for internationalization purposes.
     * @param args             The arguments for the localized message.
     */
    public ErrorListException(String technicalMessage, String localizedMessage, Collection<Object> args) {
        super(technicalMessage, localizedMessage, args);
        this.errors = new ArrayList<>();
    }

    /**
     * Constructs a new {@code ErrorListException} with the specified technical message, localized message,
     * a flag indicating whether the message is localized, and a list of errors.
     *
     * @param technicalMessage The technical message describing the exception.
     * @param localizedMessage The localized message for internationalization purposes.
     * @param localized        A boolean indicating whether the message is localized.
     * @param errors           A list of {@link Error} objects containing the details of errors.
     */
    public ErrorListException(final String technicalMessage, final String localizedMessage, final boolean localized, final List<Error> errors) {
        super(technicalMessage, localizedMessage, localized);
        this.errors = errors;
    }
}
