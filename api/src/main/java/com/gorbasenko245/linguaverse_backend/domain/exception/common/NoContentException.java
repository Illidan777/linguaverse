package com.gorbasenko245.linguaverse_backend.domain.exception.common;

import com.gorbasenko245.linguaverse_backend.domain.exception.BaseApiException;

import java.util.Collection;

public class NoContentException extends BaseApiException {

    public NoContentException(String technicalMessage) {
        super(technicalMessage);
    }

    public NoContentException(String technicalMessage, String localizedMessage) {
        super(technicalMessage, localizedMessage);
    }

    public NoContentException(String technicalMessage, String localizedMessage, Collection<Object> args) {
        super(technicalMessage, localizedMessage, args);
    }
}
