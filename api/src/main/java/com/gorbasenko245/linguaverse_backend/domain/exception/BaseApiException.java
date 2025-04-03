package com.gorbasenko245.linguaverse_backend.domain.exception;

import lombok.Getter;

import java.util.Collection;


/**
 * A custom exception class that extends {@link LocalizedException} and provides a base
 * for API-related exceptions. This exception includes a flag for determining whether the
 * event should be logged and provides a default technical message for ease of use.
 */
@Getter
public class BaseApiException extends LocalizedException {

    /**
     * The default message that will be used for API exceptions when no specific message is provided.
     */
    public static final String DEFAULT_API_EXCEPTION_MESSAGE = "Something went wrong! Contact technical support.";

    /**
     * Indicates whether the exception event should be logged.
     */
    private final boolean eventLoggable;

    /**
     * Constructs a new {@code BaseApiException} with the default technical and localized messages,
     * and sets the event loggable flag to {@code true}.
     */
    public BaseApiException() {
        super(DEFAULT_API_EXCEPTION_MESSAGE, DEFAULT_API_EXCEPTION_MESSAGE);
        this.eventLoggable = true;
    }

    /**
     * Constructs a new {@code BaseApiException} with the specified technical message, and sets
     * the event loggable flag to {@code true}.
     *
     * @param technicalMessage The technical message describing the exception.
     */
    public BaseApiException(final String technicalMessage) {
        super(technicalMessage, DEFAULT_API_EXCEPTION_MESSAGE);
        this.eventLoggable = true;
    }

    /**
     * Constructs a new {@code BaseApiException} with the specified technical message and a flag
     * indicating whether the event should be logged.
     *
     * @param technicalMessage The technical message describing the exception.
     * @param eventLoggable    A boolean flag indicating whether the exception event is loggable.
     */
    public BaseApiException(final String technicalMessage, final boolean eventLoggable) {
        super(technicalMessage, DEFAULT_API_EXCEPTION_MESSAGE);
        this.eventLoggable = eventLoggable;
    }

    /**
     * Constructs a new {@code BaseApiException} with the specified technical message, and cause
     * for exception chaining, and sets the event loggable flag to {@code true}.
     *
     * @param technicalMessage The technical message describing the exception.
     * @param cause            The cause of the exception (used for exception chaining).
     */
    public BaseApiException(final String technicalMessage, final Throwable cause) {
        super(technicalMessage, DEFAULT_API_EXCEPTION_MESSAGE, cause);
        this.eventLoggable = true;
    }

    /**
     * Constructs a new {@code BaseApiException} with the specified technical message, localized
     * message, and arguments for internationalization, and sets the event loggable flag to {@code false}.
     *
     * @param technicalMessage The technical message describing the exception.
     * @param localizedMessage The localized message for internationalization purposes.
     * @param arguments        The arguments for the localized message.
     */
    public BaseApiException(final String technicalMessage, final String localizedMessage, final Collection<Object> arguments) {
        super(technicalMessage, localizedMessage, arguments);
        this.eventLoggable = false;
    }

    /**
     * Constructs a new {@code BaseApiException} with the specified technical message, localized
     * message, arguments for internationalization, and cause for exception chaining, and sets the
     * event loggable flag to {@code false}.
     *
     * @param technicalMessage The technical message describing the exception.
     * @param localizedMessage The localized message for internationalization purposes.
     * @param arguments        The arguments for the localized message.
     * @param cause            The cause of the exception (used for exception chaining).
     */
    public BaseApiException(final String technicalMessage, final String localizedMessage, final Collection<Object> arguments, final Throwable cause) {
        super(technicalMessage, localizedMessage, arguments, cause);
        this.eventLoggable = false;
    }

    /**
     * Constructs a new {@code BaseApiException} with the specified technical message and localized
     * message, and sets the event loggable flag to {@code false}.
     *
     * @param technicalMessage The technical message describing the exception.
     * @param localizedMessage The localized message for internationalization purposes.
     */
    public BaseApiException(final String technicalMessage, final String localizedMessage) {
        super(technicalMessage, localizedMessage);
        this.eventLoggable = false;
    }

    /**
     * Constructs a new {@code BaseApiException} with the specified technical message, localized
     * message, and a flag indicating whether the message is localized, and sets the event loggable
     * flag to {@code false}.
     *
     * @param technicalMessage The technical message describing the exception.
     * @param localizedMessage The localized message for internationalization purposes.
     * @param localized        A boolean indicating whether the message is localized.
     */
    public BaseApiException(final String technicalMessage, final String localizedMessage, final boolean localized) {
        super(technicalMessage, localizedMessage, localized);
        this.eventLoggable = false;
    }

    /**
     * Constructs a new {@code BaseApiException} with the specified technical message, localized
     * message, and cause for exception chaining, and sets the event loggable flag to {@code false}.
     *
     * @param technicalMessage The technical message describing the exception.
     * @param localizedMessage The localized message for internationalization purposes.
     * @param cause            The cause of the exception (used for exception chaining).
     */
    public BaseApiException(final String technicalMessage, final String localizedMessage, final Throwable cause) {
        super(technicalMessage, localizedMessage, cause);
        this.eventLoggable = false;
    }
}
