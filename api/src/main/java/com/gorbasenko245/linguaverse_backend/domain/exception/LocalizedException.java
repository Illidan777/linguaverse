package com.gorbasenko245.linguaverse_backend.domain.exception;

import lombok.Getter;

import java.util.Collection;
import java.util.Collections;

/**
 * A custom exception class that extends {@link RuntimeException} and provides additional
 * support for localized messages and arguments, making it suitable for handling exceptions
 * that require specific messages to be localized based on different locales.
 */
@Getter
public class LocalizedException extends RuntimeException {

    /**
     * Indicates whether the exception message is localized or not.
     */
    protected final boolean localized;

    /**
     * The localized message associated with the exception. This message can vary based on
     * the locale and is typically used for internationalization.
     */
    private final String localizedMessage;

    /**
     * A collection of arguments that can be included in the localized message, useful for
     * formatting or passing additional context to the message.
     */
    private final Collection<Object> arguments;


    /**
     * Constructs a new {@code LocalizedException} with the specified message, localized message,
     * and arguments.
     *
     * @param message           The general message associated with the exception.
     * @param localizedMessage  The localized message for internationalization purposes.
     * @param arguments         The arguments for the localized message.
     */
    public LocalizedException(final String message, final String localizedMessage, final Collection<Object> arguments) {
        super(message);
        this.localized = false; // Indicates that the exception is not yet localized by default.
        this.localizedMessage = localizedMessage;
        this.arguments = arguments;
    }

    /**
     * Constructs a new {@code LocalizedException} with the specified message, localized message,
     * arguments, and the cause of the exception.
     *
     * @param message           The general message associated with the exception.
     * @param localizedMessage  The localized message for internationalization purposes.
     * @param arguments         The arguments for the localized message.
     * @param cause             The cause of the exception (used for exception chaining).
     */
    public LocalizedException(final String message, final String localizedMessage, final Collection<Object> arguments, final Throwable cause) {
        super(message, cause);
        this.localized = false; // Indicates that the exception is not yet localized by default.
        this.localizedMessage = localizedMessage;
        this.arguments = arguments;
    }

    /**
     * Constructs a new {@code LocalizedException} with the specified message and localized message,
     * with no arguments provided.
     *
     * @param message          The general message associated with the exception.
     * @param localizedMessage The localized message for internationalization purposes.
     */
    public LocalizedException(final String message, final String localizedMessage) {
        super(message);
        this.localized = false;
        this.localizedMessage = localizedMessage;
        this.arguments = Collections.emptyList();  // No arguments for the localized message.
    }

    /**
     * Constructs a new {@code LocalizedException} with the specified message, localized message,
     * and a flag indicating whether the message is localized.
     *
     * @param message          The general message associated with the exception.
     * @param localizedMessage The localized message for internationalization purposes.
     * @param localized        A boolean indicating whether the message is localized.
     */
    public LocalizedException(final String message, final String localizedMessage, final boolean localized) {
        super(message);
        this.localized = localized;
        this.localizedMessage = localizedMessage;
        this.arguments = Collections.emptyList();  // No arguments for the localized message.
    }

    /**
     * Constructs a new {@code LocalizedException} with the specified message, localized message,
     * and cause of the exception, with no arguments provided.
     *
     * @param message          The general message associated with the exception.
     * @param localizedMessage The localized message for internationalization purposes.
     * @param cause            The cause of the exception (used for exception chaining).
     */
    public LocalizedException(final String message, final String localizedMessage, final Throwable cause) {
        super(message, cause);
        this.localized = false;
        this.localizedMessage = localizedMessage;
        this.arguments = Collections.emptyList();  // No arguments for the localized message.
    }
}
