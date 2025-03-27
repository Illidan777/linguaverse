package com.gorbasenko245.linguaverse_backend.domain.exception.common;

import com.gorbasenko245.linguaverse_backend.domain.exception.ErrorListException;
import com.gorbasenko245.linguaverse_backend.domain.exception.Error;

import java.util.Collection;
import java.util.List;

/**
 * Date: 02.06.22
 *
 * @author ilia
 */
public class ValidationException extends ErrorListException {

    public ValidationException(String technicalMessage, List<Error> errors) {
        super(technicalMessage, errors);
    }

    public ValidationException(String technicalMessage) {
        super(technicalMessage);
    }

    public ValidationException(String technicalMessage, boolean eventLoggable) {
        super(technicalMessage, eventLoggable);
    }

    public ValidationException(String technicalMessage, String localizedMessage) {
        super(technicalMessage, localizedMessage);
    }

    public ValidationException(String technicalMessage, String localizedMessage, Collection<Object> args) {
        super(technicalMessage, localizedMessage, args);
    }

    public ValidationException(String technicalMessage, String localizedMessage, boolean localized, List<Error> errors) {
        super(technicalMessage, localizedMessage, localized, errors);
    }
}