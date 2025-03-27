package com.gorbasenko245.linguaverse_backend.domain.exception.common;

import com.gorbasenko245.linguaverse_backend.domain.exception.BaseApiException;

import java.util.Collection;

public class ResourceNotFoundException extends BaseApiException {

    public ResourceNotFoundException(String technicalMessage) {
        super(technicalMessage);
    }

    public ResourceNotFoundException(String technicalMessage, String localizedMessage) {
        super(technicalMessage, localizedMessage);
    }

    public ResourceNotFoundException(String technicalMessage, String localizedMessage, Collection<Object> args) {
        super(technicalMessage, localizedMessage, args);
    }

    public ResourceNotFoundException(String technicalMessage, String localizedMessage, boolean localized) {
        super(technicalMessage, localizedMessage, localized);
    }
}
