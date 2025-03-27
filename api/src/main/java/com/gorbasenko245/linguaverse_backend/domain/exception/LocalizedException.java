package com.gorbasenko245.linguaverse_backend.domain.exception;

import lombok.Getter;

import java.util.Collection;
import java.util.Collections;

/**
 * Date: 10.05.24
 *
 * @author ilia
 */
@Getter
public class LocalizedException extends RuntimeException {

    protected final boolean localized;
    private final String localizedMessage;
    private final Collection<Object> arguments;


    public LocalizedException(final String message, final String localizedMessage, final Collection<Object> arguments) {
        super(message);
        this.localized = false;
        this.localizedMessage = localizedMessage;
        this.arguments = arguments;
    }

    public LocalizedException(final String message, final String localizedMessage, final Collection<Object> arguments, final Throwable cause) {
        super(message, cause);
        this.localized = false;
        this.localizedMessage = localizedMessage;
        this.arguments = arguments;
    }

    public LocalizedException(final String message, final String localizedMessage) {
        super(message);
        this.localized = false;
        this.localizedMessage = localizedMessage;
        this.arguments = Collections.emptyList();
    }

    public LocalizedException(final String message, final String localizedMessage, final boolean localized) {
        super(message);
        this.localized = localized;
        this.localizedMessage = localizedMessage;
        this.arguments = Collections.emptyList();
    }

    public LocalizedException(final String message, final String localizedMessage, final Throwable cause) {
        super(message, cause);
        this.localized = false;
        this.localizedMessage = localizedMessage;
        this.arguments = Collections.emptyList();
    }
}
