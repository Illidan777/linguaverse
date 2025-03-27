package com.gorbasenko245.linguaverse_backend.domain.exception;

import lombok.Getter;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

/**
 * Date: 13.05.24
 *
 * @author ilia
 */
@Getter
public class ErrorListException extends BaseApiException {

    private final transient List<Error> errors;

    public ErrorListException(final String technicalMessage) {
        super(technicalMessage);
        this.errors = new ArrayList<>();
    }

    public ErrorListException(final String technicalMessage, final boolean eventLoggable) {
        super(technicalMessage, eventLoggable);
        this.errors = new ArrayList<>();
    }

    public ErrorListException(final String technicalMessage, final List<Error> errors) {
        super(technicalMessage);
        this.errors = errors;
    }

    public ErrorListException(String technicalMessage, String localizedMessage) {
        super(technicalMessage, localizedMessage);
        this.errors = new ArrayList<>();
    }

    public ErrorListException(String technicalMessage, String localizedMessage, Collection<Object> args) {
        super(technicalMessage, localizedMessage, args);
        this.errors = new ArrayList<>();
    }

    public ErrorListException(final String technicalMessage, final String localizedMessage, final boolean localized, final List<Error> errors) {
        super(technicalMessage, localizedMessage, localized);
        this.errors = errors;
    }
}
