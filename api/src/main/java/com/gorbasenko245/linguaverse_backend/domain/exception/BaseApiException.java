package com.gorbasenko245.linguaverse_backend.domain.exception;

import com.gorbasenko245.linguaverse_backend.utils.LocalizationUtils;
import lombok.Getter;

import java.util.Collection;

/**
 * Date: 06.03.24
 *
 * @author ilia
 */
@Getter
public class BaseApiException extends LocalizedException {

    public static final String DEFAULT_API_EXCEPTION_MESSAGE = "Something went wrong! Contact technical support.";

    private final boolean eventLoggable;

    public BaseApiException() {
        super(DEFAULT_API_EXCEPTION_MESSAGE, DEFAULT_API_EXCEPTION_MESSAGE);
        this.eventLoggable = true;
    }

    public BaseApiException(final String technicalMessage) {
        super(technicalMessage, DEFAULT_API_EXCEPTION_MESSAGE);
        this.eventLoggable = true;
    }

    public BaseApiException(final String technicalMessage, final boolean eventLoggable) {
        super(technicalMessage, DEFAULT_API_EXCEPTION_MESSAGE);
        this.eventLoggable = eventLoggable;
    }

    public BaseApiException(final String technicalMessage, final Throwable cause) {
        super(technicalMessage, DEFAULT_API_EXCEPTION_MESSAGE, cause);
        this.eventLoggable = true;
    }

    public BaseApiException(final String technicalMessage, final String localizedMessage, final Collection<Object> arguments) {
        super(technicalMessage, localizedMessage, arguments);
        this.eventLoggable = false;
    }

    public BaseApiException(final String technicalMessage, final String localizedMessage, final Collection<Object> arguments, final Throwable cause) {
        super(technicalMessage, localizedMessage, arguments, cause);
        this.eventLoggable = false;
    }

    public BaseApiException(final String technicalMessage, final String localizedMessage) {
        super(technicalMessage, localizedMessage);
        this.eventLoggable = false;
    }

    public BaseApiException(final String technicalMessage, final String localizedMessage, final boolean localized) {
        super(technicalMessage, localizedMessage, localized);
        this.eventLoggable = false;
    }

    public BaseApiException(final String technicalMessage, final String localizedMessage, final Throwable cause) {
        super(technicalMessage, localizedMessage, cause);
        this.eventLoggable = false;
    }
}
