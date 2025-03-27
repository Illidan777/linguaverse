package com.gorbasenko245.linguaverse_backend.domain.exception.common;

import com.gorbasenko245.linguaverse_backend.domain.exception.BaseApiException;

import java.util.Collection;

/**
 * Date: 05.12.22
 *
 * @author ilia
 */
public class IllegalOperationException extends BaseApiException {

    public IllegalOperationException(String technicalMessage) {
        super(technicalMessage);
    }

    public IllegalOperationException(String technicalMessage, String localizedMessage) {
        super(technicalMessage, localizedMessage);
    }

    public IllegalOperationException(String technicalMessage, String localizedMessage, Collection<Object> args) {
        super(technicalMessage, localizedMessage, args);
    }
}
